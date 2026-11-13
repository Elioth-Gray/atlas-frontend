import type { ShopDetail } from '@/typings/api'
import { formatShopRole } from '@/utils/format'

export interface BusinessFormValues {
  name: string
  category: string
  categoryId: string
  description: string
  website: string
  image: string
  scale: string
  scaleId: string
  ownerName: string
  ownerRole: string
  email: string
  phone: string
}

export const BUSINESS_FORM_VALUES: BusinessFormValues = {
  name: 'Northstar Coffee',
  category: 'Kafe & Kedai Kopi',
  categoryId: '0b7c1e2a-0001-4000-8000-000000000001',
  description: 'Kopi spesial dan menu musiman, buat menemani momen sehari-hari yang bermakna.',
  website: 'https://northstarcoffee.co',
  image: '',
  scale: 'Sedang',
  scaleId: '0b7c1e2a-0002-4000-8000-000000000002',
  ownerName: 'Alex Rivera',
  ownerRole: 'Pendiri & Pemilik',
  email: 'alex@northstarcoffee.co',
  phone: '+1 (415) 555-0182',
}

export const BUSINESS_LOGO_INITIALS = 'NC'

export const BUSINESS_CATEGORIES = [
  'Kafe & Kedai Kopi',
  'Restoran',
  'Toko Roti',
  'Katering',
  'Lainnya',
] as const

export const BUSINESS_SCALES = ['Kecil', 'Sedang', 'Besar'] as const

export function mapShopDetailToFormValues(detail: ShopDetail): BusinessFormValues {
  const { shop, owner, role } = detail
  return {
    name: shop.name,
    category: shop.category?.name ?? 'Kafe & Kedai Kopi',
    categoryId: shop.category?.id ?? BUSINESS_FORM_VALUES.categoryId,
    description: shop.description ?? '',
    website: shop.website ?? '',
    image: shop.image ?? '',
    scale: shop.scale?.name ?? 'Sedang',
    scaleId: shop.scale?.id ?? BUSINESS_FORM_VALUES.scaleId,
    ownerName: owner?.name ?? BUSINESS_FORM_VALUES.ownerName,
    ownerRole: formatShopRole(role),
    email: owner?.email ?? BUSINESS_FORM_VALUES.email,
    phone: owner?.phone_number ?? '',
  }
}
