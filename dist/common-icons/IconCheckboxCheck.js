import { Component } from 'react';
import { _RenderCommonIconUtils } from "./_RenderCommonIconUtils";
export class IconCheckboxCheck extends Component {
    render() {
        return _RenderCommonIconUtils({ source: require("../../assets/icons/checkbox-check.png"), ...this.props });
    }
}
