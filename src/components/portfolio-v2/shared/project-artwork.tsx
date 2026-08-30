type ProjectArtworkProps = Readonly<{
  role: string;
  tech: readonly string[];
  title: string;
}>;

export function ProjectArtwork({ role, tech, title }: ProjectArtworkProps) {
  return (
    <div aria-hidden="true" className="v2-project-artwork">
      <div className="v2-project-artwork-rail">
        <span>Selected Work</span>
        <span className="v2-project-artwork-status">
          <span />
          Product System
        </span>
      </div>

      <div className="v2-project-artwork-body">
        <div className="v2-project-artwork-title">
          <span>Case Study</span>
          <strong>{title}</strong>
        </div>

        <div className="v2-project-artwork-orbit">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="v2-project-artwork-meta">
        <div>
          <span>Role</span>
          <p>{role}</p>
        </div>
        <div>
          <span>Core Stack</span>
          <p>{tech.slice(0, 4).join(" / ")}</p>
        </div>
      </div>
    </div>
  );
}
