import React, { Component } from 'react';
import { Insets, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
interface Props {
    id?: number | string;
    loadDataAsync: () => Promise<any[]>;
    renderItem: ListRenderItem<any>;
    defaultData?: any[];
    style?: StyleProp<ViewStyle>;
    isUsingInteraction?: boolean;
    keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";
    ItemSeparatorComponent?: React.ComponentType<any> | (() => React.ReactElement<any>) | null;
    onReady?: () => void;
    showErrorWhenEmpty?: boolean;
    showCloseButtonWhenError?: boolean;
    autoLoad?: boolean;
    contentOffset?: {
        x: number;
        y: number;
    };
    horizontal?: boolean;
    getItemLayout?: (data: any, index: any) => {
        length: number;
        offset: number;
        index: number;
    };
    contentInset?: Insets;
    ListFooterComponent?: React.ComponentClass<any> | React.ReactElement<any> | (() => React.ReactElement<any>) | null;
}
interface State {
    extraData: number;
    listItems: any[];
    isLoading: boolean;
    isError: boolean;
}
/**
 * Sử dụng defaultData để hiển thị trước. sau đó gọi loadDataAsync. và sử dụng data lấy ở đây.
 * Chỉ thay đổi khi props id thay dổi
 * Muốn tải lại data gọi: notifyDataSetChanged
 * */
export declare class FlatListLoad extends Component<Props, State> {
    static defaultProps: {
        isUsingInteraction: boolean;
    };
    private flatList;
    private _isMounted;
    private id;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Props, prevState: any, snapshot: any): Promise<void>;
    /**như hàm notifyDataSetChanged của android, ko gây loading lại từ đầu listView*/
    notifyDataSetChanged(isReloadData: boolean): Promise<void>;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
    private _renderError;
    private _renderLoading;
    private static _renderXbutton;
}
export {};
