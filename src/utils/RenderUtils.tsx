import React, {Component} from 'react'
import {Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {CachedImage} from 'react-native-cached-image'
import {Touchable} from "../Touchable";

export class RenderUtils {

    public static renderIcon(name: string, fontSize?: number, color?: string, style?: any) {
        return (
            <Icon name={name} style={[{color: color, fontSize: fontSize}, style]}/>
        )
    }

    public static renderMaterialIcon(name: string, fontSize?: number, color?: string, style?: any) {
        return (
            <MaterialIcons name={name} style={[{color: color, fontSize: fontSize}, style]}/>
        )
    }

    public static renderSeparate(style?, key?) {
        return <View key={key} style={[{height: 1, backgroundColor: "#CCCCCCAA"}, style]}/>
    }

    public static renderImage(url: string, style?, props?) {
        return <CachedImage
            {...props}
            source={{uri: url}}
            defaultSource={require("../../assets/placeholder.jpg")}
            style={style}/>
    }

    public static renderErrorView(has_error: string, refreshCallback, marginTop = 0) {
        return (
            <Touchable underlayColor='#c8c7cc' onPress={refreshCallback} style={{marginTop: marginTop}}>
                <View style={{justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 10}}>
                    <Text style={{fontSize: 16, marginBottom: 15}}>
                        {has_error}
                    </Text>
                    <Text style={{fontSize: 30}}>
                        ↻
                    </Text>
                </View>
            </Touchable>
        )
    }
}
