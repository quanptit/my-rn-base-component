import React, {Component} from 'react';
import {_RenderCommonIconUtils, CommonIconProps} from "./_RenderCommonIconUtils";

export class IconClose extends Component<CommonIconProps, any> {

    render() {
        return _RenderCommonIconUtils({source: require("../../assets/icons/close.png"), ...this.props});
    }

}
