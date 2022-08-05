import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { TextCustom } from "./TextCustom";
import { PureComponentSkipFunction } from "./base/PureComponentSkipFunction";
import { Col } from "./Col";
import { Row } from "./Row";
import { StyleUtils } from "./StyleUtils";
import { isEmpty } from "my-rn-base-utils";
import { DialogUtils } from "./dialogs/DialogUtils";
import { IconArrowDropDown } from "./common-icons/IconArrowDropDown";
const s = StyleUtils.getAllStyle();
const heightItem = 40;
const styles = StyleSheet.create({
    container: {
        height: 35, borderWidth: 1, borderRadius: 5, borderColor: "#CCC",
    },
    paddingItem: { paddingHorizontal: 6 },
    containerItem: {
        height: heightItem
    },
    textStyle: { color: "#757575" },
    textSelectedStyle: { color: "#000" },
    picker: {
        backgroundColor: 'rgba(255, 255, 255, 1.0)',
        borderRadius: 2,
        ...Platform.select({
            ios: {
                shadowRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 1.0)',
                shadowOpacity: 0.54,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 2,
            },
        }),
    },
});
/*
    cbSpeed: ComboBox;

    _selectSpeedChange(indexSelected) {
        console.log("indexSelected:", indexSelected)
    }

    _renderSpeedBtn() {
        return <ComboBox ref={(ref) => {this.cbSpeed = ref}} listData={["1x", "0.8x", "0.7x", "0.6x", "0.5x"]}
                         textProps={{numberOfLines: 1, style: {fontSize: FONT_NORMAL, fontWeight: "bold", color: isIOS ? "blue" : "white"}}}
                         selectedChange={this._selectSpeedChange.bind(this)}/>
    }
* */
export class ComboBox extends PureComponentSkipFunction {
    static defaultProps = {
        indexSelected: 0,
        textStyle: [styles.textStyle, s.f_nor],
        textSelectedStyle: [styles.textSelectedStyle, s.f_nor]
    };
    root;
    render() {
        let { indexSelected } = this.props;
        let currentValue = indexSelected >= 0 ? this.props.listData[indexSelected] : null;
        return (<Row ref={(ref) => { this.root = ref; }} dial={4} enablemeasureInWindow onPress={this.showListItem.bind(this)} style={[styles.container, styles.paddingItem, this.props.style]}>
                <TextCustom value={currentValue} style={[s.flex_i, this.props.textSelectedStyle]}/>
                <IconArrowDropDown fontSize={26} color="#666666"/>
            </Row>);
    }
    showListItem() {
        let items = this.props.listData;
        if (isEmpty(items)) {
            DialogUtils.hideOverComponent();
            return;
        }
        let heightList = items.length * heightItem;
        this.root.measureInWindow((x, y, width, height) => {
            const window = Dimensions.get('window');
            let widthS = window.width;
            let heightS = window.height;
            let widthList = width > 100 ? width : 100;
            let left = x;
            if (left + widthList > widthS)
                left = widthS - widthList - 6;
            let top = y + height + 5;
            if (top + heightList > heightS)
                top = heightS - heightList - 5;
            DialogUtils.showOverComponent(this._renderListItem(items), left, top, widthList, heightList);
        });
    }
    _renderListItem(items) {
        let heightList = items.length * heightItem;
        let result = [];
        for (let i = 0; i < items.length; i++) {
            result.push(this._renderItem(items[i], i));
        }
        return (<Col style={[styles.picker, { height: heightList }]}>
                {result}
            </Col>);
        // return (
        //     <FlatListCustom
        //         style={{backgroundColor: "#cef3ff", flex: 1, borderColor: "#CCC", borderWidth: 1}}
        //         data={items}
        //         renderItem={this._renderItem.bind(this)}
        //         keyboardShouldPersistTaps="always"
        //         ItemSeparatorComponent={() => {return RenderUtils.renderSeparate()}}
        //     />
        // )
    }
    _renderItem(item, index) {
        return (<Col dial={4} style={[styles.paddingItem, styles.containerItem]} onPress={() => {
                if (index !== this.props.indexSelected) {
                    this.props.selectedChange(index);
                }
                DialogUtils.hideOverComponent();
            }}>
                <TextCustom numberOfLines={1} value={item} style={index === this.props.indexSelected ? this.props.textSelectedStyle : this.props.textStyle}/>
            </Col>);
    }
}
