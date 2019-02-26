import { PureComponent } from 'react';
interface Props {
    listSubMeuSettingObj: SubMenuSettingObj[];
}
export declare class PopupMenuComponent extends PureComponent<Props, any> {
    private static _renderPopupMenuItem;
    render(): JSX.Element;
}
export interface SubMenuSettingObj {
    title: string;
    onPress: VoidFunction;
}
export {};
