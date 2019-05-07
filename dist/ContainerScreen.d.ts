import React, { ReactInstance } from 'react';
import { ComponentNoUpdate } from "./base/ComponentNoUpdate";
interface ContainerScreenProps {
    renderScreen: () => ReactInstance;
}
export declare class ContainerScreen extends ComponentNoUpdate<ContainerScreenProps, any> {
    static openScreen(props: ContainerScreenProps): void;
    render(): React.ReactInstance;
}
export {};
