import React, {ReactChild} from 'react'
import OverflayContainer, {PositionAnchor} from "./OverflayContainer";
import {PopupMenuComponent, SubMenuSettingObj} from "./PopupMenuComponent";
import {sendError} from "my-rn-base-utils";
import {BaseDialog} from "..";
import {AlertButton} from "react-native";
import CommonDialog from "./CommonDialog";

export class DialogUtils {
    static overflayContainer: OverflayContainer;

    public static showDialog(dialogComponent: BaseDialog | ReactChild) {
        console.log("Show Dialog");
        if (DialogUtils.overflayContainer != undefined)
            DialogUtils.overflayContainer.showDialog(dialogComponent);
        else
            sendError("Show Dialog ERROR")
    };

    /**isTopScreen => show phía trên cùng của screen*/
    public static showCommonDialog(title: string, message: string, buttonOk: AlertButton, buttonCancel: AlertButton,
                                   isCancelable = true, renderOtherChild, isTopScreen: boolean) {
        DialogUtils.showDialog(<CommonDialog style={isTopScreen ? {justifyContent: "flex-start", paddingTop: 80} : undefined}
                                             title={title} message={message} dismissOnTouchOutside={isCancelable} btnOk={buttonOk} btnCancel={buttonCancel}
                                             renderOtherChild={renderOtherChild}/>)
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
            sendError("Không tồn tại phương thức measureInWindow")
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
