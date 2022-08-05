import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform, View, Text, Image } from 'react-native';
export var ButtonModel;
(function (ButtonModel) {
    ButtonModel[ButtonModel["primary"] = 1] = "primary";
    ButtonModel[ButtonModel["light"] = 2] = "light";
    ButtonModel[ButtonModel["success"] = 3] = "success";
    ButtonModel[ButtonModel["info"] = 4] = "info";
    ButtonModel[ButtonModel["warning"] = 5] = "warning";
    ButtonModel[ButtonModel["danger"] = 6] = "danger";
    ButtonModel[ButtonModel["dark"] = 7] = "dark";
    ButtonModel[ButtonModel["transparent"] = 8] = "transparent";
    ButtonModel[ButtonModel["border"] = 9] = "border";
})(ButtonModel || (ButtonModel = {}));
export class Button extends PureComponent {
    static defaultProps = {
        primaryColor: "#2196f3"
    };
    rootV;
    //region render title and icon ======
    _renderTitle(textColor) {
        if (this.props.title == null)
            return null;
        return (<Text key={"title"} numberOfLines={1} style={[{ color: textColor }, styles.textButton, this.props.textStyle]} allowFontScaling={this.props.allowFontScaling}>
                {this.props.title}
            </Text>);
    }
    _renderIcon(textColor, marginRightImg, marginTopImg) {
        return this.props.renderIcon && this.props.renderIcon("icon", textColor, { marginRight: marginRightImg, marginTop: marginTopImg });
    }
    _renderImage(marginRightImg, marginTopImg) {
        let imageProps = this.props.image;
        if (imageProps) {
            let styleImage = { width: undefined, marginRight: marginRightImg, marginTop: marginTopImg };
            if (this.props.isVertical)
                styleImage.alignSelf = "stretch";
            return (<Image key={"image"} {...imageProps} style={[styleImage, imageProps.style]}/>);
        }
        return null;
    }
    _renderTitleAndIcon(textColor) {
        let childElements = [];
        let marginRightImg = 0, marginTopImg = 0;
        if (this.props.renderIcon || this.props.image) {
            if (this.props.title != null && this.props.isVertical)
                marginTopImg = 5;
            else
                marginRightImg = 5;
        }
        childElements.push(this._renderIcon(textColor, marginRightImg, marginTopImg));
        childElements.push(this._renderImage(marginRightImg, marginTopImg));
        childElements.push(this._renderTitle(textColor));
        return childElements;
    }
    //endregion
    _renderChildren(textColor) {
        let childElements = [];
        React.Children.forEach(this.props.children, (item) => {
            if (typeof item === 'string' || typeof item === 'number') {
                const element = (<Text style={[{ color: textColor }, styles.textButton, this.props.textStyle]} allowFontScaling={this.props.allowFontScaling} key={item}>
                        {item}
                    </Text>);
                childElements.push(element);
            }
            else if (React.isValidElement(item)) {
                childElements.push(item);
            }
        });
        if (childElements.length > 0)
            return childElements;
        return this._renderTitleAndIcon(textColor);
    }
    _renderInnerText(textColor) {
        if (this.props.isLoading) {
            return (<ActivityIndicator animating={true} size='small' style={styles.spinner} color={this.props.activityIndicatorColor || textColor}/>);
        }
        return this._renderChildren(textColor);
    }
    render() {
        if (this.props.isHidden)
            return null;
        let { backgroundColor, textColor } = getBtnColor(this.props.model, this.props.primaryColor);
        let borderStyle = this.props.model === ButtonModel.border ? { borderWidth: 1, borderColor: this.props.primaryColor } : undefined;
        let paddingStyle;
        if (this.props.disabledPadding) {
            paddingStyle = undefined;
        }
        else if (this.props.disabledPaddingVertical) {
            paddingStyle = styles.buttonPaddingLeftRight;
        }
        else
            paddingStyle = styles.buttonPadding;
        if (this.props.disabled === true || this.props.isLoading === true) {
            return (<View ref={(ref) => { this.rootV = ref; }} style={[{ backgroundColor: backgroundColor }, styles.button, borderStyle, paddingStyle,
                    this.props.style, (this.props.disabledStyle || styles.opacity),
                    { flexDirection: (this.props.isVertical ? "column" : "row") }]}>
                    {this._renderInnerText(textColor)}
                </View>);
        }
        let touchableProps = {
            accessibilityLabel: this.props.accessibilityLabel,
            onPress: this.props.onPress,
            onPressIn: this.props.onPressIn,
            onPressOut: this.props.onPressOut,
            onLongPress: this.props.onLongPress,
            activeOpacity: this.props.activeOpacity,
            delayLongPress: this.props.delayLongPress,
            delayPressIn: this.props.delayPressIn,
            delayPressOut: this.props.delayPressOut
        };
        if (Platform.OS === 'android') {
            touchableProps = Object.assign(touchableProps, {
                background: this.props.background || TouchableNativeFeedback.SelectableBackground()
            });
            return (<TouchableNativeFeedback {...touchableProps}>
                    <View ref={(ref) => { this.rootV = ref; }} style={[styles.button, borderStyle, paddingStyle,
                    { backgroundColor: backgroundColor, flexDirection: (this.props.isVertical ? "column" : "row") },
                    this.props.style]}>
                        {this._renderInnerText(textColor)}
                    </View>
                </TouchableNativeFeedback>);
        }
        else {
            return (<TouchableOpacity ref={(ref) => { this.rootV = ref; }} {...touchableProps} style={[styles.button, borderStyle, paddingStyle,
                    { backgroundColor: backgroundColor, flexDirection: (this.props.isVertical ? "column" : "row") },
                    this.props.style]}>
                    {this._renderInnerText(textColor)}
                </TouchableOpacity>);
        }
    }
    //region utils
    /**
     * callback(x, y, width, height)
     * */
    measureInWindow(callback) {
        this.rootV.measureInWindow(callback);
    }
    measure(callback) {
        this.rootV.measure(callback);
    }
}
function getBtnColor(btnMode, primaryColor) {
    let backgroundColor, textColor;
    switch (btnMode) {
        case ButtonModel.primary:
            backgroundColor = primaryColor;
            textColor = "white";
            break;
        case ButtonModel.info:
            backgroundColor = "#6caef5";
            textColor = "white";
            break;
        case ButtonModel.danger:
            backgroundColor = "#d25351";
            textColor = "white";
            break;
        case ButtonModel.warning:
            backgroundColor = "#f37a48";
            textColor = "white";
            break;
        case ButtonModel.success:
            backgroundColor = "#66b95b";
            textColor = "white";
            break;
        case ButtonModel.dark:
            backgroundColor = "#000000";
            textColor = "white";
            break;
        case ButtonModel.transparent:
        case ButtonModel.border:
            backgroundColor = "transparent";
            textColor = "black";
            break;
        default: // light
            backgroundColor = "#E0E0E0";
            textColor = "black";
            break;
    }
    return { backgroundColor: backgroundColor, textColor: textColor };
}
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 6,
        justifyContent: 'center'
    },
    buttonPadding: {
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15
    },
    buttonPaddingLeftRight: {
        paddingLeft: 15,
        paddingRight: 15
    },
    textButton: {
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    spinner: {
        alignSelf: 'center'
    },
    opacity: {
        opacity: 0.5
    }
});
