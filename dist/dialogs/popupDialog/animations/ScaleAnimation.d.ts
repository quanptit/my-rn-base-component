import { Animated } from 'react-native';
import Animation from './Animation';
import EndResult = Animated.EndResult;
export default class ScaleAnimation extends Animation {
    toValue(toValue: number, onFinished?: (result: EndResult) => void): void;
    createAnimations(): Object;
}
