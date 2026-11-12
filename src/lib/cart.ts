import type { CartItem, Product } from '../types'

export const MAX_QTY = 99

export type CartAction =
  | { type: 'add'; productId: string }
  | { type: 'setQty'; productId: string; quantity: number }
  | { type: 'remove'; productId: string }
  | { type: 'clear' }

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const found = state.find((i) => i.productId === action.productId)
      if (!found) return [...state, { productId: action.productId, quantity: 1 }]
      return state.map((i) =>
        i.productId === action.productId ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QTY) } : i,
      )
    }
    case 'setQty': {
      const quantity = Math.min(Math.floor(action.quantity), MAX_QTY)
      if (!Number.isFinite(quantity) || quantity < 1) {
        return state.filter((i) => i.productId !== action.productId)
      }
      return state.map((i) => (i.productId === action.productId ? { ...i, quantity } : i))
    }
    case 'remove':
      return state.filter((i) => i.productId !== action.productId)
    case 'clear':
      return []
  }
}

export interface CartLine {
  product: Product
  quantity: number
  subtotal: number
}

export function getCartLines(items: CartItem[], products: Product[]): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId)
    return product ? [{ product, quantity: item.quantity, subtotal: product.price * item.quantity }] : []
  })
}

export const getCartTotal = (lines: CartLine[]): number => lines.reduce((sum, l) => sum + l.subtotal, 0)
export const getCartCount = (lines: CartLine[]): number => lines.reduce((sum, l) => sum + l.quantity, 0)
