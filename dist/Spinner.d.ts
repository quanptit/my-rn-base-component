/// <reference types="react" />
import { ActivityIndicatorProps } from 'react-native';
import { ComponentNoUpdate } from "./base/ComponentNoUpdate";
export default class Spinner extends ComponentNoUpdate<ActivityIndicatorProps, any> {
    static defaultProps: {
        color: string;
        size: string;
        animating: boolean;
    };
    render(): JSX.Element;
}
