import React, { Component } from 'react';
import PopupDialog from "./popupDialog/PopupDialog";
import Spinner from "../Spinner";
import { TextCustom } from "../TextCustom";
export default class ProgressDialog extends Component {
    static defaultProps = {
        cancelable: true
    };
    popupDialog;
    _isMounted;
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillMount() {
        this._isMounted = false;
    }
    show(onShowed) {
        this._isMounted && this.popupDialog.show();
    }
    dismiss(onDismissed) {
        this._isMounted && this.popupDialog.dismiss();
    }
    render() {
        return (<PopupDialog dismissOnTouchOutside={this.props.cancelable} dismissOnHardwareBackPress={this.props.cancelable} width={"85%"} show={true} ref={(popupDialog) => { this.popupDialog = popupDialog; }} dialogStyle={{ backgroundColor: "transparent" }}>
                <Spinner style={{ alignSelf: "center" }} size="large" color="white"/>
                {this.props.message != undefined && <TextCustom value={this.props.message} style={{ color: "white", textAlign: "center", marginTop: 8 }}/>}
            </PopupDialog>);
    }
}
