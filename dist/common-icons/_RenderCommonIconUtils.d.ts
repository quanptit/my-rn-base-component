/// <reference types="react" />
import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
import Animated from "react-native-reanimated";
export interface CommonIconProps {
    style?: StyleProp<ImageStyle>;
    fontSize: number;
    color: string | Animated.Node<number>;
    isAnimate?: boolean;
}
export declare function _RenderCommonIconUtils(props: {
    source: ImageSourcePropType;
    fontSize: number;
    color: string;
    style?: any;
    isAnimate?: boolean;
}): JSX.Element;
