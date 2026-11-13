const PAGE_WIDTH = 595.28
const PAGE_MARGIN = 28
const IMAGE_QUALITY = 0.94
const encoder = new TextEncoder()

function getJpegBytes(canvas: HTMLCanvasElement) {
  return new Promise<Uint8Array>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas tidak bisa dikonversi ke JPEG.'))
          return
        }

        void blob.arrayBuffer().then((buffer) => resolve(new Uint8Array(buffer)), reject)
      },
      'image/jpeg',
      IMAGE_QUALITY
    )
  })
}

function buildPdf(image: Uint8Array, imageWidth: number, imageHeight: number) {
  const pageHeight = PAGE_WIDTH * (imageHeight / imageWidth)
  const scale = Math.min(
    (PAGE_WIDTH - PAGE_MARGIN * 2) / imageWidth,
    (pageHeight - PAGE_MARGIN * 2) / imageHeight
  )
  const drawWidth = imageWidth * scale
  const drawHeight = imageHeight * scale
  const offsetX = (PAGE_WIDTH - drawWidth) / 2
  const offsetY = (pageHeight - drawHeight) / 2

  const chunks: BlobPart[] = []
  const offsets: number[] = []
  let byteLength = 0

  function push(value: string | Uint8Array) {
    const bytes = typeof value === 'string' ? encoder.encode(value) : new Uint8Array(value)
    chunks.push(bytes)
    byteLength += bytes.length
  }

  function startObject(objectNumber: number) {
    offsets[objectNumber] = byteLength
    push(`${objectNumber} 0 obj\n`)
  }

  push('%PDF-1.4\n')

  startObject(1)
  push('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')

  startObject(2)
  push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n')

  startObject(3)
  push(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${pageHeight.toFixed(2)}] ` +
      '/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n'
  )

  startObject(4)
  push(
    `<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} ` +
      `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\n` +
      'stream\n'
  )
  push(image)
  push('\nendstream\nendobj\n')

  const content =
    `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ` +
    `${offsetX.toFixed(2)} ${offsetY.toFixed(2)} cm\n/Im0 Do\nQ\n`

  startObject(5)
  push(`<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`)

  const xrefOffset = byteLength
  const objectCount = 5
  push(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`)

  for (let objectNumber = 1; objectNumber <= objectCount; objectNumber += 1) {
    push(`${String(offsets[objectNumber]).padStart(10, '0')} 00000 n \n`)
  }

  push(
    `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\n` + `startxref\n${xrefOffset}\n%%EOF\n`
  )

  return new Blob(chunks, { type: 'application/pdf' })
}

export async function canvasToPdf(canvas: HTMLCanvasElement) {
  const image = await getJpegBytes(canvas)
  return buildPdf(image, canvas.width, canvas.height)
}
