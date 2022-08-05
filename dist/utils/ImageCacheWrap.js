import React, { Component } from 'react';
import { Image, View } from "react-native";
import FastImage from 'react-native-fast-image';
export class ImageCacheWrap extends Component {
    constructor(props) {
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
            <FastImage onLoad={this.onLoad} onError={this.onError} style={[style]} source={source} resizeMode={resizeMode}/>
            {!isLoaded && <Image style={[style, {
                        position: 'absolute', left: 0, top: 0, right: 0, bottom: 0
                    }]} source={require("../../assets/placeholder.jpg")} resizeMode={"cover"}/>}
        </View>;
    }
}
