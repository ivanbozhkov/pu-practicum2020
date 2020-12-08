import { Photo, BasePhoto, BasePhotoWithSize } from "./../models/photo"
import baseRepository from "./baseRepository"
import { API_KEY, DEFAULT_ITEMS_PER_PAGE } from "./../constants.json"
import PhotoSize from "../models/photoSize"
import photoService from "../services/photoService"

type GetBasePhotosResponse = {
  page: number
  pages: number
  perpage: number
  photo: Array<BasePhoto>
  total: string // not a typo
}

type GetBasePhotosWithSizeResponse = GetBasePhotosResponse & {
  photo: Array<BasePhotoWithSize>
}

type GetPhotosResponse = GetBasePhotosResponse & {
  photo: Array<Photo>
}

class PhotosRepository {
  protected http = baseRepository
  protected URL = {
    endpoint: `${this.http.baseURL}`
  }

  private defaultParams = {
    api_key: API_KEY,
    format: "json",
    nojsoncallback: 1,
    per_page: DEFAULT_ITEMS_PER_PAGE,
    safe_search: 1
  }

  public async getPhotos(query: string)
  : Promise<GetBasePhotosResponse> {
    return this.http.get(this.URL.endpoint, {
      params: {
        ...this.defaultParams,
        method: "flickr.photos.search",
        text: query
      }
    })
    .then(({ photos }: any) => photos)
  }

  public async getRecent()
  : Promise<GetBasePhotosResponse> {
    return this.http.get(this.URL.endpoint, {
      params: {
        ...this.defaultParams,
        method: "flickr.photos.getRecent"
      }
    })
    .then(({ photos }: any) => photos)
  }

  public async getPhotosWithURLs(query: string)
  : Promise<GetPhotosResponse> {
    return this.getPhotos(query)
      .then(async (resp) => {
        const requests = resp.photo
          .map(async (photo: BasePhoto) => {
            Object.assign(photo, await this.getPhotoUrls(photo.id)) // demo purposes only
          })

        await Promise.all(requests)

        return resp as GetBasePhotosWithSizeResponse
      })
      .then((resp) => {
        resp.photo = resp.photo
          .map((photo: BasePhotoWithSize) => {
            return photoService.extendBasePhotoWithURLs(photo)
          })

        return resp as GetPhotosResponse
      })
  }

  public async getRecentWithURLs()
  : Promise<GetPhotosResponse> {
    return this.getRecent()
      .then(async (resp) => {
        const requests = resp.photo
          .map(async (photo: BasePhoto) => {
            Object.assign(photo, await this.getPhotoUrls(photo.id)) // demo purposes only
          })

        await Promise.all(requests)

        return resp as GetBasePhotosWithSizeResponse
      })
      .then((resp) => {
        resp.photo = resp.photo
          .map((photo: BasePhotoWithSize) => {
            return photoService.extendBasePhotoWithURLs(photo)
          })

        return resp as GetPhotosResponse
      })
  }

  public async getPhotoUrls(photoId: string)
  : Promise<PhotoSize> {
    return this.http.get(this.URL.endpoint, {
      params: {
        ...this.defaultParams,
        method: "flickr.photos.getSizes",
        photo_id: photoId,
      }
    })
    .then(({ sizes }: any) => sizes)
  }
}

export default new PhotosRepository()
