import React from "react";
import { observer } from "mobx-react";

import { FlickrPhotosStore } from "src/data/flickrPhotos/FlickrPhotosStore";
import { FlickrPhotosState } from "src/data/flickrPhotos/FlickrPhotosState";
import { SearchTermTooShortError } from "src/data/flickrPhotos/errors/SearchTermTooShortError";

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
            <div><input
                type="text"
                onChange={(ev) => { this.onSearchTermChange(ev.currentTarget.value) }}
                value={this.props.flickrPhotosState.searchText}
            /></div>
            <div>
                <div>Results</div>
                <div>{ this.props.flickrPhotosState.searchText }</div>
                <div>{ this.props.flickrPhotosState.loadInProgress ? "Loading ..." : "" }</div>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    { this.props.flickrPhotosState.photos.map(photo => <div key={photo.id} style={{width: 100, height: 100, margin: 20}}>
                        <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`} alt={photo.title} />
                    </div>) }
                </div>
            </div>
        </div>;
    }

    onSearchTermChange(searchTerm: string) {
        this.props.flickrPhotosState.searchText = searchTerm;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(async () => {
            try {
                this.props.flickrPhotosState.errorMessage = "";
                this.props.flickrPhotosState.loadInProgress = true;
                let photos = await this.props.flickrPhotosStore.fetch(this.props.flickrPhotosState.searchText);
                this.props.flickrPhotosState.photos = photos;
                this.props.flickrPhotosState.loadInProgress = false;
            } catch (e) {
                this.props.flickrPhotosState.loadInProgress = false;
                if (e instanceof SearchTermTooShortError) {
                    this.props.flickrPhotosState.errorMessage = "Search term is too short too give relevant results."
                } else {
                    throw e;
                }
            }
        }, 500);
    }

    private onScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            // you're at the bottom of the page
            console.log("Bottom of page");
        }
    }
}
