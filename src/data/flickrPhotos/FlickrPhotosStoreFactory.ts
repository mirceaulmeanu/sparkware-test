import { FlickrPhotosStore } from "./FlickrPhotosStore";
import { FlickrPhotosApi } from "./FlickrPhotosApi";
import { FlickrPhotosResponseReader } from "./FlickrPhotosResponseReader";
import { AppConfig } from "src/AppConfig";
import { HttpApi } from "src/data/HttpApi";

export class FlickrPhotosStoreFactory {
    constructor(private appConfig: AppConfig, private httpApi: HttpApi) {}
    create() {
        return new FlickrPhotosStore(
            new FlickrPhotosApi(
                this.appConfig.getFlickrUrl(),
                this.httpApi
            ),
            new FlickrPhotosResponseReader()
        );
    }
}
