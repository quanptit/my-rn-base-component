import React from "react";
import {Image, ImageSourcePropType, ImageStyle, StyleProp, ViewStyle} from "react-native";
// @ts-ignore
import Animated from "react-native-reanimated";

export interface CommonIconProps {
    style?: StyleProp<ImageStyle>
    fontSize: number
    color: string | Animated.Node<number>
    isAnimate?: boolean
}

export function _RenderCommonIconUtils(props: { source: ImageSourcePropType, fontSize: number, color: string, style?: any, isAnimate?: boolean }) {
    let {style, color, fontSize, source, isAnimate} = props;
    if (isAnimate)
        return (
            // @ts-ignore
            <Animated.Image tintColor={color} style={[style, {tintColor: color, width: fontSize, height: fontSize}]}
                            source={source}/>
        );

    return (
        <Image style={[style, {tintColor: color, width: fontSize, height: fontSize}]}
               source={source}/>
    )
}
