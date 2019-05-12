import React, {Component, ReactElement} from 'react';
import {StyleProp, ViewStyle, View} from "react-native";
import {isEqual} from "lodash"
import {CommonUtils, isIOS, sendError} from "my-rn-base-utils";
import {getStringsCommon} from "my-rn-common-resource";
import {RenderUtils} from '../utils/RenderUtils';
import Spinner from '../Spinner';
import {Button, ButtonModel} from '../Button';

export interface BaseLoadingProps {
    renderLoading?: () => any,
    renderError?: () => any, //renderErrorView(reloadCallback)
    diableAutoLoad?: boolean,
    usingInteraction?: boolean
    style?: StyleProp<ViewStyle>
}

export interface BaseLoadingStates {
    isLoading?: boolean,
    isError?: boolean
}

/*
- Có thể gọi setState trong hàm onLoadStartAsync
- Chỉ update State change
- Không sử dụng VContainerLoad vì khi muốn setState cho chính component này
* */
export abstract class BaseLoading<P extends BaseLoadingProps, S extends BaseLoadingStates> extends Component<P, S> {
    protected abstract getInittialState(): S;

    protected abstract onLoadStartAsync(): Promise<boolean>

    protected abstract renderContent(): ReactElement

    protected isShowProgressLoading(): boolean {
        return false
    }

    protected isShowCloseButtonWhenError(): boolean {
        return false
    }

    constructor(props) {
        super(props);
        let obj = this.getInittialState();
        obj.isLoading = true;
        this.state = obj;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.state, nextState);
    }

    async componentDidMount() {
        if (!this.props.diableAutoLoad) {
            if (this.props.usingInteraction)
                await CommonUtils.waitAfterInteractions();
            return this.reload();
        }
    }

    public async reload() {
        try {
            let success = await this.onLoadStartAsync();
            this.setState({isLoading: false, isError: !success})
        } catch (e) {
            sendError("BaseLoading Load");
            sendError(e);
            this.setState({isLoading: false, isError: true})
        }
    }

    render() {
        if (this.state.isLoading)
            return this._renderLoading();

        if (this.state.isError)
            return this._renderError();

        return this.renderContent();
    }

    private _renderError() {
        let showCloseButtonWhenError = this.isShowCloseButtonWhenError();
        return <View style={this.props.style}>
            {RenderUtils.renderErrorView(getStringsCommon().has_error, this.reload.bind(this),
                showCloseButtonWhenError ? 30 : 0)}
            {showCloseButtonWhenError && this._renderXbutton()}
        </View>
    }

    private _renderLoading() {
        if (!this.isShowProgressLoading()) return null;

        return (
            <View style={this.props.style}>
                <Spinner style={{marginTop: 60}} size="large" color="gray"/>
            </View>
        )
    }

    private _renderXbutton() {
        return (
            <Button model={ButtonModel.transparent} onPress={() => CommonUtils.onBackPress()}
                    style={{
                        width: 50, height: 50, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, position: 'absolute', right: 0,
                        top: isIOS() ? 12 : 5
                    }}>
                {RenderUtils.renderIcon("md-close", 33, '#cc1a00')}
            </Button>
        )
    }
}
