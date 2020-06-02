import { AppConfig } from "src/AppConfig";
import { FlickrPhotosStoreFactory } from "./flickrPhotos/FlickrPhotosStoreFactory";
import { FlickrPhotosState } from "./flickrPhotos/FlickrPhotosState";
import { HttpApi } from "./HttpApi";

class AppRootServices {
    init() {
        let appConfigData: any;
        try {
            // NOTA BENE: Normally the config would be loaded from a configuration file, some json that we need to request or maybe an .env file.
            // But for simplicity i'm just putting the value here
            appConfigData = {
                FLICKR_URL: "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&content_type=1&is_getty=1&text=%s&page=%d"
            };
        } catch (e) {
            // No logging support yet
            console.error(`Couldn't load application config`, e);
            // return;
        }
        let appConfig = new AppConfig();
        appConfig.fromJson(appConfigData);

        let httpApi = new HttpApi();
        let flickrPhotosStore = (new FlickrPhotosStoreFactory(appConfig, httpApi)).create();
        let flickrPhotosState = new FlickrPhotosState();

        return {
            flickrPhotosStore,
            flickrPhotosState
        };
    }
}

let appRootServices = (new AppRootServices()).init();

export { appRootServices };
