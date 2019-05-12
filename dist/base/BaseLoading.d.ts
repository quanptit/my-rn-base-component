import { Component, ReactElement } from 'react';
import { StyleProp, ViewStyle } from "react-native";
export interface BaseLoadingProps {
    renderLoading?: () => any;
    renderError?: () => any;
    diableAutoLoad?: boolean;
    usingInteraction?: boolean;
    style?: StyleProp<ViewStyle>;
}
export interface BaseLoadingStates {
    isLoading?: boolean;
    isError?: boolean;
}
export declare abstract class BaseLoading<P extends BaseLoadingProps, S extends BaseLoadingStates> extends Component<P, S> {
    protected abstract getInittialState(): S;
    protected abstract onLoadStartAsync(): Promise<boolean>;
    protected abstract renderContent(): ReactElement;
    protected isShowProgressLoading(): boolean;
    protected isShowCloseButtonWhenError(): boolean;
    constructor(props: any);
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidMount(): Promise<void>;
    reload(): Promise<void>;
    render(): JSX.Element;
    private _renderError;
    private _renderLoading;
    private _renderXbutton;
}
