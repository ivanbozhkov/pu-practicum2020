import PhotoSize from "./photoSize";

export interface BasePhoto {
  farm: number
  id: string
  isfamily: number
  isfriend: number
  ispublic: number
  owner: string
  secret: string
  server: string
  title: string
}

export type BasePhotoWithSize = BasePhoto & PhotoSize

export type Photo = BasePhotoWithSize & {
  source: string | null
}
