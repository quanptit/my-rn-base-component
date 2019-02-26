import { Component } from 'react';
import { ViewProps } from 'react-native';
interface Props extends ViewProps {
    message: string;
    cancelable: boolean;
}
export default class ProgressDialog extends Component<Props> {
    static defaultProps: {
        cancelable: boolean;
    };
    private popupDialog;
    private _isMounted;
    componentDidMount(): void;
    componentWillMount(): void;
    show(onShowed: any): void;
    dismiss(onDismissed: any): void;
    render(): JSX.Element;
}
export {};
