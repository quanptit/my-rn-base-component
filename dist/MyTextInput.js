import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ComponentNoUpdate } from "./base/ComponentNoUpdate";
/**Component không update, nếu muốn update => Tạo component với key khác*/
export class MyTextInput extends ComponentNoUpdate {
    constructor(props) {
        super(props);
        this.state = { text: this.props.initialValue, editable: this.props.editable };
    }
    render() {
        const { style, onChangeText, editable, ...restProps } = this.props;
        return (<TextInput ref={(ref) => { this.textInput = ref; }} style={[styles.inputContainer, style]} {...restProps} underlineColorAndroid="transparent" value={this.state.text} editable={this.state.editable} onChangeText={this.onChangeText.bind(this)}/>);
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
    setEditable(editable) {
        this.setState({ editable: editable });
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
MyTextInput.defaultProps = {
    editable: true
};
const styles = StyleSheet.create({
    inputContainer: {
        height: 38, color: "black", fontSize: 16, marginHorizontal: 8, paddingHorizontal: 12,
        borderWidth: 1, borderRadius: 5, borderColor: "#CCC", paddingTop: 0, paddingBottom: 0
    }
});
