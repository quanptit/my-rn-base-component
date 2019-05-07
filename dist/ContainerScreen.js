import { CommonUtils } from "my-rn-base-utils";
import { ComponentNoUpdate } from "./base/ComponentNoUpdate";
export class ContainerScreen extends ComponentNoUpdate {
    static openScreen(props) {
        CommonUtils.openScreen("ContainerScreen", props);
    }
    render() {
        return this.props.renderScreen();
    }
}
