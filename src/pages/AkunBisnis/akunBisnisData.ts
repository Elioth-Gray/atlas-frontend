export interface BusinessFormValues {
  name: string
  category: string
  description: string
  website: string
  scale: string
  ownerName: string
  ownerRole: string
  email: string
  phone: string
}

export const BUSINESS_FORM_VALUES: BusinessFormValues = {
  name: 'Northstar Coffee',
  category: 'Kafe & Kedai Kopi',
  description: 'Kopi spesial dan menu musiman, buat menemani momen sehari-hari yang bermakna.',
  website: 'https://northstarcoffee.co',
  scale: 'Sedang',
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
