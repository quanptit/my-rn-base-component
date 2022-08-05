import React, { Component } from 'react';
import { Image, StyleProp, Text, View, ViewStyle } from "react-native";
import FastImage, { ImageStyle, ResizeMode, Source } from 'react-native-fast-image';


export interface ImageCacheWrapProps {
    style?: StyleProp<ImageStyle>;
    source: Source | number;
    resizeMode?: ResizeMode;
}

export class ImageCacheWrap extends Component<ImageCacheWrapProps, { isLoaded: boolean }> {

    constructor(props: ImageCacheWrapProps) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
        this.state = { isLoaded: false };
    }
    onLoad(e) {
        this.setState({ isLoaded: true });
    }
    onError() {
    }

    render() {
        let { style, source, resizeMode } = this.props;
        let isLoaded = this.state.isLoaded;

        return <View style={style}>
            <FastImage
                onLoad={this.onLoad}
                onError={this.onError}
                style={[style]}
                source={source}
                resizeMode={resizeMode}
            />
            {!isLoaded && <Image style={[style as any, {
                position: 'absolute', left: 0, top: 0, right: 0, bottom: 0
            }]}
                source={require("../../assets/placeholder.jpg")}
                resizeMode={"cover"}
            />
            }
        </View>;
    }
}