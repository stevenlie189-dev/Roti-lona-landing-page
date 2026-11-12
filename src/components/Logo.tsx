import { Wheat } from 'lucide-react'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <Wheat className="logo__mark" size={22} strokeWidth={1.75} aria-hidden />
      <span className="logo__text">
        Roti <em>Rona</em>
      </span>
    </span>
  )
}
