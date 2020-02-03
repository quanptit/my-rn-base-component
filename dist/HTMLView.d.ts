import { Component, PureComponent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    value: string;
    /**a function which will be called with a url when a link is pressed. Passing this prop will override how links are handled (defaults to calling Linking.openURL(url))*/
    onLinkPress?: (url: string) => void;
    /**a function which will be called with a url when a link is long pressed. The default is null.*/
    onLinkLongPress?: (url: string) => void;
    /**a stylesheet object keyed by tag name, which will override the styles applied to those respective tags.*/
    stylesheet?: any;
    /**a custom function to render HTML nodes however you see fit. If the function returns undefined (not null), the default renderer will be used for that node.*/
    renderNode?: (node: any, index: any, siblings: any, parent: any, defaultRenderer: any) => Component;
    /**text which is rendered before every li inside a ul*/
    bullet?: string;
    /**when explicitly false, effectively sets paragraphBreak and lineBreak to null*/
    addLineBreaks?: boolean;
    /**text which appears after text elements which create a new line (br, headings)*/
    lineBreak?: string;
    onError?: () => void;
    /**  text which appears after every p element   */
    paragraphBreak?: string;
    /***/
    style?: StyleProp<ViewStyle>;
}
export default class HTMLView extends PureComponent<Props, any> {
    private htmlView;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
