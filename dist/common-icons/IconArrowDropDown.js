import { Component } from 'react';
import { _RenderCommonIconUtils } from "./_RenderCommonIconUtils";
export class IconArrowDropDown extends Component {
    render() {
        return _RenderCommonIconUtils({ source: require("./assets/arrow_drop_down.png"), ...this.props });
    }
}
