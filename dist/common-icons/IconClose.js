import { Component } from 'react';
import { _RenderCommonIconUtils } from "./_RenderCommonIconUtils";
export class IconClose extends Component {
    render() {
        return _RenderCommonIconUtils({ source: require("../../assets/icons/close.png"), ...this.props });
    }
}
