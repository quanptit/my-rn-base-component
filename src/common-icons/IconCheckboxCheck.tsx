import React, {Component} from 'react';
import {_RenderCommonIconUtils, CommonIconProps} from "./_RenderCommonIconUtils";

export class IconCheckboxCheck extends Component<CommonIconProps, any> {

    render() {
        return _RenderCommonIconUtils({source: require("./assets/checkbox-check.png"), ...this.props});
    }

}
