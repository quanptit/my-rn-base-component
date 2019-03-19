import { Component } from 'react';
import { FlatListProps } from 'react-native';
interface State {
    extraData: number;
}
/**
 * Gọi notifyDataSetChanged để cập nhật data vào list
 * Chỉ thay đổi khi listData thay đổi. extraData của props không tính vì được chuyển vào state
 * */
export declare class FlatListCustom extends Component<FlatListProps<any>, State> {
    static defaultProps: {
        windowSize: number;
        scrollsToTop: boolean;
        keyExtractor: (item: any, index: any) => string;
        scrollEventThrottle: number;
    };
    private flatList;
    constructor(props: FlatListProps<any>);
    shouldComponentUpdate(nextProps: FlatListProps<any>, nextState: any): boolean;
    /**như hàm notifyDataSetChanged của android, ko gây loading lại từ đầu listView*/
    notifyDataSetChanged(): void;
    render(): JSX.Element;
    scrollToIndex(params: {
        animated: boolean;
        index: number;
        viewOffset: number;
        viewPosition: 0 | 0.5 | 1;
    }): any;
    scrollToEnd(animated?: boolean): any;
    scrollToOffset(offset: any, animated?: boolean): any;
}
export {};
