import React, {Component, ReactChild} from 'react';

interface Props {
    onRender: () => ReactChild;
    id?: string | number;
    hide?: boolean;
}

/**
 * Chỉ thay đổi khi id hoặc hide thay đổi
 */
export class VContainer extends Component<Props> {
    shouldComponentUpdate(nextProps: Props, nextState) {
        return this.props.id !== nextProps.id || this.props.hide !== nextProps.hide;
    }

    render() {
        if (this.props.hide) return null;
        return this.props.onRender();
    }
}
