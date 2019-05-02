import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { PureComponentSkipFunction } from "./base/PureComponentSkipFunction";
/**Component không update, nếu muốn update => Tạo component với key khác*/
export class MyTextInput extends PureComponentSkipFunction {
    constructor(props) {
        super(props);
        this.state = { text: this.props.initialValue };
    }
    render() {
        const { style, onChangeText, ...restProps } = this.props;
        return (<TextInput ref={(ref) => { this.textInput = ref; }} style={[styles.inputContainer, style]} {...restProps} underlineColorAndroid="transparent" value={this.state.text} onChangeText={this.onChangeText.bind(this)}/>);
    }
    //
    // componentWillReceiveProps(nextProps, nextContext) {
    //     let changeValue = this.state.text !== nextProps.value
    //     let changeEditable = this.state.editable !== nextProps.editable
    //
    //     if (changeValue && changeEditable)
    //         this.setState({editable: nextProps.editable, text: nextProps.value})
    //     else if (changeValue) {
    //         this.setState({text: nextProps.value})
    //     } else if (changeEditable) {
    //         this.setState({editable: nextProps.editable})
    //     }
    // }
    getText() {
        return this.state.text || "";
    }
    setText(text) {
        this.setState({ text: text });
    }
    isFocused() {
        return this.textInput && this.textInput.isFocused();
    }
    onChangeText(text) {
        this.setState({ text: text });
        this.props.onChangeText && this.props.onChangeText(text);
    }
    clear() {
        this.setState({ text: "" });
    }
    focus() {
        this.textInput.focus();
    }
    blur() {
        this.textInput.blur();
    }
    setNativeProps(nativeProps) {
        this.textInput.setNativeProps(nativeProps);
    }
    measureInWindow(callback) {
        this.textInput.measureInWindow(callback);
    }
    measure(callback) {
        this.textInput.measure(callback);
    }
}
const styles = StyleSheet.create({
    inputContainer: {
        height: 38, color: "black", fontSize: 16, marginHorizontal: 8, paddingHorizontal: 12,
        borderWidth: 1, borderRadius: 5, borderColor: "#CCC", paddingTop: 0, paddingBottom: 0
    }
});
