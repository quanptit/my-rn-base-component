import { Component } from 'react';
/**
 * Chỉ thay đổi khi id hoặc hide thay đổi
 */
export class VContainer extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.id !== nextProps.id || this.props.hide !== nextProps.hide;
    }
    render() {
        if (this.props.hide)
            return null;
        return this.props.onRender();
    }
}
