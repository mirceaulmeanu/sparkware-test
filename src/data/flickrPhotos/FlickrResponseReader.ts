import { IFlickrResponse } from "./IFlickrResponse";
import { IFlickrPhoto } from "./IFlickrPhoto";

export class FlickrResponseReader {
    read(rawData: any) {
        /**
         * This reader doesn't do much but if any of the data from the server should be rearranged or validated in some way, this is the place.
         * Here we should only do minimal transformations, not aggregations specific for one view
         * 
         * Example: If we expect a value to be a number we can do `Number(rawData["key"])` and `isNaN` to check if it really is numeric
         * Or we could set a default if acceptable `Number(rawData["key"]) || 0`
         * 
         * Example: For arrays, we could check with `Array.isArray(rawData["key"])` or
         * (if defaulting to an empty array is acceptable) `((rawData["key"] || []) as any[])`
         */
        let fResponse: IFlickrResponse = {
            page: Number(rawData["page"]),
            pages: Number(rawData["pages"]),
            perPage: Number(rawData["perpage"]),
            total: String(rawData["total"]),
            photo: ((rawData["photo"] || []) as any[]).map((rawPhoto): IFlickrPhoto => {
                return {
                    farm: Number(rawPhoto["farm"]),
                    id: String(rawPhoto["id"]),
                    isFamily: Number(rawPhoto["isfamily"]),
                    isFriend: Number(rawPhoto["isfriend"]),
                    isPublic: Number(rawPhoto["ispublic"]),
                    owner: String(rawPhoto["owner"]),
                    secret: String(rawPhoto["secret"]),
                    server: String(rawPhoto["server"]),
                    title: String(rawPhoto["title"])
                };
            })
        };
        return fResponse;
    }
}