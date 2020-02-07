import { Component, ReactInstance } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    title?: string;
    message?: string;
    btnOk?: {
        text?: string;
        onPress?: VoidFunction;
        disableAutoDismis?: boolean;
    };
    btnCancel?: {
        text?: string;
        onPress?: VoidFunction;
        disableAutoDismis?: boolean;
    };
    dismissOnTouchOutside?: boolean;
    renderOtherChild?: () => ReactInstance;
    style?: StyleProp<ViewStyle>;
}
export default class CommonDialog extends Component<Props> {
    static defaultProps: {
        dismissOnTouchOutside: boolean;
    };
    private popupDialog;
    render(): JSX.Element;
    _renderOtherChild(): any;
    buttonClick(buttonData: {
        text?: string;
        onPress?: VoidFunction;
        disableAutoDismis?: boolean;
    }): void;
    _renderButton(): any;
    _renderMessage(): any;
    _renderTitle(): any;
    show(onShowed?: any): void;
    dismiss(onDismissed?: any): void;
}
export {};
