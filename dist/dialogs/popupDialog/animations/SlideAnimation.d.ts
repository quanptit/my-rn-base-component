import { Animated } from 'react-native';
import Animation from './Animation';
import EndResult = Animated.EndResult;
declare type Param = {
    toValue: number;
    slideFrom: string;
};
export default class SlideAnimation extends Animation {
    constructor({ toValue, slideFrom }: Param);
    toValue(toValue: number, onFinished?: (result: EndResult) => void): void;
    createAnimations(slideFrom: string): any;
}
export {};
