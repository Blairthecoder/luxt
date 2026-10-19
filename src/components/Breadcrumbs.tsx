import { ChevronRight } from 'lucide-react'

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3 text-slate-600" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-slate-300">
                {item.name}
              </span>
            ) : (
              <a href={item.path} className="hover:text-amber-200">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
