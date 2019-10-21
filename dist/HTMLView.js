import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import HTMLViewLib from 'my-rn-htmlview';
import { StyleUtils } from "./StyleUtils";
const fontNormal = StyleUtils.getFontNormal();
const BODY_TAG_PATTERN = /\<\/ *body\>/;
//https://github.com/jsdf/react-native-htmlview
export default class HTMLView extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { value, style, ...otherProp } = this.props;
        if (!BODY_TAG_PATTERN.test(value))
            value = `<body> ${value} </body>`;
        return (<View style={[style]}>
                <HTMLViewLib ref={(ref) => { this.htmlView = ref; }} value={value} {...otherProp} stylesheet={styles}/>
            </View>);
    }
}
function createStyleSheet() {
    const boldStyle = { fontWeight: 'bold' };
    const italicStyle = { fontStyle: 'italic' };
    const codeStyle = { fontFamily: 'Menlo' };
    const large = { fontSize: fontNormal + 3 };
    let underline = { textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "white" };
    let underlineBlack = { textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "black" };
    let underlineRed = { textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "red" };
    return StyleSheet.create({
        body: {
            fontSize: fontNormal, flex: 0
        },
        b: boldStyle,
        xb: { fontWeight: '800' },
        h1: { fontWeight: '700', fontSize: fontNormal + 5 },
        h2: { fontWeight: '700', fontSize: fontNormal + 3 },
        h3: { fontWeight: '700', fontSize: fontNormal + 1 },
        title1: { fontWeight: '700', fontSize: fontNormal + 5 },
        strong: boldStyle,
        span: { fontSize: fontNormal },
        i: italicStyle,
        u: underline,
        ub: underlineBlack,
        ur: underlineRed,
        em: italicStyle,
        pre: codeStyle,
        code: codeStyle,
        large: large,
        fontpink: {
            color: '#BD5407'
        },
        fontyellow: {
            color: '#a66322',
            fontSize: 15
        },
        fontblue: {
            color: 'blue',
        },
        fontred: {
            color: 'red',
        },
        fontgray: {
            color: 'gray',
        },
        a: {
            fontWeight: '600',
            color: '#007AFF',
        },
    });
}
const styles = createStyleSheet();
