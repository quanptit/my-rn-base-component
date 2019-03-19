import { PureComponent } from 'react';
import { StyleProp, ViewStyle } from "react-native";
interface Props {
    style?: StyleProp<ViewStyle>;
    fillStyle?: StyleProp<ViewStyle>;
    unfillStyle?: StyleProp<ViewStyle>;
    /**in range: [0 - 1]*/
    progress: number;
    paddingBackground?: number;
}
export declare class HorizontalProgressBar extends PureComponent<Props, {
    width: number;
    height: number;
}> {
    static defaultProps: {
        progress: number;
        paddingBackground: number;
    };
    constructor(props: any);
    render(): JSX.Element;
    onLayout(event: any): void;
}
export {};
