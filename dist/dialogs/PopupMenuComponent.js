import React, { PureComponent } from 'react';
import { StyleSheet } from "react-native";
import { StyleUtils } from "../StyleUtils";
import { Touchable } from "../Touchable";
import { Col } from "../Col";
import { TextCustom } from "../TextCustom";
const s = StyleUtils.getAllStyle();
export class PopupMenuComponent extends PureComponent {
    static _renderPopupMenuItem(subMeuSetting, index) {
        return (<Touchable key={index} onPress={subMeuSetting.onPress}>
                <TextCustom numberOfLines={1} style={[s.f_lar, styles.text]} value={subMeuSetting.title}/>
            </Touchable>);
    }
    render() {
        let listItem = this.props.listSubMeuSettingObj.map((item, index) => {
            return PopupMenuComponent._renderPopupMenuItem(item, index);
        });
        return (<Col style={styles.container}>
                {listItem}
            </Col>);
    }
}
const styles = StyleSheet.create({
    container: { borderColor: "#EFEFF4", borderBottomWidth: 1, borderRightWidth: 1 },
    text: { padding: 10 }
});
