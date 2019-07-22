import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { StyleUtils } from "../StyleUtils";
import PopupDialog from "./popupDialog/PopupDialog";
import { Button, ButtonModel } from "../Button";
const s = StyleUtils.getAllStyle();
export default class CommonDialog extends Component {
    render() {
        let { width } = Dimensions.get("window");
        width = 0.85 * width;
        if (width > 400)
            width = 400;
        return (<PopupDialog style={this.props.style} dismissOnTouchOutside={this.props.dismissOnTouchOutside} dismissOnHardwareBackPress={this.props.dismissOnTouchOutside} width={width} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                <View style={{ margin: 16 }}>
                    {this._renderTitle()}
                    {this._renderMessage()}
                    {this._renderOtherChild()}
                    {this._renderButton()}
                </View>
            </PopupDialog>);
    }
    _renderOtherChild() {
        if (this.props.renderOtherChild)
            return <View style={{ marginTop: 16 }}>{this.props.renderOtherChild()}</View>;
    }
    buttonClick(buttonData) {
        if (!buttonData.disableAutoDismis)
            this.dismiss();
        buttonData.onPress && buttonData.onPress();
    }
    _renderButton() {
        let btnOk = this.props.btnOk;
        let btnCancel = this.props.btnCancel;
        if (!btnOk && !btnCancel)
            return;
        let buttons = [];
        if (btnOk)
            buttons.push(<Button key={buttons.length} title={btnOk.text} model={ButtonModel.transparent} textStyle={[s.f_lar, { color: "mediumblue" }]} onPress={() => this.buttonClick(btnOk)}/>);
        if (btnCancel)
            buttons.push(<Button key={buttons.length} title={btnCancel.text} model={ButtonModel.transparent} textStyle={[s.f_lar, { color: "mediumblue" }]} onPress={() => this.buttonClick(btnCancel)}/>);
        return (<View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16 }}>{buttons}</View>);
    }
    _renderMessage() {
        if (!this.props.message)
            return;
        return (<Text style={[s.f_nor, { marginTop: this.props.title ? 16 : 0, color: "dimgray" }]}>{this.props.message}</Text>);
    }
    _renderTitle() {
        if (!this.props.title)
            return;
        return (<Text style={[s.f_lar_b]}>{this.props.title}</Text>);
    }
    show(onShowed) {
        this.popupDialog.show();
    }
    dismiss(onDismissed) {
        this.popupDialog.dismiss();
    }
}
CommonDialog.defaultProps = { dismissOnTouchOutside: true };
