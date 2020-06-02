import { IFlickrPhoto } from "./IFlickrPhoto";

export interface IFlickrResponse {
    page: number;
    pages: number;
    perpage: number;
    photo: IFlickrPhoto[];
    total: string;
}
