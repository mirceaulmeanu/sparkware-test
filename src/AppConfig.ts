interface IAppConfigData {
    FLICKR_URL: string;
}

export class AppConfig {
    private data: IAppConfigData;

    fromJson(data: IAppConfigData) {
        this.data = data;
    }

    getFlickrUrl() {
        return this.data.FLICKR_URL;
    }
}
