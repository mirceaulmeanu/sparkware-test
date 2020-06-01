import React from 'react';
import { HomePage } from './pages/HomePage';
import { FlickrPhotosStore } from './data/flickrPhotos/FlickrPhotosStore';
import { FlickrPhotosState } from './data/flickrPhotos/FlickrPhotosState';

interface IAppProps {
    flickrPhotosStore: FlickrPhotosStore;
    flickrPhotosState: FlickrPhotosState;
}

export class App extends React.Component<IAppProps> {
    render() {
        return (
            <HomePage
                flickrPhotosStore={this.props.flickrPhotosStore}
                flickrPhotosState={this.props.flickrPhotosState}
            />
        );
    }
}
