/* @flow */
import { Animated } from 'react-native';
import Animation from './Animation';
export default class SlideAnimation extends Animation {
    constructor({ toValue = 0, slideFrom = 'bottom' }) {
        super(toValue);
        this.animations = this.createAnimations(slideFrom);
    }
    toValue(toValue, onFinished) {
        Animated.spring(this.animate, {
            toValue,
            velocity: 0,
            tension: 65,
            friction: 10,
        }).start(onFinished);
    }
    createAnimations(slideFrom) {
        const transform = [];
        if (['top', 'bottom'].includes(slideFrom)) {
            if (slideFrom === 'bottom') {
                transform.push({
                    translateY: this.animate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [800, 1],
                    }),
                });
            }
            else {
                transform.push({
                    translateY: this.animate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-800, 1],
                    }),
                });
            }
        }
        else if (['left', 'right'].includes(slideFrom)) {
            if (slideFrom === 'right') {
                transform.push({
                    translateX: this.animate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [800, 1],
                    }),
                });
            }
            else {
                transform.push({
                    translateX: this.animate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-800, 1],
                    }),
                });
            }
        }
        const animations = {
            transform,
        };
        return animations;
    }
}
