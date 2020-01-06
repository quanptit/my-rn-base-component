import React, {Component} from 'react';
import {_RenderCommonIconUtils, CommonIconProps} from "./_RenderCommonIconUtils";

export class IconRadioButtonOff extends Component<CommonIconProps, any> {

    render() {
        return _RenderCommonIconUtils({source: require("./assets/radio-button-off.png"), ...this.props});
    }

}
