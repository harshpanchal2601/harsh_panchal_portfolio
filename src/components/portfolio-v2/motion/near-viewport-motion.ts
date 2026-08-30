"use client";

import { useEffect, type RefObject } from "react";

const V2_PREWARM_SCENE_EVENT = "portfolio-v2:prewarm-scene";
const PRELOAD_ROOT_MARGIN = "280% 0px";
const INITIALIZE_ROOT_MARGIN = "150% 0px";

type MotionCleanup = () => void;
type MotionInitializer<T extends HTMLElement> = (
  root: T,
) => Promise<MotionCleanup | void>;
type MotionPreloader = () => Promise<unknown>;

type PendingActivation = {
  activate: () => void;
  preload: MotionPreloader;
  preloadStarted: boolean;
  sceneId: string;
};

const pendingActivations = new Map<HTMLElement, PendingActivation>();
let sharedPreloadObserver: IntersectionObserver | undefined;
let sharedInitializeObserver: IntersectionObserver | undefined;
let prewarmListenerBound = false;

function releaseSharedActivationInfrastructure(): void {
  if (pendingActivations.size > 0) {
    return;
  }

  sharedPreloadObserver?.disconnect();
  sharedInitializeObserver?.disconnect();
  sharedPreloadObserver = undefined;
  sharedInitializeObserver = undefined;

  if (prewarmListenerBound) {
    window.removeEventListener(V2_PREWARM_SCENE_EVENT, onPrewarmScene);
    prewarmListenerBound = false;
  }
}

function preloadPending(root: HTMLElement): void {
  const pending = pendingActivations.get(root);

  if (!pending || pending.preloadStarted) {
    return;
  }

  pending.preloadStarted = true;
  sharedPreloadObserver?.unobserve(root);
  void pending.preload().catch(() => {
    // The server-rendered scene remains available if its controller fails.
  });
}

function activatePending(root: HTMLElement): void {
  const pending = pendingActivations.get(root);

  if (!pending) {
    return;
  }

  preloadPending(root);
  pendingActivations.delete(root);
  sharedPreloadObserver?.unobserve(root);
  sharedInitializeObserver?.unobserve(root);
  pending.activate();
  releaseSharedActivationInfrastructure();
}

function onPrewarmScene(event: Event): void {
  const sceneId = (event as CustomEvent<string>).detail;

  pendingActivations.forEach((pending, root) => {
    if (pending.sceneId === sceneId) {
      activatePending(root);
    }
  });
}

function ensureSharedActivationInfrastructure(): IntersectionObserver {
  if (!sharedPreloadObserver) {
    sharedPreloadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadPending(entry.target as HTMLElement);
          }
        });
      },
      { rootMargin: PRELOAD_ROOT_MARGIN },
    );
  }

  if (!sharedInitializeObserver) {
    sharedInitializeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activatePending(entry.target as HTMLElement);
          }
        });
      },
      { rootMargin: INITIALIZE_ROOT_MARGIN },
    );
  }

  if (!prewarmListenerBound) {
    window.addEventListener(V2_PREWARM_SCENE_EVENT, onPrewarmScene);
    prewarmListenerBound = true;
  }

  return sharedInitializeObserver;
}

export function prewarmV2Scene(sceneId: string): void {
  window.dispatchEvent(
    new CustomEvent<string>(V2_PREWARM_SCENE_EVENT, { detail: sceneId }),
  );
}

export function bindNearViewportActivation(
  root: HTMLElement,
  sceneId: string,
  preload: MotionPreloader,
  activate: () => void,
  immediate = false,
): () => void {
  if (immediate || !("IntersectionObserver" in window)) {
    void preload().catch(() => {
      // The activation path owns the final fallback behavior.
    });
    activate();
    return () => {};
  } else {
    pendingActivations.set(root, {
      activate,
      preload,
      preloadStarted: false,
      sceneId,
    });
    ensureSharedActivationInfrastructure().observe(root);
    sharedPreloadObserver?.observe(root);
  }

  return () => {
    pendingActivations.delete(root);
    sharedPreloadObserver?.unobserve(root);
    sharedInitializeObserver?.unobserve(root);
    releaseSharedActivationInfrastructure();
  };
}

export function useNearViewportMotion<T extends HTMLElement>(
  rootRef: RefObject<T | null>,
  sceneId: string,
  preload: MotionPreloader,
  initialize: MotionInitializer<T>,
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let disposed = false;
    let cleanup: MotionCleanup | void;

    const unbindActivation = bindNearViewportActivation(
      root,
      sceneId,
      preload,
      () => {
        void initialize(root)
          .then((nextCleanup) => {
            if (disposed) {
              nextCleanup?.();
              return;
            }

            cleanup = nextCleanup;
          })
          .catch(() => {
            root.dataset.motionState = "unavailable";
          });
      },
    );

    return () => {
      disposed = true;
      unbindActivation();
      cleanup?.();
    };
  }, [initialize, preload, rootRef, sceneId]);
}
