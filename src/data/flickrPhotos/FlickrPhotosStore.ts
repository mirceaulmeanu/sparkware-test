import { FlickrPhotosApi } from "./FlickrPhotosApi";
import { FlickrPhotosResponseReader } from "./FlickrPhotosResponseReader";
import { SearchTermTooShortError } from "./errors/SearchTermTooShortError";

export class FlickrPhotosStore {
    constructor(private flickrPhotosApi: FlickrPhotosApi, private flickrResponseReader: FlickrPhotosResponseReader) {}
    async fetch(searchTerm: string, page?: number) {
        if (searchTerm.length < 3) {
            throw new SearchTermTooShortError();
        }
        let rawPhotosData = await this.flickrPhotosApi.fetch(searchTerm, page);
        let response = this.flickrResponseReader.read(rawPhotosData);
        return response;
    }
}
