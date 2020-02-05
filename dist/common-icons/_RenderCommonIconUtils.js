import React from "react";
import { Image } from "react-native";
// @ts-ignore
import Animated from "react-native-reanimated";
export function _RenderCommonIconUtils(props) {
    let { style, color, fontSize, source, isAnimate } = props;
    if (isAnimate)
        return (
        // @ts-ignore
        <Animated.Image tintColor={color} style={[style, { tintColor: color, width: fontSize, height: fontSize }]} source={source}/>);
    return (<Image style={[style, { tintColor: color, width: fontSize, height: fontSize }]} source={source}/>);
}
