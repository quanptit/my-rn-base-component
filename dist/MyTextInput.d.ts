/// <reference types="react" />
import { ReturnKeyTypeOptions, StyleProp, TextInputProps, TextStyle } from 'react-native';
import { PureComponentSkipFunction } from "./base/PureComponentSkipFunction";
interface Props extends TextInputProps {
    style?: StyleProp<TextStyle>;
    initialValue?: string;
    editable?: boolean;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    returnKeyType?: ReturnKeyTypeOptions;
    multiline?: boolean;
    autoFocus?: boolean;
}
interface State {
    text: string;
}
/**Component không update, nếu muốn update => Tạo component với key khác*/
export declare class MyTextInput extends PureComponentSkipFunction<Props, State> {
    textInput: any;
    constructor(props: any);
    render(): JSX.Element;
    getText(): string;
    setText(text: any): void;
    isFocused(): any;
    onChangeText(text: any): void;
    clear(): void;
    focus(): void;
    blur(): void;
    setNativeProps(nativeProps: any): void;
    measureInWindow(callback: any): void;
    measure(callback: any): void;
}
export {};
