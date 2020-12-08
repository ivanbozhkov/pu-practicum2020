export default interface PhotoSize {
  canblog: number
  candownload: number
  canprint: number
  size: Array<Size>
}

interface Size {
  height: number
  width: number
  label: string
  media: string
  source: string
  url: string
}
