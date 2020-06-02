import { IFlickrPhoto } from "./IFlickrPhoto";

export interface IFlickrResponse {
    page: number;
    pages: number;
    perPage: number;
    photo: IFlickrPhoto[];
    total: string;
}
