export interface GoogleMapsConnection {
  businessName: string
  description: string
  lastSynced: string
  importedReviews: string
  averageRating: string
}

export const GOOGLE_MAPS_CONNECTION: GoogleMapsConnection = {
  businessName: 'Northstar Coffee',
  description:
    'ATLAS otomatis mengimpor ulasan baru dan menggabungkannya dengan feedback langsung dari pelanggan.',
  lastSynced: 'Hari ini, 10.42',
  importedReviews: '1.964',
  averageRating: '4,2',
}

export interface ImportedReview {
  id: number
  author: string
  source: string
  rating: number
  text: string
  received: string
}

export const IMPORTED_REVIEWS: ImportedReview[] = [
  {
    id: 1,
    author: 'Leo Martin',
    source: 'Google Maps',
    rating: 5,
    text: 'Flat white terenak di kota ini. Blend barunya mantap!',
    received: '1 jam lalu',
  },
  {
    id: 2,
    author: 'Daniel Kim',
    source: 'Google Maps',
    rating: 3,
    text: 'Stafnya buru-buru dan kurang ramah hari ini.',
    received: '15 jam lalu',
  },
  {
    id: 3,
    author: 'Olivia Stone',
    source: 'Google Maps',
    rating: 4,
    text: 'Interiornya bagus dan timnya ramah banget.',
    received: '7 hari lalu',
  },
]
