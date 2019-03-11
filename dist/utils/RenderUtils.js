import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CachedImage } from 'react-native-cached-image';
import { Touchable } from "../Touchable";
export class RenderUtils {
    static renderIcon(name, fontSize, color, style) {
        return (<Icon name={name} style={[{ color: color, fontSize: fontSize }, style]}/>);
    }
    static renderMaterialIcon(name, fontSize, color, style) {
        return (<MaterialIcons name={name} style={[{ color: color, fontSize: fontSize }, style]}/>);
    }
    static renderSeparate(style, key) {
        return <View key={key} style={[{ height: 1, backgroundColor: "#CCCCCCAA" }, style]}/>;
    }
    static renderImage(url, style, props) {
        return <CachedImage {...props} source={{ uri: url }} defaultSource={require("../../assets/placeholder.jpg")} style={style}/>;
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
