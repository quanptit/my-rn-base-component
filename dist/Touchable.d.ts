import { Component } from 'react';
import { ViewProps } from "react-native";
export interface TouchableProperties extends ViewProps {
    onPress: () => any;
    underlayColor?: string;
}
export declare class Touchable extends Component<TouchableProperties, any> {
    private root;
    render(): JSX.Element;
    _renderChildren(): any[];
    setNativeProps(nativeProps: any): void;
    measureInWindow(callback: any): void;
    measure(callback: any): void;
}
