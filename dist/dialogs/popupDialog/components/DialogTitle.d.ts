import { Component } from 'react';
import { DialogTitleType } from '../Type';
export default class DialogTitle extends Component<DialogTitleType, any> {
    static defaultProps: {
        titleAlign: string;
        haveTitleBar: boolean;
    };
    render(): JSX.Element;
}
