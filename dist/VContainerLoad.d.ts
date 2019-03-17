import { Component, ReactChild } from 'react';
import { StyleProp, ViewStyle } from "react-native";
interface State {
    isLoading?: boolean;
    isError?: boolean;
}
export interface VContainerLoadProps {
    loadDataAsync: () => Promise<boolean>;
    onRender: () => ReactChild;
    onReady?: VoidFunction;
    onError?: VoidFunction;
    id?: string | number;
    hide?: boolean;
    showCloseButtonWhenError?: boolean;
    isShowProgressLoading?: boolean;
    isUsingInteraction?: boolean;
    renderError?: () => ReactChild;
    renderLoading?: () => ReactChild;
    contentContainerStyle?: StyleProp<ViewStyle>;
}
/**Chỉ thay đổi khi prop: id hoặc hide thay đổi. Khi thay đổi sẽ loadDataAsync lại. nếu không muốn gọi forceUpdate*/
export declare abstract class VContainerLoad extends Component<VContainerLoadProps, State> {
    static defaultProps: {
        isUsingInteraction: boolean;
    };
    private id;
    private _isMounted;
    protected constructor(props: any);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: VContainerLoadProps, prevState: any, snapshot: any): Promise<void>;
    componentWillUnmount(): void;
    reload(callback?: VoidFunction): Promise<void>;
    shouldComponentUpdate(nextProps: VContainerLoadProps, nextState: any): boolean;
    render(): string | number | JSX.Element;
    protected _renderError(): JSX.Element;
    protected _renderLoading(): string | number | JSX.Element;
    protected _renderXbutton(): JSX.Element;
}
export {};
