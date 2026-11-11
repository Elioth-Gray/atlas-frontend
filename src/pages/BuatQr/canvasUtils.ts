export function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png', quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Canvas tidak bisa dikonversi ke gambar.'))
        }
      },
      type,
      quality
    )
  })
}

export function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function drawModules(
  context: CanvasRenderingContext2D,
  matrix: string[],
  x: number,
  y: number,
  size: number,
  color: string,
  quietZone: number
) {
  const moduleCount = matrix.length + quietZone * 2
  const moduleSize = size / moduleCount
  context.fillStyle = color

  matrix.forEach((row, rowIndex) => {
    for (let column = 0; column < row.length; column += 1) {
      if (row[column] !== '1') continue

      context.fillRect(
        x + (column + quietZone) * moduleSize,
        y + (rowIndex + quietZone) * moduleSize,
        Math.ceil(moduleSize),
        Math.ceil(moduleSize)
      )
    }
  })
}
