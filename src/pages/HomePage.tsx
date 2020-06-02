import React from "react";
import { observer } from "mobx-react";
import { FlickrPhotosStore } from "src/data/flickrPhotos/FlickrPhotosStore";
import { FlickrPhotosState } from "src/data/flickrPhotos/FlickrPhotosState";
import { SearchTermTooShortError } from "src/data/flickrPhotos/errors/SearchTermTooShortError";
import { SearchInputWrapper } from "src/components/homepage/SearchInputWrapper";
import { SearchInput } from "src/components/homepage/SearchInput";
import { Card } from "src/components/homepage/Card";
import loadinggif from "src/icons/loading.gif";

interface IHomePageProps {
    flickrPhotosStore: FlickrPhotosStore;
    flickrPhotosState: FlickrPhotosState;
}

@observer
export class HomePage extends React.Component<IHomePageProps> {
    private searchTimeout: number | undefined;

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    render() {
        return <div>
            <SearchInputWrapper>
                <SearchInput
                    onChange={(ev) => { this.onSearchTermChange(ev.currentTarget.value) }}
                    value={this.props.flickrPhotosState.searchText}
                    loadInProgress={this.props.flickrPhotosState.loadInProgress}
                    error={this.props.flickrPhotosState.errorMessage}
                />
            </SearchInputWrapper>
            <div>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    { this.props.flickrPhotosState.photos.map(photo => <Card key={photo.id}>
                        <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`} alt={photo.title} />
                    </Card>) }
                </div>
            </div>
            { this.props.flickrPhotosState.loadInProgress ? <div style={{textAlign: "center"}}>
                <img src={ loadinggif } alt="" style={{width: 36}} />
            </div> : null }
        </div>;
    }

    onSearchTermChange(searchTerm: string) {
        this.props.flickrPhotosState.searchText = searchTerm;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(async () => {
            // NOTA BENE: Part of this code is repeated below, for infinite scrolling. Maybe it would be better
            // to extract it in a separate class that would manage the state and the store
            this.props.flickrPhotosState.reset();
            this.props.flickrPhotosState.loadInProgress = true;
            try {
                let photosResponse = await this.props.flickrPhotosStore.fetch(this.props.flickrPhotosState.searchText);
                this.props.flickrPhotosState.update(photosResponse);
            } catch (e) {
                this.props.flickrPhotosState.loadInProgress = false;
                if (e instanceof SearchTermTooShortError) {
                    this.props.flickrPhotosState.errorMessage = "Search term is too short too give relevant results."
                } else {
                    throw e;
                }
            }
            this.props.flickrPhotosState.loadInProgress = false;
        }, 500);
    }

    private onScroll = async () => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            if (this.props.flickrPhotosState.pagesLoaded < this.props.flickrPhotosState.totalPages && !this.props.flickrPhotosState.loadInProgress) {
                let nextPage = this.props.flickrPhotosState.pagesLoaded + 1;
                this.props.flickrPhotosState.loadInProgress = true;
                try {
                    let photosResponse = await this.props.flickrPhotosStore.fetch(this.props.flickrPhotosState.searchText, nextPage);
                    this.props.flickrPhotosState.update(photosResponse, true);
                } catch (e) {
                    this.props.flickrPhotosState.loadInProgress = false;
                    if (e instanceof SearchTermTooShortError) {
                        this.props.flickrPhotosState.errorMessage = "Search term is too short too give relevant results."
                    } else {
                        throw e;
                    }
                }
                this.props.flickrPhotosState.loadInProgress = false;
            }
        }
    }
}
