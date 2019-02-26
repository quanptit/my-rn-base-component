import { StyleSheet } from 'react-native';
/**
 * const s = StyleUtils.getAllStyle();
 * s.f_xsmal
 * */
export class StyleUtils {
    static flatten(style) {
        return StyleSheet.flatten(style);
    }
    static async loadAllStyle(isAlwayLoadNew = false) {
        if (StyleUtils.allStyle == undefined || isAlwayLoadNew) {
            let increaseFont = await PreferenceUtils.getBooleanSetting("isLargeFont", false) ? 3 : 0;
            StyleUtils.FONT_XSMALL += increaseFont;
            StyleUtils.FONT_SMALL += increaseFont;
            StyleUtils.FONT_NOTMAL += increaseFont;
            StyleUtils.FONT_XNORMAL += increaseFont;
            StyleUtils.FONT_LARGE += (increaseFont + 1);
            StyleUtils.FONT_XLARGE += (increaseFont + 2);
            console.log("============ Load Style File =========== increaseFont = ", increaseFont);
            this.createStyle();
        }
    }
    static getAllStyle() {
        if (StyleUtils.allStyle == undefined) {
            StyleUtils.createStyle();
        }
        return StyleUtils.allStyle;
    }
    static getFontXSmall() {
        return StyleUtils.FONT_XSMALL || 12;
    }
    static getFontSmall() {
        return StyleUtils.FONT_SMALL || 14;
    }
    static getFontNormal() {
        return StyleUtils.FONT_NOTMAL || 16;
    }
    static getFontXNormal() {
        return StyleUtils.FONT_XNORMAL || 17;
    }
    static getFontLarge() {
        return StyleUtils.FONT_LARGE || 18;
    }
    static getFontXLarge() {
        return StyleUtils.FONT_XLARGE || 20;
    }
    //endregion
    static createStyle() {
        const fontXSmall = this.getFontXSmall();
        const fontSmall = this.getFontSmall();
        const fontNormal = this.getFontNormal();
        const fontXNormal = this.getFontXNormal();
        const fontLarge = this.getFontLarge();
        const fontXLarge = this.getFontXLarge();
        StyleUtils.allStyle = StyleSheet.create({
            // region margin && padding
            m_left_small: { marginLeft: 3 },
            m_right_small: { marginRight: 3 },
            m_top_small: { marginTop: 3 },
            m_bottom_small: { marginBottom: 3 },
            m_all_small: { margin: 3 },
            m_hor_small: { marginHorizontal: 3 },
            m_ver_small: { marginVertical: 3 },
            m_left_normal: { marginLeft: 6 },
            m_right_normal: { marginRight: 6 },
            m_top_normal: { marginTop: 6 },
            m_bottom_normal: { marginBottom: 6 },
            m_all_normal: { margin: 6 },
            m_hor_normal: { marginHorizontal: 6 },
            m_ver_normal: { marginVertical: 6 },
            p_left_small: { paddingLeft: 3 },
            p_bottom_small: { paddingBottom: 3 },
            p_all_small: { padding: 3 },
            p_hor_small: { paddingHorizontal: 3 },
            p_ver_small: { paddingVertical: 3 },
            p_right_small: { paddingRight: 3 },
            p_top_small: { paddingTop: 3 },
            p_left_normal: { paddingLeft: 6 },
            p_right_normal: { paddingRight: 6 },
            p_top_normal: { paddingTop: 6 },
            p_bottom_normal: { paddingBottom: 6 },
            p_all_normal: { padding: 6 },
            p_hor_normal: { paddingHorizontal: 6 },
            p_ver_normal: { paddingVertical: 6 },
            // endregion
            //region font
            f_xsmal: { fontSize: fontXSmall },
            f_xsmal_b: { fontSize: fontXSmall, fontWeight: 'bold' },
            f_xsmal_i: { fontSize: fontXSmall, fontStyle: 'italic' },
            f_xsmal_i_b: { fontSize: fontXSmall, fontStyle: 'italic', fontWeight: 'bold' },
            f_smal: { fontSize: fontSmall },
            f_smal_b: { fontSize: fontSmall, fontWeight: 'bold' },
            f_smal_i: { fontSize: fontSmall, fontStyle: 'italic' },
            f_smal_i_b: { fontSize: fontSmall, fontStyle: 'italic', fontWeight: 'bold' },
            f_nor: { fontSize: fontNormal },
            f_nor_b: { fontSize: fontNormal, fontWeight: 'bold' },
            f_nor_i: { fontSize: fontNormal, fontStyle: 'italic' },
            f_nor_i_b: { fontSize: fontNormal, fontStyle: 'italic', fontWeight: 'bold' },
            f_xnor: { fontSize: fontXNormal },
            f_xnor_b: { fontSize: fontXNormal, fontWeight: 'bold' },
            f_xnor_i: { fontSize: fontXNormal, fontStyle: 'italic' },
            f_xnor_i_b: { fontSize: fontXNormal, fontStyle: 'italic', fontWeight: 'bold' },
            f_lar: { fontSize: fontLarge },
            f_lar_b: { fontSize: fontLarge, fontWeight: 'bold' },
            f_lar_i: { fontSize: fontLarge, fontStyle: 'italic' },
            f_lar_i_b: { fontSize: fontLarge, fontStyle: 'italic', fontWeight: 'bold' },
            f_xlar: { fontSize: fontXLarge },
            f_xlar_b: { fontSize: fontXLarge, fontWeight: 'bold' },
            f_xlar_i: { fontSize: fontXLarge, fontStyle: 'italic' },
            f_xlar_i_b: { fontSize: fontXLarge, fontStyle: 'italic', fontWeight: 'bold' },
            //endregion
            //region layout
            flex_i: { flex: 1 },
            flex_d_row: { flexDirection: "row" },
            flex_d_col: { flexDirection: "column" },
            flex_i_row: { flex: 1, flexDirection: "row" },
            flex_i_column: { flex: 1, flexDirection: "column" },
            absolute_fill: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 },
            center_all: { alignItems: "center", justifyContent: "center" },
            //endregion
            bg_white: { backgroundColor: "white" },
            black: { color: "black" },
            white: { color: "white" }
        });
    }
}
StyleUtils.FONT_XSMALL = 12;
StyleUtils.FONT_SMALL = 14;
StyleUtils.FONT_NOTMAL = 16;
StyleUtils.FONT_XNORMAL = 17;
StyleUtils.FONT_LARGE = 18;
StyleUtils.FONT_XLARGE = 20;
