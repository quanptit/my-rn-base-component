import { PureComponent } from 'react';
import { TextProps } from 'react-native';
interface Props extends TextProps {
    value?: any;
}
/**Giống Text bình thường. nhưng textAlignVertical áp dụng cho cả IOS*/
export declare class TextCustom extends PureComponent<Props> {
    private root;
    render(): JSX.Element;
    private _renderIOS;
    private _renderAndroid;
    setNativeProps(nativeProps: any): void;
    measureInWindow(callback: any): void;
    measure(callback: any): void;
}
export {};
