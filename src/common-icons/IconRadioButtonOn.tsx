import React, {Component} from 'react';
import {_RenderCommonIconUtils, CommonIconProps} from "./_RenderCommonIconUtils";

export class IconRadioButtonOn extends Component<CommonIconProps, any> {

    render() {
        return _RenderCommonIconUtils({source: require("../../assets/icons/radio-button-on.png"), ...this.props});
    }

}
