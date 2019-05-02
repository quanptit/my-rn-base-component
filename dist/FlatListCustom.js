import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { isEqual } from 'lodash';
import { sendError } from "my-rn-base-utils";
/**
 * Gọi notifyDataSetChanged để cập nhật data vào list
 * Chỉ thay đổi khi listData thay đổi. extraData của props không tính vì được chuyển vào state
 * */
export class FlatListCustom extends Component {
    constructor(props) {
        super(props);
        this.state = { extraData: props.extraData || 0 };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.extraData != this.state.extraData || !isEqual(nextProps.data, this.props.data);
    }
    /**như hàm notifyDataSetChanged của android, ko gây loading lại từ đầu listView*/
    notifyDataSetChanged() {
        this.setState((prevState) => {
            return { extraData: prevState.extraData + 1 };
        });
    }
    render() {
        return (<FlatList ref={(ref) => { this.flatList = ref; }} {...this.props} extraData={this.state.extraData}/>);
    }
    //region utils
    // Note: Cannot scroll to locations outside the render window without specifying the getItemLayout prop.
    scrollToIndex(params) {
        let listItems = this.props.data;
        if (listItems == null)
            return;
        if (params.index >= listItems.length) {
            sendError("scrollToIndex Fail: index > length");
            params.index = listItems.length - 1;
        }
        return this.flatList && this.flatList.scrollToIndex(params);
    }
    scrollToEnd(animated = true) {
        return this.flatList && this.flatList.scrollToEnd({ animated: animated });
    }
    scrollToOffset(offset, animated = true) {
        return this.flatList && this.flatList.scrollToOffset({ animated: animated, offset: offset });
    }
}
//region default props
FlatListCustom.defaultProps = {
    windowSize: 5,
    scrollsToTop: false,
    keyExtractor: (item, index) => { return String(index); },
    scrollEventThrottle: 16,
};
