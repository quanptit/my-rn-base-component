import { Component } from 'react';
import { _RenderCommonIconUtils } from "./_RenderCommonIconUtils";
export class IconCheckboxUncheck extends Component {
    render() {
        return _RenderCommonIconUtils({ source: require("../../assets/icons/checkbox-uncheck.png"), ...this.props });
    }
}
