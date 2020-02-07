import React, { PureComponent } from 'react';
import { View } from "react-native";
/*
<HorizontalProgressBar style={{flex: 1, marginHorizontal: 6, height: 6}}
                                           paddingBackground={0}
                                           unfillStyle={{backgroundColor: Colors.accentColor, borderRadius: 2}}
                                           fillStyle={{backgroundColor: Colors.primaryColor, borderRadius: 2}}
                                           progress={this.state.noCorrect / this.state.noTotal}/>
* */
export class HorizontalProgressBar extends PureComponent {
    //endregion
    constructor(props) {
        super(props);
        this.state = { width: 150, height: 9 };
    }
    render() {
        const { paddingBackground, children, style, ...restProps } = this.props;
        let width = this.state.width || 150;
        const innerWidth = (width - paddingBackground * 2) * this.props.progress;
        let margin = paddingBackground;
        const progressStyle = {
            width: innerWidth, flex: 1,
            marginLeft: margin, marginTop: margin, marginBottom: margin
        };
        return (<View style={style} {...restProps} onLayout={(event) => this.onLayout(event)}>
                <View style={[{ position: 'absolute', left: margin, right: margin, bottom: margin, top: margin },
            this.props.unfillStyle]}/>
                {innerWidth > 0 && <View style={[progressStyle, this.props.fillStyle]}/>}
                {children}
            </View>);
    }
    onLayout(event) {
        const { width, height } = event.nativeEvent.layout;
        if (width !== this.state.width || height !== this.state.height)
            this.setState({ width: width, height: height });
    }
}
//region defaultProps and Variable
HorizontalProgressBar.defaultProps = {
    progress: 0,
    paddingBackground: 3,
};
