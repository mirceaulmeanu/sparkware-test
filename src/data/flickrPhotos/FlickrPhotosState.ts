import { observable } from "mobx";
import { IFlickrPhoto } from "./IFlickrPhoto";

export class FlickrPhotosState {
    @observable
    private _loadInProgress = false;
    @observable
    private _searchText = "";
    @observable
    private _photos: IFlickrPhoto[] = [];
    @observable
    private _errorMessage = "";

    set searchText(val: string) {
        this._searchText = val;
    }
    get searchText() {
        return this._searchText;
    }

    set photos(p: IFlickrPhoto[]) {
        this._photos = p;
    }
    get photos() {
        return this._photos;
    }

    set loadInProgress(progress: boolean) {
        this._loadInProgress = progress;
    }
    get loadInProgress() {
        return this._loadInProgress;
    }

    set errorMessage(msg: string) {
        this._errorMessage = msg;
    }
    get errorMessage() {
        return this._errorMessage;
    }
}
