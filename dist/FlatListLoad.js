import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Spinner from "./Spinner";
import { Button, ButtonModel } from "./Button";
import { getStringsCommon } from "my-rn-common-resource";
import { CommonUtils, isEmpty, isIOS, sendError } from "my-rn-base-utils";
import { isEqual } from "lodash";
import { RenderUtils } from "./utils/RenderUtils";
import { IconClose } from "./common-icons/IconClose";
/**
 * Sử dụng defaultData để hiển thị trước. sau đó gọi loadDataAsync. và sử dụng data lấy ở đây.
 * Chỉ cập nhật khi prop: id thay đổi. các props khác không tính
 * */
export class FlatListLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extraData: 0, listItems: props.defaultData,
            isLoading: props.defaultData == null && props.loadDataAsync != null, isError: false
        };
    }
    async componentDidMount() {
        this._isMounted = true;
        if (this.props.loadDataAsync == null)
            return;
        await this.notifyDataSetChanged(true);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id)
            await this.notifyDataSetChanged(true);
    }
    /**như hàm notifyDataSetChanged của android, ko gây loading lại từ đầu listView*/
    async notifyDataSetChanged(isReloadData) {
        if (isReloadData) {
            try {
                if (!this.state.isLoading)
                    this.setState({ isLoading: true, isError: false });
                this.id = this.props.id;
                let newListItem = await this.props.loadDataAsync();
                if (this.props.id === this.id && this._isMounted) {
                    if (this.props.isUsingInteraction)
                        await CommonUtils.waitAfterInteractions();
                    this.setState((prevState) => {
                        return { listItems: newListItem, extraData: prevState.extraData + 1, isLoading: false, isError: false };
                    });
                }
            }
            catch (e) {
                sendError(e);
                if (this.props.id === this.id && this._isMounted) {
                    if (this.props.isUsingInteraction)
                        await CommonUtils.waitAfterInteractions();
                    this.setState((prevState) => {
                        return { extraData: prevState.extraData + 1, isLoading: false, isError: true };
                    });
                }
            }
        }
        else {
            this.setState((prevState) => {
                return { extraData: prevState.extraData + 1 };
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.extraData !== this.state.extraData || !isEqual(nextProps.id, this.props.id);
    }
    render() {
        if (isEmpty(this.state.listItems)) {
            if (this.state.isLoading)
                return this._renderLoading();
            if (this.state.isError)
                return this._renderError();
        }
        let props = {
            style: this.props.style,
            keyExtractor: (item, index) => { return String(index); },
            keyboardShouldPersistTaps: this.props.keyboardShouldPersistTaps,
            ItemSeparatorComponent: this.props.ItemSeparatorComponent,
            contentOffset: this.props.contentOffset,
            renderItem: this.props.renderItem,
            data: this.state.listItems,
            extraData: this.state.extraData,
            horizontal: this.props.horizontal,
            getItemLayout: this.props.getItemLayout,
            windowSize: 5,
            scrollsToTop: false,
            scrollEventThrottle: 16,
            contentInset: this.props.contentInset,
            ListFooterComponent: this.props.ListFooterComponent,
            ListEmptyComponent: this.props.ListEmptyComponent,
            contentContainerStyle: this.props.contentContainerStyle,
            onScroll: this.props.onScroll,
            showsHorizontalScrollIndicator: this.props.showsHorizontalScrollIndicator
            // keyboardShouldPersistTaps: "always"
        };
        return (<FlatList ref={(ref) => { this.flatList = ref; }} {...props}/>);
    }
    //region utils
    _renderError() {
        return (<View style={[this.props.contentContainerStyle, this.props.style]}>
                {RenderUtils.renderErrorView(getStringsCommon().has_error, () => {
            // noinspection JSIgnoredPromiseFromCall
            this.notifyDataSetChanged(true);
        }, this.props.showCloseButtonWhenError ? 30 : 0)}
                {this.props.showCloseButtonWhenError && FlatListLoad._renderXbutton()}
            </View>);
    }
    _renderLoading() {
        if (this.props.renderLoading)
            return this.props.renderLoading();
        return (<View style={[this.props.contentContainerStyle, this.props.style]}>
                <Spinner style={{ marginTop: 60 }} size="large" color="gray"/>
            </View>);
    }
    static _renderXbutton() {
        return (<Button model={ButtonModel.transparent} onPress={() => CommonUtils.onBackPress()} style={{
            width: 50, height: 50, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, position: 'absolute', right: 0,
            top: isIOS() ? 12 : 5
        }}>
                <IconClose fontSize={33} color="#cc1a00"/>
            </Button>);
    }
    //endregion
    getItemCount() {
        let listItems = this.state.listItems;
        if (listItems == null)
            return 0;
        return listItems.length;
    }
    getItemData(index) {
        let listItems = this.state.listItems;
        if (listItems == null || index >= listItems.length)
            return null;
        return listItems[index];
    }
    getListItems() {
        return this.state.listItems;
    }
}
