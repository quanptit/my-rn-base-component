import React, {Component, PureComponent} from 'react'
import {StyleSheet} from "react-native"
import {StyleUtils} from "../StyleUtils";
import {Touchable} from "../Touchable";
import {Col} from "../Col";
import {TextCustom} from "../TextCustom";

const s = StyleUtils.getAllStyle();

interface Props {
    listSubMeuSettingObj: SubMenuSettingObj[]
}

export class PopupMenuComponent extends PureComponent<Props, any> {
    private static _renderPopupMenuItem(subMeuSetting: SubMenuSettingObj, index: number) {
        return (
            <Touchable key={index} onPress={subMeuSetting.onPress}>
                <TextCustom numberOfLines={1} style={[s.f_lar, styles.text]} value={subMeuSetting.title}/>
            </Touchable>
        )
    }

    render() {
        let listItem = this.props.listSubMeuSettingObj.map((item: SubMenuSettingObj, index: number) => {
            return PopupMenuComponent._renderPopupMenuItem(item, index)
        });
        return (
            <Col style={styles.container}>
                {listItem}
            </Col>
        )
    }

    //region utils

    //endregion
}

const styles = StyleSheet.create<any>({
    container: {borderColor: "#EFEFF4", borderBottomWidth: 1, borderRightWidth: 1},
    text: {padding: 10}
});

export interface SubMenuSettingObj {
    title: string
    onPress: VoidFunction
}
