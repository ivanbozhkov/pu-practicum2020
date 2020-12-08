import axios, { AxiosStatic, AxiosRequestConfig } from "axios";

class BaseRepository {
	public baseURL = "https://api.flickr.com/services/rest/";
	private requester: AxiosStatic = axios;

	public async get<T>(url: string, options ?: AxiosRequestConfig): Promise<T> {
		return new Promise(async (res, rej) => {
			try {
				const req: unknown = await (this.requester({
					url,
					method: "GET",
					...options,
				})
				.then((resp) => resp?.data || resp) as any);

				res(req as T);
			} catch (e) {
				rej(e);
			}
		});
	}
}

export default new BaseRepository();
