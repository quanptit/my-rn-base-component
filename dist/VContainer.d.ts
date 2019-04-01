import React, { Component, ReactChild } from 'react';
interface Props {
    onRender: () => ReactChild;
    id?: string | number;
    hide?: boolean;
}
/**
 * Chỉ thay đổi khi id hoặc hide thay đổi
 */
export declare class VContainer extends Component<Props> {
    shouldComponentUpdate(nextProps: Props, nextState: any): boolean;
    render(): React.ReactChild;
}
export {};
