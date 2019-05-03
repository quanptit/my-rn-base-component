import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { isIOS } from "my-rn-base-utils";
/**Giống Text bình thường. nhưng textAlignVertical áp dụng cho cả IOS*/
export class TextCustom extends PureComponent {
    render() {
        if (isIOS())
            return this._renderIOS();
        return this._renderAndroid();
    }
    _renderIOS() {
        let { numberOfLines, style, ...otherProps } = this.props;
        let styleObj = StyleSheet.flatten(style);
        let { textAlignVertical, ...otherStyle } = styleObj;
        if (textAlignVertical && textAlignVertical !== "auto") { // textAlignVertical IOS
            let { color, fontSize, fontStyle, fontWeight, textAlign, textDecorationStyle, textDecorationLine, textDecorationColor, ...viewStyle } = otherStyle;
            let textStyle = {
                color: color, fontSize: fontSize, fontStyle: fontStyle, fontWeight: fontWeight,
                textAlign: textAlign, textAlignVertical: textAlignVertical,
                textDecorationStyle: textDecorationStyle,
                textDecorationColor: textDecorationColor,
                textDecorationLine: textDecorationLine
            };
            if (textAlignVertical === "bottom")
                viewStyle.justifyContent = "flex-end";
            else
                viewStyle.justifyContent = "center";
            return (<View ref={(ref) => { this.root = ref; }} {...otherProps} style={viewStyle}>
                    <Text numberOfLines={numberOfLines} style={textStyle}>
                        {this.props.value || this.props.children}
                    </Text>
                </View>);
        }
        return this._renderAndroid();
    }
    _renderAndroid() {
        if (this.props.value)
            return (<Text ref={(ref) => { this.root = ref; }} {...this.props}>
                    {this.props.value}
                </Text>);
        return <Text ref={(ref) => { this.root = ref; }} {...this.props}/>;
    }
    //region measure & native method
    setNativeProps(nativeProps) {
        this.root && this.root.setNativeProps(nativeProps);
    }
    measureInWindow(callback) {
        this.root && this.root.measureInWindow(callback);
    }
    measure(callback) {
        this.root && this.root.measure(callback);
    }
}
