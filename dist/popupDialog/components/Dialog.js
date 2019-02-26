// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, BackHandler, } from 'react-native';
import Overlay from './Overlay';
import DefaultAnimation from '../animations/DefaultAnimation';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
// dialog states
const DIALOG_OPENING = 'opening';
const DIALOG_OPENED = 'opened';
const DIALOG_CLOSING = 'closing';
const DIALOG_CLOSED = 'closed';
// default dialog config
const DEFAULT_ANIMATION_DURATION = 150;
const DEFAULT_WIDTH = screenWidth;
const DISMISS_ON_TOUCH_OUTSIDE = true;
const DISMISS_ON_HARDWARE_BACK_PRESS = true;
const HAVE_OVERLAY = true;
// event types
// only for android
const HARDWARE_BACK_PRESS_EVENT = 'hardwareBackPress';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    hidden: {
        top: -10000,
        left: 0,
        height: 0,
        width: 0,
    },
});
class Dialog extends Component {
    constructor(props) {
        super(props);
        // opened, opening, closed, closing,
        this.state = {
            dialogState: DIALOG_CLOSED,
        };
        this.onOverlayPress = this.onOverlayPress.bind(this);
        this.hardwareBackEventHandler = this.hardwareBackEventHandler.bind(this);
    }
    componentDidMount() {
        const { show, onShowed } = this.props;
        if (show) {
            this.show(onShowed);
        }
        BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackEventHandler);
    }
    hardwareBackEventHandler() {
        const { onDismissed, dismissOnHardwareBackPress } = this.props;
        const { dialogState } = this.state;
        if (dismissOnHardwareBackPress && dialogState === DIALOG_OPENED) {
            this.dismiss(onDismissed);
            return true;
        }
        return false;
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.show !== nextProps.show) {
            if (nextProps.show) {
                this.show(nextProps.onShowed);
            }
            else {
                this.dismiss(nextProps.onDismissed);
            }
        }
    }
    componentWillUnmount() {
        BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackEventHandler);
    }
    onOverlayPress() {
        const { onDismissed, dismissOnTouchOutside, touchOutsideEvent } = this.props;
        if (touchOutsideEvent) {
            touchOutsideEvent();
            return;
        }
        if (dismissOnTouchOutside) {
            this.dismiss(onDismissed);
        }
    }
    setDialogState(toValue, callback = () => { }) {
        let dialogState = toValue ? DIALOG_OPENING : DIALOG_CLOSING;
        // to make sure has passed the dialogAnimation prop and the dialogAnimation has toValue method
        if (this.props.dialogAnimation && this.props.dialogAnimation.toValue) {
            this.props.dialogAnimation.toValue(toValue);
        }
        this.setState({ dialogState });
        setTimeout(() => {
            dialogState = dialogState === DIALOG_CLOSING ? DIALOG_CLOSED : DIALOG_OPENED;
            this.setState({ dialogState });
            callback();
        }, this.props.animationDuration);
    }
    show(onShowed) {
        this.setDialogState(1, onShowed);
    }
    dismiss(onDismissed) {
        this.setDialogState(0, () => {
            this.props.onDismissed && this.props.onDismissed();
            onDismissed && onDismissed();
        });
    }
    get pointerEvents() {
        if (this.props.overlayPointerEvents) {
            return this.props.overlayPointerEvents;
        }
        return this.state.dialogState === DIALOG_OPENED ? 'auto' : 'none';
    }
    get dialogSize() {
        let { width, height } = this.props;
        if (width && width > 0.0 && width <= 1.0) {
            width *= screenWidth;
        }
        if (height && height > 0.0 && height <= 1.0) {
            height *= screenHeight;
        }
        return { width, height };
    }
    render() {
        const dialogState = this.state.dialogState;
        const overlayPointerEvents = this.pointerEvents;
        const dialogSize = this.dialogSize;
        const hidden = dialogState === DIALOG_CLOSED && styles.hidden;
        const isShowOverlay = ([DIALOG_OPENING, DIALOG_OPENED].includes(dialogState) && this.props.haveOverlay);
        const dimensions = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };
        return (<View style={[styles.container, hidden, dimensions, this.props.style]} pointerEvents="box-none">
                <Overlay pointerEvents={overlayPointerEvents} showOverlay={isShowOverlay} onPress={this.onOverlayPress} backgroundColor={this.props.overlayBackgroundColor} opacity={this.props.overlayOpacity} animationDuration={this.props.animationDuration}/>
                <Animated.View //pointerEvents="box-none"
         style={[
            styles.dialog,
            dialogSize,
            this.props.dialogStyle,
            this.props.dialogAnimation.animations,
        ]}>
                    {this.props.children}
                    {this.props.actions}
                </Animated.View>
            </View>);
    }
}
Dialog.defaultProps = {
    animationDuration: DEFAULT_ANIMATION_DURATION,
    dialogAnimation: new DefaultAnimation({ animationDuration: DEFAULT_ANIMATION_DURATION }),
    width: DEFAULT_WIDTH,
    dismissOnTouchOutside: DISMISS_ON_TOUCH_OUTSIDE,
    dismissOnHardwareBackPress: DISMISS_ON_HARDWARE_BACK_PRESS,
    haveOverlay: HAVE_OVERLAY,
    show: true,
};
export default Dialog;
