// @flow
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Positions} from '../constants/Constants'
import {DialogTitleType, OverlayType} from '../Type'


const DEFAULT_TITLE_ALIGN: string = 'center'
const HAVE_TITLE_BAR: boolean = true

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
})

export default class DialogTitle extends Component <DialogTitleType, any> {
    static defaultProps = {
        titleAlign: DEFAULT_TITLE_ALIGN,
        haveTitleBar: HAVE_TITLE_BAR,
    }

    render() {
        const titleBar = this.props.haveTitleBar ? styles.titleBar : null
        const titleItemsAlign = {alignItems: Positions[this.props.titleAlign]}

        return (
            <View style={[styles.title, titleItemsAlign, titleBar, this.props.titleStyle as any]}>
                <Text style={[styles.titleText, this.props.titleTextStyle as any]}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}


