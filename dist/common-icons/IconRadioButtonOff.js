import { Component } from 'react';
import { _RenderCommonIconUtils } from "./_RenderCommonIconUtils";
export class IconRadioButtonOff extends Component {
    render() {
        return _RenderCommonIconUtils({ source: require("./assets/radio-button-off.png"), ...this.props });
    }
}
