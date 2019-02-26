import { PureComponent, ReactChild } from 'react';
import PopupDialog from "../popupDialog/PopupDialog";
/**
 * Sử dụng cho các dialog.
 public static showDialog(props?: Props) {
        DialogUtils.showDialog(<DialogPaymentChoose {...props}/>)
     }
 * */
export declare abstract class BaseDialog<P = {}, S = {}> extends PureComponent<P, S> {
    protected popupDialog: PopupDialog;
    protected abstract getWidth(): number | string;
    protected abstract renderContent(): ReactChild;
    protected getHeight(): number | string;
    render(): JSX.Element;
    show(onShowed?: any): void;
    dismiss(onDismissed?: any): void;
}
