import React from "react";
import { Image } from "react-native";
export function _RenderCommonIconUtils(props) {
    let { style, color, fontSize, source } = props;
    return (<Image style={[style, { tintColor: color, width: fontSize, height: fontSize }]} source={source}/>);
}
