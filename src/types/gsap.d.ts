interface ScrollTrigger {
  /**
   * Overrides the positions calculated during refresh.
   *
   * This method is available in GSAP 3.15.0 at runtime but is missing from
   * the package's ScrollTrigger declaration.
   */
  setPositions(
    newStart: number,
    newEnd: number,
    keepClamp?: boolean,
    pinOffset?: number,
  ): void;
}
