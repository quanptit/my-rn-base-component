// @flow
import React, { Component } from 'react';
import Dialog from './components/Dialog';
class PopupDialog extends Component {
    show(onShowed) {
        this.dialog.show(onShowed);
    }
    dismiss(onDismissed) {
        this.dialog.dismiss(onDismissed);
    }
    render() {
        return (<Dialog ref={(dialog) => { this.dialog = dialog; }} {...this.props}>
                {this.props.dialogTitle}
                {this.props.children}
            </Dialog>);
    }
}
export default PopupDialog;
