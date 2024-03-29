import { Component } from 'react';
import { OverlayType } from '../Type';
declare class Overlay extends Component<OverlayType, any> {
    static defaultProps: {
        backgroundColor: string;
        opacity: number;
        animationDuration: number;
        showOverlay: boolean;
    };
    constructor(props: OverlayType);
    componentWillReceiveProps(nextProps: OverlayType): void;
    render(): JSX.Element;
}
export default Overlay;
