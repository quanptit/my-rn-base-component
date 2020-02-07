import React from 'react';
import { Text, View } from 'react-native';
import { CachedImage } from 'my-rn-cached-image';
import { Touchable } from "../Touchable";
export class RenderUtils {
    static renderSeparate(style, key) {
        return <View key={key} style={[{ height: 1, backgroundColor: "#CCCCCCAA" }, style]}/>;
    }
    static renderImage(url, style, props) {
        return <CachedImage {...props} source={{ uri: url }} defaultSource={require("../../assets/placeholder.jpg")} fallbackSource={require("../../assets/placeholder.jpg")} style={style}/>;
    }
    static renderErrorView(has_error, refreshCallback, marginTop = 0) {
        return (<Touchable underlayColor='#c8c7cc' onPress={refreshCallback} style={{ marginTop: marginTop }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, marginBottom: 15 }}>
                        {has_error}
                    </Text>
                    <Text style={{ fontSize: 30 }}>
                        ↻
                    </Text>
                </View>
            </Touchable>);
    }
}
