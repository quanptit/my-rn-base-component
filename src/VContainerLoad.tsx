import React, {Component, ReactChild} from 'react'
import {StyleProp, View, ViewStyle, StyleSheet} from "react-native";
import {Button, ButtonModel} from "./Button";
import Spinner from "./Spinner";
import {CommonUtils, isIOS, sendError} from 'my-rn-base-utils';
import {isEqual} from 'lodash';
import {RenderUtils} from "./utils/RenderUtils";
import {getStringsCommon} from "my-rn-common-resource";
import {IconClose} from "./common-icons/IconClose";

interface State {
    isLoading?: boolean,
    isError?: boolean
}

export interface VContainerLoadProps {
    loadDataAsync: () => Promise<boolean>;
    onRender: () => ReactChild;
    onReady?: VoidFunction
    onError?: VoidFunction
    id?: string | number;
    hide?: boolean;
    showCloseButtonWhenError?: boolean
    isShowProgressLoading?: boolean
    isUsingInteraction?: boolean
    renderError?: () => ReactChild,
    renderLoading?: () => ReactChild,
    /**nếu ko bị error, empty .., hàm onrender sẽ không áp dụng cái contentContainerStyle truyền từ props*/
    skipContainerStyleIfHasChild?: boolean,
    // Khi Id change => reRender nhưng không reload
    skipReloadFromIdChange?: boolean
    contentContainerStyle?: StyleProp<ViewStyle>
}

/**Chỉ thay đổi khi prop: id hoặc hide thay đổi. Khi thay đổi sẽ loadDataAsync lại. nếu không muốn gọi forceUpdate*/
export abstract class VContainerLoad extends Component<VContainerLoadProps, State> {
    static defaultProps = {
        isUsingInteraction: true,
        skipContainerStyleIfHasChild: true,
    };
    private id = null;
    private _isMounted = null;

    protected constructor(props: any) {
        super(props);
        this.state = {isLoading: true, isError: false};
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.reload(this.props.onReady);
    }

    async componentDidUpdate(prevProps: VContainerLoadProps, prevState, snapshot) {
        if (!this.props.skipReloadFromIdChange && prevProps.id !== this.props.id)
            await this.reload();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    async reload(callback?: VoidFunction) {
        this.id = this.props.id;
        if (!this.state.isLoading)
            this.setState({isLoading: true, isError: false});
        try {
            let success = await this.props.loadDataAsync();
            if (this.props.isUsingInteraction) await CommonUtils.waitAfterInteractions();
            if (this.props.id === this.id && this._isMounted)// mục đích xác định sau khi tải xong, id vẫn đúng mới update
                this.setState({isLoading: false, isError: !success}, async () => {
                    if (success) {
                        await CommonUtils.requestAnimationFrameWithPromise();
                        callback && callback();
                    }
                });
        } catch (e) {
            sendError(e);
            if (this.props.id === this.id && this._isMounted) {
                this.setState({isLoading: false, isError: true});
                await CommonUtils.requestAnimationFrameWithPromise();
                this.props.onError && this.props.onError();
            }
        }
    }

    shouldComponentUpdate(nextProps: VContainerLoadProps, nextState) {
        return this.props.id !== nextProps.id || this.props.hide !== nextProps.hide
            || !isEqual(this.state, nextState);
    }

    //region Render ========
    render() {
        if (this.props.hide) return null;
        if (this.state.isLoading)
            return this._renderLoading();
        if (this.state.isError)
            return this._renderError();

        if (this.props.contentContainerStyle && !this.props.skipContainerStyleIfHasChild)
            return <View style={this.props.contentContainerStyle}>{this.props.onRender()}</View>;
        else
            return this.props.onRender();
    }

    protected _renderError() {
        let showCloseButtonWhenError = this.props.showCloseButtonWhenError;
        return <View style={this.props.contentContainerStyle}>
            {RenderUtils.renderErrorView(getStringsCommon().has_error, () => this.reload(),
                showCloseButtonWhenError ? 30 : 0)}
            {showCloseButtonWhenError && this._renderXbutton()}
        </View>
    }

    protected _renderLoading() {
        if (!this.props.isShowProgressLoading) return null;
        if (this.props.renderLoading) return this.props.renderLoading();

        return (
            <View style={this.props.contentContainerStyle}>
                <Spinner style={{marginTop: 60}} size="large" color="gray"/>
            </View>
        )
    }

    protected _renderXbutton() {
        return (
            <Button model={ButtonModel.transparent} onPress={() => CommonUtils.onBackPress()}
                    style={styles.xButton}>
                <IconClose fontSize={33} color="#cc1a00"/>
            </Button>
        )
    }

    //endregion
}

const styles = StyleSheet.create<any>({
    xButton: {
        width: 50, height: 50, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, position: 'absolute', right: 0,
        top: isIOS() ? 12 : 5
    }
});
