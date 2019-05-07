import React, {Component, ReactInstance} from 'react'
import {CommonUtils} from "my-rn-base-utils";
import {ComponentNoUpdate} from "./base/ComponentNoUpdate";

interface ContainerScreenProps {
    renderScreen: () => ReactInstance
}

export class ContainerScreen extends ComponentNoUpdate<ContainerScreenProps, any> {
    static openScreen(props: ContainerScreenProps) {
        CommonUtils.openScreen("ContainerScreen", props);
    }

    render() {
        return this.props.renderScreen();
    }

}
