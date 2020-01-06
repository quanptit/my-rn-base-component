import { Component } from 'react';
import { _RenderCommonIconUtils } from "./_RenderCommonIconUtils";
export class IconRadioButtonOn extends Component {
    render() {
        return _RenderCommonIconUtils({ source: require("./assets/radio-button-on.png"), ...this.props });
    }
}
