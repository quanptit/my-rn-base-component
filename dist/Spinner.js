'use strict';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ComponentNoUpdate } from "./base/ComponentNoUpdate";
export default class Spinner extends ComponentNoUpdate {
    render() {
        // if (Platform.OS === 'android') {
        //     var width, height;
        //     if (this.props.size == "large") {
        //         width = 50;
        //         height = 50
        //     } else {
        //         width = 20;
        //         height = 20
        //     }
        //     return (
        //         <ProgressBar styleAttr="Inverse" style={{height: height, width: width}} {...this.props}/>
        //     );
        // } else {
        return (<ActivityIndicator {...this.props}/>);
        // }
    }
}
Spinner.defaultProps = {
    color: "white",
    size: "small",
    animating: true
};
