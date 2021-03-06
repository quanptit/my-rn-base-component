import { PureComponent, ReactInstance } from 'react';
import { StyleProp, TextStyle, ViewStyle, ImageProps } from 'react-native';
export declare enum ButtonModel {
    primary = 1,
    light = 2,
    success = 3,
    info = 4,
    warning = 5,
    danger = 6,
    dark = 7,
    transparent = 8,
    border = 9
}
export interface ButtonProps {
    model?: ButtonModel;
    primaryColor?: string;
    isLoading?: boolean;
    disabled?: boolean;
    isHidden?: boolean;
    disabledPaddingVertical?: boolean;
    allowFontScaling?: boolean;
    disabledPadding?: boolean;
    isVertical?: boolean;
    activeOpacity?: number;
    delayPressIn?: number;
    delayPressOut?: number;
    delayLongPress?: number;
    background?: any;
    title?: string;
    renderIcon?: (key: any, color: string, style: any) => ReactInstance;
    image?: ImageProps;
    accessibilityLabel?: string;
    activityIndicatorColor?: string;
    textStyle?: StyleProp<TextStyle>;
    disabledStyle?: StyleProp<ViewStyle>;
    onPress?: () => any;
    onLongPress?: () => any;
    onPressIn?: () => any;
    onPressOut?: () => any;
    style?: StyleProp<ViewStyle>;
}
export declare class Button extends PureComponent<ButtonProps> {
    static defaultProps: {
        primaryColor: string;
    };
    private rootV;
    private _renderTitle;
    private _renderIcon;
    private _renderImage;
    private _renderTitleAndIcon;
    private _renderChildren;
    _renderInnerText(textColor: string): any[] | JSX.Element;
    render(): JSX.Element;
    /**
     * callback(x, y, width, height)
     * */
    measureInWindow(callback: any): void;
    measure(callback: any): void;
}
