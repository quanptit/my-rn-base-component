import React, {Component} from 'react'
import {FlatList, FlatListProps, ListRenderItem, StyleProp, View, ViewStyle} from 'react-native'
import {isEqual} from 'lodash'
import {sendError} from "my-rn-base-utils";

interface State {
    extraData: number;
}

/**
 * Gọi notifyDataSetChanged để cập nhật data vào list
 * Chỉ thay đổi khi listData thay đổi. extraData của props không tính vì được chuyển vào state
 * */
export class FlatListCustom extends Component<FlatListProps<any>, State> {
    //region default props
    static defaultProps = {
        windowSize: 5,
        scrollsToTop: false,
        keyExtractor: (item, index) => {return String(index)},
        scrollEventThrottle: 16,
    };
    //endregion
    private flatList: any;

    constructor(props: FlatListProps<any>) {
        super(props);
        this.state = {extraData: props.extraData || 0};
    }

    shouldComponentUpdate(nextProps: FlatListProps<any>, nextState: any) {
        return nextState.extraData != this.state.extraData || !isEqual(nextProps.data, this.props.data);
    }

    /**như hàm notifyDataSetChanged của android, ko gây loading lại từ đầu listView*/
    notifyDataSetChanged() {
        this.setState((prevState: State) => {
            return {extraData: prevState.extraData + 1}
        });
    }

    render() {
        return (
            <FlatList ref={(ref) => {this.flatList = ref}} {...this.props} extraData={this.state.extraData}/>
        );
    }

    //region utils

    // getItemData(index) {
    //     return this.listItems && this.listItems[index]
    // }
    //
    // getListItems() {
    //     return this.listItems
    // }
    //
    // getItemCount() {
    //     return this.listItems && this.listItems.length
    // }

    // Note: Cannot scroll to locations outside the render window without specifying the getItemLayout prop.
    scrollToIndex(params: { animated: boolean, index: number, viewOffset: number, viewPosition: 0 | 0.5 | 1 }) {
        let listItems = this.props.data;
        if (listItems == null) return;
        if (params.index >= listItems.length) {
            sendError("scrollToIndex Fail: index > length");
            params.index = listItems.length - 1;
        }
        return this.flatList && this.flatList.scrollToIndex(params)
    }

    scrollToEnd(animated = true) {
        return this.flatList && this.flatList.scrollToEnd({animated: animated})
    }

    scrollToOffset(offset, animated = true) {
        return this.flatList && this.flatList.scrollToOffset({animated: animated, offset: offset})
    }

    //endregion
}
