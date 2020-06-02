import { FlickrPhotosApi } from "./FlickrPhotosApi";
import { FlickrResponseReader } from "./FlickrResponseReader";
import { SearchTermTooShortError } from "./errors/SearchTermTooShortError";

export class FlickrPhotosStore {
    constructor(private flickrPhotosApi: FlickrPhotosApi, private flickrResponseReader: FlickrResponseReader) {}
    async fetch(searchTerm: string, page?: number) {
        if (searchTerm.length < 3) {
            throw new SearchTermTooShortError();
        }
        let rawPhotosData = await this.flickrPhotosApi.fetch(searchTerm, page);
        let response = this.flickrResponseReader.read(rawPhotosData);
        return response;
    }
}
