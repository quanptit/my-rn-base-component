import { ReactChild } from 'react';
import { ViewProps } from 'react-native';
import { ComponentNoUpdate } from '../base/ComponentNoUpdate';
export interface PositionAnchor {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface Props extends ViewProps {
}
export default class OverflayContainer extends ComponentNoUpdate<Props, any> {
    dialogComponent: any;
    popupMenuComponent: any;
    positionAnschor: any;
    positionOverComponent: any;
    overComponent: any;
    private listenner;
    showPopupMenu(popupMenuComponent: ReactChild, positionAnschor: PositionAnchor): void;
    hidePopupMenu(): void;
    showDialog(dialogComponent: any): void;
    hideDialog(): void;
    showOverflayComponent(overCompnent: any, left: any, top: any, width: any, height: any): void;
    hideOverflayComponent(): void;
    render(): JSX.Element;
    _renderOverComponent(): JSX.Element;
    _renderPopup(): JSX.Element;
    currentOrientation: any;
    _orientationDidChange(orientation: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
export {};
