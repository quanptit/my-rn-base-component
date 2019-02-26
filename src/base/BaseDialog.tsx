import React, {Component, PureComponent, ReactChild} from 'react'
import PopupDialog from "../popupDialog/PopupDialog";

/**
 * Sử dụng cho các dialog.
 public static showDialog(props?: Props) {
        DialogUtils.showDialog(<DialogPaymentChoose {...props}/>)
     }
 * */
export abstract class BaseDialog<P = {}, S = {}> extends PureComponent<P, S> {
    protected popupDialog: PopupDialog;

    // The Width of Dialog, you can use fixed height or use percentage: ex: 300, '85%'
    protected abstract getWidth(): number | string;

    protected abstract renderContent(): ReactChild;

    // không set => là auto theo content
    protected getHeight(): number | string {
        return undefined;
    }

    render() {
        return (
            <PopupDialog {...this.props} width={this.getWidth()} height={this.getHeight()}
                         ref={(popupDialog) => { this.popupDialog = popupDialog }}>
                {this.renderContent()}
            </PopupDialog>
        )

    }

    show(onShowed?) {
        this.popupDialog.show(onShowed)
    }

    dismiss(onDismissed?) {
        this.popupDialog.dismiss(onDismissed)
    }
}