import React from "react";
import {Image, ImageSourcePropType, ImageStyle, StyleProp} from "react-native";

export interface CommonIconProps {
    style?: ImageStyle
    fontSize: number
    color: string
}

export function _RenderCommonIconUtils(props: { source: ImageSourcePropType, fontSize: number, color: string, style?: any }) {
    let {style, color, fontSize, source} = props;
    return (
        <Image style={[style, {tintColor: color, width: fontSize, height: fontSize}]}
               source={source}/>
    )
}
