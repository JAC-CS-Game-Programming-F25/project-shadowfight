export default class UserInterfaceElement {
    constructor(x, y, width, height) {
        this.position = { x, y };
        this.dimensions = { x: width, y: height };
    }

    update(dt) {}

    render() {}
}
