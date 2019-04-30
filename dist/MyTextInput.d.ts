/// <reference types="react" />
import { ReturnKeyTypeOptions, StyleProp, TextStyle } from 'react-native';
import { ComponentNoUpdate } from "./base/ComponentNoUpdate";
interface Props {
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
    editable: boolean;
}
/**Component không update, nếu muốn update => Tạo component với key khác*/
export declare class MyTextInput extends ComponentNoUpdate<Props, State> {
    static defaultProps: {
        editable: boolean;
    };
    textInput: any;
    constructor(props: any);
    render(): JSX.Element;
    getText(): string;
    setText(text: any): void;
    setEditable(editable: boolean): void;
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
