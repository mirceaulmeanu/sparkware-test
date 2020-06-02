import React from 'react';
import { ThemeProvider } from "styled-components";
import { HomePage } from './pages/HomePage';
import { FlickrPhotosStore } from './data/flickrPhotos/FlickrPhotosStore';
import { FlickrPhotosState } from './data/flickrPhotos/FlickrPhotosState';
import { ITheme, createTheme } from './theme/theme';
import { Page } from './components/Page';

interface IAppProps {
    flickrPhotosStore: FlickrPhotosStore;
    flickrPhotosState: FlickrPhotosState;
}

export class App extends React.Component<IAppProps> {
    private theme: ITheme;

    constructor(props: IAppProps) {
        super(props);
        this.theme = createTheme();
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Page>
                    <HomePage
                        flickrPhotosStore={this.props.flickrPhotosStore}
                        flickrPhotosState={this.props.flickrPhotosState}
                    />
                </Page>
            </ThemeProvider>
        );
    }
}
