import React from 'react';
import { PopupMenuComponent } from "./PopupMenuComponent";
import { sendError } from "my-rn-base-utils";
export class DialogInAppUtils {
    static showDialog(dialogComponent) {
        console.log("Show Dialog");
        if (DialogInAppUtils.overflayContainer != undefined)
            DialogInAppUtils.overflayContainer.showDialog(dialogComponent);
        else
            sendError("Show Dialog ERROR");
    }
    ;
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
