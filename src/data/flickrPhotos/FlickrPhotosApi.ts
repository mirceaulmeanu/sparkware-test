import { HttpApi } from "src/data/HttpApi";
import { IFlickrPhoto } from "./IFlickrPhoto";

interface IFlickrServerResponse {
    stat: string;
    photos: {
        page: number;
        pages: number;
        perpage: number;
        photo: IFlickrPhoto[];
        total: string;
    };
}

export class FlickrPhotosApi {
    constructor(
        private flickrPhotosUrl: string,
        private httpApi: HttpApi
    ) {}

    async fetch(searchTerm: string, page?: number) {
        if (!page) {
            page = 1;
        }
        let serverResponse = await this.httpApi.fetch<IFlickrServerResponse>(this.flickrPhotosUrl.replace("%s", searchTerm).replace("%d", page.toString()));
        return serverResponse.photos;
    }
}
