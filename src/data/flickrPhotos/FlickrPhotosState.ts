import { observable } from "mobx";
import { IFlickrPhoto } from "./IFlickrPhoto";
import { IFlickrResponse } from "./IFlickrResponse";


export class FlickrPhotosState {
    @observable
    private _loadInProgress = false;
    @observable
    private _searchText = "";
    @observable
    private _photos: IFlickrPhoto[] = [];
    @observable
    private _errorMessage = "";
    @observable
    private _pagesLoaded = 0;
    @observable
    private _totalPages = 0;

    reset() {
        this._loadInProgress = false;
        this._pagesLoaded = 0;
        this._errorMessage = "";
    }

    update(res: IFlickrResponse, append?: boolean) {
        this._loadInProgress = false;
        this._errorMessage = "";
        this._photos = append ? [...this._photos, ...res.photo] : res.photo;
        this._pagesLoaded = res.page;
        this._totalPages = res.pages;
        if (this._photos.length === 0) {
            this._errorMessage = "Couldn't find any photo";
        }
    }

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

    set pagesLoaded(noOfPages: number) {
        this._pagesLoaded = noOfPages;
    }
    get pagesLoaded() {
        return this._pagesLoaded;
    }

    set totalPages(noOfPages: number) {
        this._totalPages = noOfPages;
    }
    get totalPages() {
        return this._totalPages;
    }
}
