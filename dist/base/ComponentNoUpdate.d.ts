import { Component } from 'react';
export declare abstract class ComponentNoUpdate<P = {}, S = {}> extends Component<P, S> {
    constructor(props: P, context?: any);
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
}
