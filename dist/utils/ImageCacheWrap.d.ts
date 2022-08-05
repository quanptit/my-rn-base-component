import { Component } from 'react';
import { StyleProp } from "react-native";
import { ImageStyle, ResizeMode, Source } from 'react-native-fast-image';
export interface ImageCacheWrapProps {
    style?: StyleProp<ImageStyle>;
    source: Source | number;
    resizeMode?: ResizeMode;
}
export declare class ImageCacheWrap extends Component<ImageCacheWrapProps, {
    isLoaded: boolean;
}> {
    constructor(props: ImageCacheWrapProps);
    onLoad(e: any): void;
    onError(): void;
    render(): JSX.Element;
}
