// @flow

import {Animated} from 'react-native'

// Base Animation class
export default class Animation {
    animate: any
    animations: any

    constructor(toValue: number = 0) {
        this.animate = new Animated.Value(toValue)
        this.animations = this.createAnimations()
    }

    toValue(toValue: number) {

    }

    createAnimations(param?): any {
        return {}
    }
}
