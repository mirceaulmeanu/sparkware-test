import { FlickrPhotosApi } from "./FlickrPhotosApi";
import { IFlickrPhoto } from "./IFlickrPhoto";
import { SearchTermTooShortError } from "./errors/SearchTermTooShortError";

export class FlickrPhotosStore {
    constructor(private flickrPhotosApi: FlickrPhotosApi) {}
    async fetch(searchTerm: string, page?: number) {
        if (searchTerm.length < 3) {
            throw new SearchTermTooShortError();
        }
        let rawPhotosData = await this.flickrPhotosApi.fetch(searchTerm, page);

        let photo = rawPhotosData.photo.map((p) => {
            // TODO: Make reader
            return p as IFlickrPhoto;
        });

        return {
            ...rawPhotosData,
            photo
        };
    }
}
