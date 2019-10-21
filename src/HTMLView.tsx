import React, {Component, PureComponent} from 'react'
import {StyleSheet, StyleProp, ViewStyle, View} from 'react-native'
import HTMLViewLib from 'my-rn-htmlview'
import {StyleUtils} from "./StyleUtils";

const fontNormal: any = StyleUtils.getFontNormal();
const BODY_TAG_PATTERN = /\<\/ *body\>/;

interface Props {
    value: string
    /**a function which will be called with a url when a link is pressed. Passing this prop will override how links are handled (defaults to calling Linking.openURL(url))*/
    onLinkPress?: (url: string) => void
    /**a function which will be called with a url when a link is long pressed. The default is null.*/
    onLinkLongPress?: (url: string) => void
    /**a stylesheet object keyed by tag name, which will override the styles applied to those respective tags.*/
    stylesheet?: any
    /**a custom function to render HTML nodes however you see fit. If the function returns undefined (not null), the default renderer will be used for that node.*/
    renderNode?: (node, index, siblings, parent, defaultRenderer) => Component

    /**text which is rendered before every li inside a ul*/
    bullet?: string,
    /**when explicitly false, effectively sets paragraphBreak and lineBreak to null*/
    addLineBreaks?: boolean
    /**text which appears after text elements which create a new line (br, headings)*/
    lineBreak?: string
    onError?: () => void,
    /**  text which appears after every p element   */
    paragraphBreak?: string
    /***/
    style?: StyleProp<ViewStyle>
}

//https://github.com/jsdf/react-native-htmlview
export default class HTMLView extends PureComponent<Props, any> {
    private htmlView: HTMLViewLib;

    constructor(props) {
        super(props)
    }

    render() {
        let {value, style, ...otherProp} = this.props;
        if (!BODY_TAG_PATTERN.test(value))
            value = `<body> ${value} </body>`;
        return (
            <View style={[style]}>
                <HTMLViewLib ref={(ref) => {this.htmlView = ref}} value={value} {...otherProp}
                             stylesheet={styles}/>
            </View>
        )
    }
}

function createStyleSheet() {
    const boldStyle: any = {fontWeight: 'bold'};
    const italicStyle: any = {fontStyle: 'italic'};
    const codeStyle: any = {fontFamily: 'Menlo'};
    const large = {fontSize: fontNormal + 3};
    let underline: any = {textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "white"};
    let underlineBlack: any = {textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "black"};
    let underlineRed: any = {textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "red"};
    return StyleSheet.create({
        body: {
            fontSize: fontNormal, flex: 0
        },
        b: boldStyle,
        xb: {fontWeight: '800'},
        h1: {fontWeight: '700', fontSize: fontNormal + 5},
        h2: {fontWeight: '700', fontSize: fontNormal + 3},
        h3: {fontWeight: '700', fontSize: fontNormal + 1},
        title1: {fontWeight: '700', fontSize: fontNormal + 5},
        strong: boldStyle,
        span: {fontSize: fontNormal},
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
        fontyellow: {// translate
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
