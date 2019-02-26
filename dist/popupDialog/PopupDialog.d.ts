import { Component } from 'react';
import { PopupDialogType } from './Type';
declare class PopupDialog extends Component<PopupDialogType> {
    dialog: any;
    show(onShowed?: any): void;
    dismiss(onDismissed?: any): void;
    render(): any;
}
export default PopupDialog;
