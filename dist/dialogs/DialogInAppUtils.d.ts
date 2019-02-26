import { ReactChild } from 'react';
import OverflayContainer, { PositionAnchor } from "./OverflayContainer";
import { SubMenuSettingObj } from "./PopupMenuComponent";
export declare class DialogInAppUtils {
    static overflayContainer: OverflayContainer;
    static showDialog(dialogComponent: any): void;
    static hideDialog(): void;
    static showPopUpMenu(listSubMeuSettingObj: SubMenuSettingObj[], anchorComponent: any): void;
    static showPopUpMenuComponent(popupMenuComponent: ReactChild, positionAnschor: PositionAnchor): void;
    static hidePopUpMenu(): void;
    static showOverComponent(overComponent: any, left: any, top: any, width: any, height: any): void;
    static hideOverComponent(): void;
}
