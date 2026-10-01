import Link from "next/link";

interface AdminHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

export default function AdminHeader({
  eyebrow = "Admin",
  title,
  subtitle,
  actions,
  breadcrumb,
}: AdminHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[var(--dark)]">
      <div className="container py-8 md:py-10">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-[.7rem] uppercase tracking-[.15em] text-white/40 mb-4">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--gold)]">{crumb.label}</span>
                )}
                {i < breadcrumb.length - 1 && (
                  <span className="text-white/20">/</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            {eyebrow && (
              <span className="inline-block text-[.6rem] uppercase tracking-[.25em] text-[var(--gold)] mb-2">
                {eyebrow}
              </span>
            )}
            <h1 className="font-heading text-2xl md:text-3xl font-bold leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-white/50 mt-2 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
        </div>
      </div>
    </header>
  );
}