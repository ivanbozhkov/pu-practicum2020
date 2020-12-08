import { Photo, BasePhotoWithSize } from "../models/photo"

const qualityIndex = 9 // higher is better [0 - 12]

const photoService = new class PhotoService {
  public extendBasePhotoWithURLs(basePhoto: BasePhotoWithSize)
  : Photo {
    (basePhoto as any).source = null

    for (let i = qualityIndex; i >= 0; i -= 1) {
      const source = basePhoto?.size?.[i]?.source

      if (source) {
        (basePhoto as any).source = source

        return basePhoto as Photo
      }
    }

    return basePhoto as Photo
  }
}

export default photoService