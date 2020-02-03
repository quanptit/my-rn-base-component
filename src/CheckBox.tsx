import React, {Component, PureComponent, ReactChild} from 'react'

import {StyleSheet, Image, Text, StyleProp, TextStyle, ViewStyle, ImageStyle} from 'react-native'
import {Touchable} from './Touchable'
import {PureComponentSkipFunction} from "./base/PureComponentSkipFunction";
import {IconRadioButtonOn} from "./common-icons/IconRadioButtonOn";
import {IconRadioButtonOff} from "./common-icons/IconRadioButtonOff";
import {IconCheckboxCheck} from "./common-icons/IconCheckboxCheck";
import {IconCheckboxUncheck} from "./common-icons/IconCheckboxUncheck";
import {CommonIconProps} from "./common-icons/_RenderCommonIconUtils";


/**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 */
interface Props {
    style?: StyleProp<ViewStyle>
    iconProps?: CommonIconProps

    leftText?: string
    leftTextStyle?: StyleProp<TextStyle>
    leftTextView?: ReactChild

    rightText?: string
    rightTextView?: ReactChild
    rightTextStyle?: StyleProp<TextStyle>

    checkedImage?: ReactChild
    unCheckedImage?: ReactChild
    onClick?: (checkbox: CheckBox) => void
    onCheckedChanged?: (isChecked: boolean, checkbox: CheckBox) => void
    isChecked?: boolean
    radio?: boolean
    isReadOnly?: boolean
}


// UnCotroler component
export class CheckBox extends PureComponentSkipFunction<Props> {

    private _renderLeft() {
        if (this.props.leftTextView) return this.props.leftTextView;
        if (!this.props.leftText) return null;
        return (
            <Text style={[styles.leftText, this.props.leftTextStyle as any]}>
                {this.props.leftText}
            </Text>
        )
    }

    _renderRight() {
        if (this.props.rightTextView) return this.props.rightTextView;
        if (!this.props.rightText) return null;
        return (
            <Text style={[styles.rightText, this.props.rightTextStyle as any]}>
                {this.props.rightText}
            </Text>
        )
    }

    _renderImage() {
        if (this.props.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage()
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage()
        }
    }

    private genCheckedImage() {
        if (this.props.radio) {
            return this.props.isChecked
                ? <IconRadioButtonOn fontSize={23} color="black" {...this.props.iconProps}/>
                : <IconRadioButtonOff fontSize={23} color="black" {...this.props.iconProps}/>
        }
        return this.props.isChecked
            ? <IconCheckboxCheck fontSize={23} color="black" {...this.props.iconProps}/>
            : <IconCheckboxUncheck fontSize={23} color="black" {...this.props.iconProps}/>
    }

    async onClick() {
        if (this.props.isReadOnly) {
            return
        }
        this.props.onCheckedChanged && this.props.onCheckedChanged(!this.props.isChecked, this);
        this.props.onClick && this.props.onClick(this);
    }

    render() {
        return (
            <Touchable style={[styles.container, this.props.style as any]} onPress={() => this.onClick()}>
                {this._renderLeft()}
                {this._renderImage()}
                {this._renderRight()}
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        color: "black", width: 23, height: 23
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
        color: 'black',
        fontSize: 16,
    },
    rightText: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontSize: 16,
    }
});
