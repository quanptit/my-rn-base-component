// @flow

import {StyleProp, ViewStyle} from 'react-native'

export interface PopupDialogType extends DialogType {
    dialogTitle?: any;
}

export type DialogType = {
    width?: any
    height?: any
    haveOverlay?: boolean;
    overlayPointerEvents?: string;
    overlayBackgroundColor?: string;
    overlayOpacity?: number;
    dialogAnimation?: any;
    dialogStyle?: any | number;
    animationDuration?: number;
    dismissOnTouchOutside?: boolean;
    touchOutsideEvent?: VoidFunction; // nếu có => ignore dismissOnTouchOutside
    dismissOnHardwareBackPress?: boolean;
    show?: boolean;
    onShowed?: any;
    onDismissed?: any;
    actions?: Array<any>;
    children: any;
    style?: StyleProp<ViewStyle>
}

export type DialogButtonType = {
    text: string;
    onPress: any;
    align?: string;
    buttonStyle?: Object | number;
    textStyle?: Object | number;
    textContainerStyle?: Object | number;
    disabled?: boolean;
    activeOpacity?: number;
}

export type DialogTitleType = {
    title: string | number;
    titleStyle?: Object | number;
    titleTextStyle?: Object | number;
    titleAlign?: string;
    haveTitleBar?: boolean;
}

export type OverlayType = {
    onPress: any
    backgroundColor?: string;
    opacity?: number;
    animationDuration?: number;
    showOverlay?: boolean;
    pointerEvents?: string;
}
