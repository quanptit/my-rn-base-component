// @flow
import { Animated } from 'react-native';
// Base Animation class
export default class Animation {
    constructor(toValue = 0) {
        this.animate = new Animated.Value(toValue);
        this.animations = this.createAnimations();
    }
    toValue(toValue) {
    }
    createAnimations(param) {
        return {};
    }
}
