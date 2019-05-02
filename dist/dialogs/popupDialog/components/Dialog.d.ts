import { Component } from 'react';
import DefaultAnimation from '../animations/DefaultAnimation';
import { DialogType } from '../Type';
declare class Dialog extends Component {
    state: {
        dialogState: string;
    };
    props: DialogType;
    static defaultProps: {
        animationDuration: number;
        dialogAnimation: DefaultAnimation;
        width: number;
        dismissOnTouchOutside: boolean;
        dismissOnHardwareBackPress: boolean;
        haveOverlay: boolean;
        show: boolean;
    };
    constructor(props: DialogType);
    componentDidMount(): void;
    hardwareBackEventHandler(): boolean;
    componentWillReceiveProps(nextProps: DialogType): void;
    componentWillUnmount(): void;
    onOverlayPress(): void;
    setDialogState(toValue: number, callback?: () => void): void;
    show(onShowed?: () => {}): void;
    dismiss(onDismissed?: () => {}): void;
    readonly pointerEvents: string;
    readonly dialogSize: Object;
    render(): JSX.Element;
}
export default Dialog;
