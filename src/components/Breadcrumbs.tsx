export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-graphite">
      <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2 min-w-0">
            {i > 0 && (
              <span aria-hidden="true" className="text-silver">
                /
              </span>
            )}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink truncate max-w-[60vw] sm:max-w-none">
                {item.name}
              </span>
            ) : (
              <a href={item.path} className="hover:text-ink hover:underline underline-offset-2 transition-colors">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
