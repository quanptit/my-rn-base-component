/// <reference types="react" />
import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
export interface CommonIconProps {
    style?: StyleProp<ImageStyle>;
    fontSize: number;
    color: string;
}
export declare function _RenderCommonIconUtils(props: {
    source: ImageSourcePropType;
    fontSize: number;
    color: string;
    style?: any;
}): JSX.Element;
