/// <reference types="react" />
import { TextStyle, ViewStyle } from 'react-native';
import { PureComponentSkipFunction } from "./base/PureComponentSkipFunction";
interface Props {
    listData: string[];
    indexSelected: number;
    selectedChange: (indexSelected: number) => void;
    textStyle?: TextStyle;
    textSelectedStyle?: TextStyle;
    style?: ViewStyle;
}
export declare class ComboBox extends PureComponentSkipFunction<Props> {
    static defaultProps: {
        indexSelected: number;
        textStyle: (import("react-native").RegisteredStyle<TextStyle> | {
            color: string;
        })[];
        textSelectedStyle: (import("react-native").RegisteredStyle<TextStyle> | {
            color: string;
        })[];
    };
    private root;
    render(): JSX.Element;
    showListItem(): void;
    _renderListItem(items: string[]): JSX.Element;
    _renderItem(item: string, index: number): JSX.Element;
}
export {};
