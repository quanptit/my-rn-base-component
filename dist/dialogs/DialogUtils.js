import React from 'react';
import { PopupMenuComponent } from "./PopupMenuComponent";
import { isIOS, PreferenceUtils, sendError } from "my-rn-base-utils";
import { Alert, Linking } from "react-native";
import CommonDialog from "./CommonDialog";
export class DialogUtils {
    static showDialog(dialogComponent) {
        console.log("Show Dialog");
        if (DialogUtils.overflayContainer != undefined)
            DialogUtils.overflayContainer.showDialog(dialogComponent);
        else
            sendError("Show Dialog ERROR");
    }
    ;
    /**isTopScreen => show phía trên cùng của screen*/
    static showCommonDialog(title, message, buttonOk, buttonCancel, isCancelable = true, renderOtherChild, isTopScreen) {
        DialogUtils.showDialog(<CommonDialog style={isTopScreen ? { justifyContent: "flex-start", paddingTop: 80 } : undefined} title={title} message={message} dismissOnTouchOutside={isCancelable} btnOk={buttonOk} btnCancel={buttonCancel} renderOtherChild={renderOtherChild}/>);
    }
    /**
     * buttonOk, buttonCancel có dạng: {text, onPress}
     * */
    static showQuestionDialog(title, message, buttonOk, buttonCancel = null, cancelableForAndroid = true) {
        if (buttonOk == undefined)
            buttonOk = { text: "OK" };
        else if (buttonOk.text == undefined)
            buttonOk.text = "OK";
        if (buttonCancel == undefined)
            buttonCancel = { text: "CANCEL" };
        buttonCancel.style = 'cancel';
        Alert.alert(title, message, [buttonCancel, buttonOk], { cancelable: cancelableForAndroid });
    }
    static showInfoDialog(title, message, buttonOk, cancelableForAndroid) {
        if (buttonOk == undefined)
            buttonOk = { text: "OK" };
        else if (buttonOk.text == undefined)
            buttonOk.text = "OK";
        Alert.alert(title, message, [buttonOk], { cancelable: cancelableForAndroid });
    }
    static async showRateDialogIfNeed(review_title, review_description, yes_sure, remind_me_late, androidID, iosId) {
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
            }, { text: remind_me_late });
            return true;
        }
        return false;
    }
    static showRatePage(androidID, iosId) {
        if (isIOS()) {
            Linking.openURL("https://itunes.apple.com/app/id" + iosId + "#").catch(err => console.error('An error occurred', err));
        }
        else {
            Linking.openURL("market://details?id=" + androidID).catch(err => {
                console.error('An error occurred', err);
                Linking.openURL("https://play.google.com/store/apps/details?id=" + androidID)
                    .catch(err => sendError(err));
            });
        }
        PreferenceUtils.saveBooleanSettingCallback("HAS_VOTE_APP", true);
    }
    static hideDialog() {
        this.overflayContainer && this.overflayContainer.hideDialog();
    }
    static showPopUpMenu(listSubMeuSettingObj, anchorComponent) {
        if (this.overflayContainer == null || listSubMeuSettingObj == null) {
            sendError("showPopUpMenu Null Param");
            return;
        }
        if (!anchorComponent.measureInWindow) {
            sendError("Không tồn tại phương thức measureInWindow");
            return;
        }
        anchorComponent.measureInWindow((x, y, width, height) => {
            console.log("measureInWindow: ", x, y, width, height);
            let positionAnchor = { x: x, y: y, width: width, height: height };
            if (this.overflayContainer && listSubMeuSettingObj) {
                this.overflayContainer.showPopupMenu(<PopupMenuComponent listSubMeuSettingObj={listSubMeuSettingObj}/>, positionAnchor);
            }
            else
                console.log("showPopUpMenu ERROR");
        });
    }
    static showPopUpMenuComponent(popupMenuComponent, positionAnschor) {
        if (this.overflayContainer != undefined)
            this.overflayContainer.showPopupMenu(popupMenuComponent, positionAnschor);
        else
            console.log("showPopUpMenu ERROR");
    }
    static hidePopUpMenu() {
        this.overflayContainer && this.overflayContainer.hidePopupMenu();
    }
    static showOverComponent(overComponent, left, top, width, height) {
        if (this.overflayContainer != undefined)
            this.overflayContainer.showOverflayComponent(overComponent, left, top, width, height);
        else
            console.log("showPopUpMenu ERROR");
    }
    static hideOverComponent() {
        this.overflayContainer && this.overflayContainer.hideOverflayComponent();
    }
}
