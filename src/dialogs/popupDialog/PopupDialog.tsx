// @flow
import React, {Component} from 'react'
import {PopupDialogType} from './Type'
import Dialog from './components/Dialog'


class PopupDialog extends Component<PopupDialogType> {
    dialog: any

    show(onShowed?: any) {
        this.dialog.show(onShowed)
    }

    dismiss(onDismissed?: any) {
        this.dialog.dismiss(onDismissed)
    }

    render() {
        return (
            <Dialog ref={(dialog) => { this.dialog = dialog }}
                    {...this.props}      >
                {this.props.dialogTitle}
                {this.props.children}
            </Dialog>
        )
    }
}

export default PopupDialog
