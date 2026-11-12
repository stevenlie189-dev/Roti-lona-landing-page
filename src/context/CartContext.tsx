import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { PRODUCTS } from '../data/products'
import { cartReducer, getCartCount, getCartLines, getCartTotal, type CartLine } from '../lib/cart'
import type { CartItem } from '../types'

const STORAGE_KEY = 'roti-rona:cart:v1'

function loadCart(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (i): i is CartItem =>
        typeof i?.productId === 'string' && Number.isInteger(i?.quantity) && i.quantity > 0 && PRODUCTS.some((p) => p.id === i.productId),
    )
  } catch {
    return []
  }
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  total: number
  isOpen: boolean
  quantityOf: (productId: string) => number
  add: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
  open: () => void
  close: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* penyimpanan tidak tersedia — keranjang tetap berfungsi di memori */
    }
  }, [items])

  const lines = useMemo(() => getCartLines(items, PRODUCTS), [items])

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: getCartCount(lines),
      total: getCartTotal(lines),
      isOpen,
      quantityOf: (id) => items.find((i) => i.productId === id)?.quantity ?? 0,
      add: (productId) => dispatch({ type: 'add', productId }),
      setQuantity: (productId, quantity) => dispatch({ type: 'setQty', productId, quantity }),
      remove: (productId) => dispatch({ type: 'remove', productId }),
      clear: () => dispatch({ type: 'clear' }),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [items, lines, isOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart harus dipakai di dalam <CartProvider>')
  return ctx
}
