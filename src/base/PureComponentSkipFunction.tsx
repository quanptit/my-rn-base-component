import React, {Component} from 'react'
import {isEqual, isEqualWith, isFunction, isPlainObject} from "lodash";

function isEqualSkipFunc(objSource, other, deep = 0) {
    if (deep > 3) return false;

    if (isPlainObject(objSource) && isPlainObject(other)) {
        for (let key in objSource) {
            if (objSource.hasOwnProperty(key) && typeof objSource[key] !== "function") {
                if (!isEqualSkipFunc(objSource[key], other[key], deep + 1))
                    return false;
            }
        }
        return true;
    }
    return isEqual(objSource, other);
}

export abstract class PureComponentSkipFunction<P = {}, S = {}> extends Component<P, S> {
    constructor(props: P, context?: any) {
        super(props, context);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return notEqualObjSkipCheckFunction(this.props, nextProps) || notEqualObjSkipCheckFunction(this.state, nextState);
        return !isEqualSkipFunc(this.props, nextProps) || !isEqualSkipFunc(this.state, nextState);
    }
}

