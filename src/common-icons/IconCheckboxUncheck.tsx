import React, {Component} from 'react';
import {_RenderCommonIconUtils, CommonIconProps} from "./_RenderCommonIconUtils";

export class IconCheckboxUncheck extends Component<CommonIconProps, any> {

    render() {
        return _RenderCommonIconUtils({source: require("../../assets/icons/checkbox-uncheck.png"), ...this.props});
    }

}
