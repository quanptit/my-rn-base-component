import React, { PureComponent } from 'react';
import PopupDialog from "../dialogs/popupDialog/PopupDialog";
/**
 * Sử dụng cho các dialog.
 public static showDialog(props?: Props) {
        DialogUtils.showDialog(<DialogPaymentChoose {...props}/>)
     }
 * */
export class BaseDialog extends PureComponent {
    // không set => là auto theo content
    getHeight() {
        return undefined;
    }
    render() {
        return (<PopupDialog {...this.props} width={this.getWidth()} height={this.getHeight()} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                {this.renderContent()}
            </PopupDialog>);
    }
    show(onShowed) {
        this.popupDialog.show(onShowed);
    }
    dismiss(onDismissed) {
        this.popupDialog.dismiss(onDismissed);
    }
}
