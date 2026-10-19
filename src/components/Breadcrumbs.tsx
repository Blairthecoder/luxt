export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow text-faint">
      <ol className="flex items-center flex-wrap gap-2">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-muted">
                {item.name}
              </span>
            ) : (
              <a href={item.path} className="hover:text-gold transition-colors">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
