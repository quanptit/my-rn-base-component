/// <reference types="react" />
export declare class RenderUtils {
    static renderIcon(name: string, fontSize?: number, color?: string, style?: any): JSX.Element;
    static renderMaterialIcon(name: string, fontSize?: number, color?: string, style?: any): JSX.Element;
    static renderSeparate(style?: any, key?: any): JSX.Element;
    static renderImage(url: string, style?: any, props?: any): JSX.Element;
    static renderErrorView(has_error: string, refreshCallback: any, marginTop?: number): JSX.Element;
}
