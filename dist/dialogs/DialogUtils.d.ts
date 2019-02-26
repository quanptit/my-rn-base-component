import { ReactChild } from 'react';
import OverflayContainer, { PositionAnchor } from "./OverflayContainer";
import { SubMenuSettingObj } from "./PopupMenuComponent";
import { BaseDialog } from "..";
import { AlertButton } from "react-native";
export declare class DialogUtils {
    static overflayContainer: OverflayContainer;
    static showDialog(dialogComponent: BaseDialog | ReactChild): void;
    /**isTopScreen => show phía trên cùng của screen*/
    static showCommonDialog(title: string, message: string, buttonOk: AlertButton, buttonCancel: AlertButton, isCancelable: boolean, renderOtherChild: any, isTopScreen: boolean): void;
    /**
     * buttonOk, buttonCancel có dạng: {text, onPress}
     * */
    static showQuestionDialog(title: string, message: string, buttonOk: AlertButton, buttonCancel?: AlertButton, cancelableForAndroid?: boolean): void;
    static showInfoDialog(title?: string, message?: string, buttonOk?: AlertButton, cancelableForAndroid?: boolean): void;
    static showRateDialogIfNeed(review_title: string, review_description: string, yes_sure: string, remind_me_late: string, androidID: string, iosId: string): Promise<boolean>;
    static showRatePage(androidID: string, iosId: string): void;
    static hideDialog(): void;
    static showPopUpMenu(listSubMeuSettingObj: SubMenuSettingObj[], anchorComponent: any): void;
    static showPopUpMenuComponent(popupMenuComponent: ReactChild, positionAnschor: PositionAnchor): void;
    static hidePopUpMenu(): void;
    static showOverComponent(overComponent: any, left: any, top: any, width: any, height: any): void;
    static hideOverComponent(): void;
}
