import { Component } from 'react';
import { DialogButtonType } from '../Type';
export default class DialogButton extends Component<DialogButtonType, any> {
    static defaultProps: {
        disabled: boolean;
        align: string;
    };
    render(): JSX.Element;
}
