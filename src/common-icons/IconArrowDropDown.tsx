import React, {Component} from 'react';
import {_RenderCommonIconUtils, CommonIconProps} from "./_RenderCommonIconUtils";

export class IconArrowDropDown extends Component<CommonIconProps, any> {

    render() {
        return _RenderCommonIconUtils({source: require("./assets/arrow_drop_down.png"), ...this.props});
    }

}
