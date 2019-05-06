'use strict';
import React, {Component, ReactChild} from 'react'
import Orientation from 'react-native-orientation'
import {Dimensions, TouchableHighlight, View, ViewProps} from 'react-native'
import {ComponentNoUpdate} from '../base/ComponentNoUpdate';

export interface PositionAnchor {
    x: number,
    y: number,
    width: number,
    height: number
}

interface Props extends ViewProps {}

export default class OverflayContainer extends ComponentNoUpdate<Props, any> {
    dialogComponent;
    popupMenuComponent;
    positionAnschor;
    positionOverComponent; // {left, top, width, height}
    overComponent;
    private listenner: any;

    showPopupMenu(popupMenuComponent: ReactChild, positionAnschor: PositionAnchor) {
        console.log("showPopupMenu");
        this.popupMenuComponent = popupMenuComponent;
        this.positionAnschor = positionAnschor;
        this.forceUpdate()
    }

    hidePopupMenu() {
        console.log("hidePopupMenu");
        this.popupMenuComponent = undefined;
        this.positionAnschor = undefined;
        this.forceUpdate();
    }

    showDialog(dialogComponent) {
        if (this.dialogComponent != null)
            this.hideDialog();

        this.dialogComponent = dialogComponent;
        this.forceUpdate();
    }

    hideDialog() {
        console.log("hide Dialog");
        this.dialogComponent = undefined;
        this.forceUpdate();
    }

    showOverflayComponent(overCompnent, left, top, width, height) {
        this.overComponent = overCompnent;
        this.positionOverComponent = {left: left, top: top, width: width, height: height};
        this.forceUpdate();
    }

    hideOverflayComponent() {
        if (this.overComponent != undefined) {
            console.log("hideOverflayComponent");
            this.positionOverComponent = undefined;
            this.overComponent = undefined;
            this.forceUpdate();
        }
    }

    render() {
        if (this.dialogComponent) {
            return (
                <View {...this.props} style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}} pointerEvents="box-none">
                    {this.dialogComponent}
                    {this.overComponent && this._renderOverComponent()}
                </View>
            )
        }
        if (this.popupMenuComponent) {
            return this._renderPopup()
        }

        if (this.overComponent)
            return this._renderOverComponent();

        return null
    }

    _renderOverComponent() {
        let {left, top, width, height} = this.positionOverComponent
        console.log("showOverflayComponent", left, top, width, height)
        return (
            <TouchableHighlight underlayColor="transparent" style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}}
                                onPressIn={() => {this.hideOverflayComponent()}}>
                <View style={{position: 'absolute', left: left, top: top, width: width, height: height}} pointerEvents="box-none">
                    {this.overComponent}
                </View>
            </TouchableHighlight>
        )
    }

    _renderPopup() {
        let style: any = {
            position: "absolute", minWidth: 120,
            borderRadius: 3, backgroundColor: '#fffff5', borderColor: "#E1E1E1BF", borderWidth: 2
        };
        let {x, y, width, height} = this.positionAnschor;
        const screenSize = Dimensions.get('window');
        let widthS = screenSize.width;
        let heightS = screenSize.height;
        if (y > heightS / 2) { // Show on Top
            style.bottom = heightS - y - height + 2
        } else
            style.top = y + height + 2;
        if (x < widthS / 2) {
            style.left = x - 10 > 3 ? (x - 10) : 3
        } else {
            let rightAnchor = x + width;
            let right = rightAnchor + 50;
            if (right < widthS - 3)
                style.right = widthS - right;
            else {
                let right = rightAnchor + 20;
                if (right < widthS - 3)
                    style.right = widthS - right;
                else {
                    let right = rightAnchor + 3;
                    if (right <= widthS)
                        style.right = widthS - right;
                    else
                        style.right = 2
                }
            }
        }

        return (
            <TouchableHighlight underlayColor="transparent" style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}}
                                onPressIn={() => {this.hidePopupMenu()}}>
                <View style={style}>
                    {this.popupMenuComponent}
                </View>
            </TouchableHighlight>
        )
    }

    //region orientation =====
    currentOrientation: any;

    _orientationDidChange(orientation) {
        if (orientation != this.currentOrientation) {
            this.currentOrientation = orientation;
            this.hideDialog();
        }
    }

    componentDidMount() {
        try {
            Orientation.getOrientation((error, orientation) => {
                this.currentOrientation = orientation;
            });
        } catch (e) { console.log("Orientation.getOrientation()")}
        this.listenner = this._orientationDidChange.bind(this);
        Orientation.addOrientationListener(this.listenner);
    }

    componentWillUnmount() {
        this.listenner && Orientation.removeOrientationListener(this.listenner)
    }

    //endregion
}
