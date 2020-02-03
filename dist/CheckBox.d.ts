import { ReactChild } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { PureComponentSkipFunction } from "./base/PureComponentSkipFunction";
import { CommonIconProps } from "./common-icons/_RenderCommonIconUtils";
/**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 */
interface Props {
    style?: StyleProp<ViewStyle>;
    iconProps?: CommonIconProps;
    leftText?: string;
    leftTextStyle?: StyleProp<TextStyle>;
    leftTextView?: ReactChild;
    rightText?: string;
    rightTextView?: ReactChild;
    rightTextStyle?: StyleProp<TextStyle>;
    checkedImage?: ReactChild;
    unCheckedImage?: ReactChild;
    onClick?: (checkbox: CheckBox) => void;
    onCheckedChanged?: (isChecked: boolean, checkbox: CheckBox) => void;
    isChecked?: boolean;
    radio?: boolean;
    isReadOnly?: boolean;
}
export declare class CheckBox extends PureComponentSkipFunction<Props> {
    private _renderLeft;
    _renderRight(): string | number | JSX.Element;
    _renderImage(): string | number | JSX.Element;
    private genCheckedImage;
    onClick(): Promise<void>;
    render(): JSX.Element;
}
export {};
