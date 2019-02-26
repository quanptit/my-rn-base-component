import Animation from './Animation';
declare type Param = {
    toValue?: number;
    animationDuration?: number;
};
export default class DefaultAnimation extends Animation {
    animate: any;
    animationDuration: number;
    constructor({ toValue, animationDuration }: Param);
    toValue(toValue: number): void;
    createAnimations(): Object;
}
export {};
