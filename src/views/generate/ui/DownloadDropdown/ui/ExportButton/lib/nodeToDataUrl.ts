import { toCanvas } from 'html-to-image'
import { Options } from 'html-to-image/lib/types'

export async function nodeToDataUrl<T extends HTMLElement>(
  type: string,
  node: T,
  options: Options = {}
): Promise<string> {
  const canvas = await toCanvas(node, options)
  return canvas.toDataURL(`image/${type}`, options.quality || 1)
}
