// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Positions } from '../constants/Constants';
const DEFAULT_TITLE_ALIGN = 'center';
const HAVE_TITLE_BAR = true;
const styles = StyleSheet.create({
    title: {
        padding: 24,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    titleBar: {
        padding: 14,
        borderBottomWidth: 0.5,
        backgroundColor: '#F9F9FB',
        borderColor: '#DAD9DC',
    },
    titleText: {
        color: '#7F7D89',
        fontSize: 16,
    },
});
export default class DialogTitle extends Component {
    render() {
        const titleBar = this.props.haveTitleBar ? styles.titleBar : null;
        const titleItemsAlign = { alignItems: Positions[this.props.titleAlign] };
        return (<View style={[styles.title, titleItemsAlign, titleBar, this.props.titleStyle]}>
                <Text style={[styles.titleText, this.props.titleTextStyle]}>
                    {this.props.title}
                </Text>
            </View>);
    }
}
DialogTitle.defaultProps = {
    titleAlign: DEFAULT_TITLE_ALIGN,
    haveTitleBar: HAVE_TITLE_BAR,
};
