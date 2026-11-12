export type Category = 'Roti' | 'Pastry' | 'Dessert'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  imageAlt: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
}
