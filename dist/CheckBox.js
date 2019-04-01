import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Touchable } from './Touchable';
import { PureComponentSkipFunction } from "./base/PureComponentSkipFunction";
import { RenderUtils } from "./utils/RenderUtils";
// UnCotroler component
export class CheckBox extends PureComponentSkipFunction {
    _renderLeft() {
        if (this.props.leftTextView)
            return this.props.leftTextView;
        if (!this.props.leftText)
            return null;
        return (<Text style={[styles.leftText, this.props.leftTextStyle]}>
                {this.props.leftText}
            </Text>);
    }
    _renderRight() {
        if (this.props.rightTextView)
            return this.props.rightTextView;
        if (!this.props.rightText)
            return null;
        return (<Text style={[styles.rightText, this.props.rightTextStyle]}>
                {this.props.rightText}
            </Text>);
    }
    _renderImage() {
        if (this.props.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
        }
        else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
        }
    }
    genCheckedImage() {
        if (this.props.radio) {
            return this.props.isChecked
                ? <Icon name='ios-radio-button-on' style={[styles.icon, this.props.iconStyle]}/>
                : <Icon name='ios-radio-button-off' style={[styles.icon, this.props.iconStyle]}/>;
        }
        return this.props.isChecked
            ? RenderUtils.renderMaterialIcon("check-box", undefined, undefined, [styles.icon, this.props.iconStyle])
            : RenderUtils.renderMaterialIcon("check-box-outline-blank", undefined, undefined, [styles.icon, this.props.iconStyle]);
    }
    async onClick() {
        if (this.props.isReadOnly) {
            return;
        }
        this.props.onCheckedChanged && this.props.onCheckedChanged(!this.props.isChecked, this);
        this.props.onClick && this.props.onClick(this);
    }
    render() {
        return (<Touchable style={[styles.container, this.props.style]} onPress={() => this.onClick()}>
                {this._renderLeft()}
                {this._renderImage()}
                {this._renderRight()}
            </Touchable>);
    }
}
const styles = StyleSheet.create({
    icon: {
        fontSize: 23, color: "black"
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