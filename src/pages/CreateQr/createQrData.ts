import QRCode from 'qrcode'

export interface BusinessProfile {
  name: string
  slug: string
  feedbackUrl: string
  publicPath: string
}

export const BUSINESS: BusinessProfile = {
  name: 'Northstar Coffee',
  slug: 'northstar',
  feedbackUrl: 'https://atlas.feedback/northstar',
  publicPath: 'atlas.feedback/northstar',
}

export type DownloadFormatId = 'png' | 'jpg' | 'pdf'

export interface DownloadFormat {
  id: DownloadFormatId
  label: string
  description: string
  extension: string
  mimeType: string
  moduleSize: number
}

export const DOWNLOAD_FORMATS: DownloadFormat[] = [
  {
    id: 'png',
    label: 'PNG',
    description: 'Gambar resolusi tinggi',
    extension: 'png',
    mimeType: 'image/png',
    moduleSize: 24,
  },
  {
    id: 'jpg',
    label: 'JPG',
    description: 'Gambar ukuran lebih kecil',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    moduleSize: 24,
  },
  {
    id: 'pdf',
    label: 'PDF',
    description: 'Siap dicetak dan dibagikan',
    extension: 'pdf',
    mimeType: 'application/pdf',
    moduleSize: 24,
  },
]

// Encodes https://atlas.feedback/northstar, so the preview and the downloads share one scannable QR.
export const QR_MATRIX = [
  '11111110100000001010001111111',
  '10000010000110110000101000001',
  '10111010101110111101101011101',
  '10111010100100010001101011101',
  '10111010011110000101001011101',
  '10000010110101110101101000001',
  '11111110101010101010101111111',
  '00000000111100001001000000000',
  '11010011001001001100011101101',
  '01011000000100110100011111001',
  '01100010001100011100110011000',
  '00001000110011110111101001110',
  '11001111001011000010000111111',
  '11000100111000100011100100001',
  '10011010010011011111101100100',
  '10010101110010101011000011010',
  '01101111001101110100011101111',
  '10010101110011100001111011100',
  '11100110111101011100110001001',
  '10011101110101110000101001001',
  '00000111010000001100111111011',
  '00000000000110111000100011001',
  '11111110110001010001101010000',
  '10000010010000011100100010111',
  '10111010010000001010111111010',
  '10111010100010001100111101010',
  '10111010001011100111110010100',
  '10000010101001111100011010011',
  '11111110110101100000010101100',
]

export function encodeQrMatrix(text: string): string[] {
  const payload = text.trim() || BUSINESS.feedbackUrl
  try {
    const qr = QRCode.create(payload, { errorCorrectionLevel: 'M' })
    const size = qr.modules.size
    const data = qr.modules.data
    const rows: string[] = []
    for (let row = 0; row < size; row += 1) {
      let line = ''
      for (let col = 0; col < size; col += 1) {
        line += data[row * size + col] ? '1' : '0'
      }
      rows.push(line)
    }
    return rows
  } catch {
    return QR_MATRIX
  }
}
