import React, {ReactChild} from 'react'
import OverflayContainer, {PositionAnchor} from "./OverflayContainer";
import {PopupMenuComponent, SubMenuSettingObj} from "./PopupMenuComponent";
import {isIOS, PreferenceUtils, sendError} from "my-rn-base-utils";
import {BaseDialog} from "..";
import {Alert, AlertButton, Linking} from "react-native";
import CommonDialog from "./CommonDialog";
import ProgressDialog from "./ProgressDialog";

export class DialogUtils {
    static overflayContainer: OverflayContainer;

    public static showDialog(dialogComponent: BaseDialog | ReactChild) {
        console.log("Show Dialog");
        if (DialogUtils.overflayContainer != undefined)
            DialogUtils.overflayContainer.showDialog(dialogComponent);
        else
            sendError("Show Dialog ERROR")
    };

    public static showProgressDialog(message, cancelable = true) {
        DialogUtils.showDialog(<ProgressDialog message={message} cancelable={cancelable}/>)
    }

    /**isTopScreen => show phía trên cùng của screen*/
    public static showCommonDialog(title: string, message: string, buttonOk: AlertButton, buttonCancel: AlertButton,
                                   isCancelable = true, renderOtherChild, isTopScreen: boolean) {
        DialogUtils.showDialog(<CommonDialog style={isTopScreen ? {justifyContent: "flex-start", paddingTop: 80} : undefined}
                                             title={title} message={message} dismissOnTouchOutside={isCancelable} btnOk={buttonOk} btnCancel={buttonCancel}
                                             renderOtherChild={renderOtherChild}/>)
    }


    /**
     * buttonOk, buttonCancel có dạng: {text, onPress}
     * */
    public static showQuestionDialog(title: string, message: string, buttonOk: AlertButton, buttonCancel: AlertButton = null, cancelableForAndroid = true) {
        if (buttonOk == undefined)
            buttonOk = {text: "OK"};
        else if (buttonOk.text == undefined)
            buttonOk.text = "OK";

        if (buttonCancel == undefined)
            buttonCancel = {text: "CANCEL"};

        buttonCancel.style = 'cancel';
        Alert.alert(title, message,
            [buttonCancel, buttonOk],
            {cancelable: cancelableForAndroid}
        )
    }

    public static showInfoDialog(title?: string, message?: string, buttonOk?: AlertButton, cancelableForAndroid?: boolean) {
        if (buttonOk == undefined)
            buttonOk = {text: "OK"};
        else if (buttonOk.text == undefined)
            buttonOk.text = "OK";

        Alert.alert(title, message,
            [buttonOk],
            {cancelable: cancelableForAndroid}
        )
    }

    public static async showRateDialogIfNeed(review_title: string, review_description: string,
                                             yes_sure: string, remind_me_late: string, androidID: string, iosId: string): Promise<boolean> {
        let hasVote = await PreferenceUtils.getBooleanSetting("HAS_VOTE_APP");
        let numberPlaycount = await PreferenceUtils.getNumberSetting("PLAY_COUNT");
        let isNumberMatch = false;
        if (numberPlaycount === 15)
            isNumberMatch = true;
        else if (numberPlaycount > 0 && numberPlaycount % 30 === 0)
            isNumberMatch = true;
        let canShow = (!hasVote) && isNumberMatch;
        numberPlaycount++;
        await PreferenceUtils.saveSeting("PLAY_COUNT", numberPlaycount);

        if (canShow) {
            console.log("show dialog rate");
            this.showQuestionDialog(review_title, review_description, {
                text: yes_sure, onPress: () => {
                    this.showRatePage(androidID, iosId);
                }
            }, {text: remind_me_late});
            return true;
        }
        return false;
    }

    public static showRatePage(androidID: string, iosId: string) {
        if (isIOS()) {
            Linking.openURL("https://itunes.apple.com/app/id" + iosId + "#").catch(err => console.error('An error occurred', err))
        } else {
            Linking.openURL("market://details?id=" + androidID).catch(err => {
                console.error('An error occurred', err);
                Linking.openURL("https://play.google.com/store/apps/details?id=" + androidID)
                    .catch(err => sendError(err));
            });
        }
        PreferenceUtils.saveBooleanSettingCallback("HAS_VOTE_APP", true)
    }

    public static hideDialog() {
        this.overflayContainer && this.overflayContainer.hideDialog()
    }

    public static showPopUpMenu(listSubMeuSettingObj: SubMenuSettingObj[], anchorComponent: any) {
        if (this.overflayContainer == null || listSubMeuSettingObj == null) {
            sendError("showPopUpMenu Null Param");
            return
        }

        if (!anchorComponent.measureInWindow) {
            sendError("Không tồn tại phương thức measureInWindow");
            return
        }

        anchorComponent.measureInWindow((x: number, y: number, width: number, height: number) => {
            console.log("measureInWindow: ", x, y, width, height);
            let positionAnchor: PositionAnchor = {x: x, y: y, width: width, height: height};
            if (this.overflayContainer && listSubMeuSettingObj) {
                this.overflayContainer.showPopupMenu(<PopupMenuComponent listSubMeuSettingObj={listSubMeuSettingObj}/>,
                    positionAnchor)
            } else
                console.log("showPopUpMenu ERROR")
        })
    }

    public static showPopUpMenuComponent(popupMenuComponent: ReactChild, positionAnschor: PositionAnchor) {
        if (this.overflayContainer != undefined)
            this.overflayContainer.showPopupMenu(popupMenuComponent, positionAnschor);
        else
            console.log("showPopUpMenu ERROR")
    }

    public static hidePopUpMenu() {
        this.overflayContainer && this.overflayContainer.hidePopupMenu()
    }

    public static showOverComponent(overComponent, left, top, width, height) {
        if (this.overflayContainer != undefined)
            this.overflayContainer.showOverflayComponent(overComponent, left, top, width, height)
        else
            console.log("showPopUpMenu ERROR")
    }

    public static hideOverComponent() {
        this.overflayContainer && this.overflayContainer.hideOverflayComponent()
    }
}
