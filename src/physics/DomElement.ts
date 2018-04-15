import {Rectangle} from "./geometry/rectangle";

export class DomElement extends Rectangle {
    public element: HTMLElement;
    private frame: boolean;
    constructor(element: HTMLElement, frame?: boolean) {
        let rect = {left: 0, top: 0, width: 0, height: 0};

        if (!frame) {
            rect = element.getBoundingClientRect();
        }
        super(rect.left, rect.top, rect.width, rect.height);
        this.element = element;
        this.frame = frame;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        this.update();
    }

    update() {
        switch (this.pointMoving) {
            case "center":
                this.initAt(true);
                break;
            case "bound":
                this.initAt(false);
                break;
            default:
                this.init();
                break;
        }
        (!this.frame) ? this.updateHTMLPosition() : this.updateHTMLInsetClipPath();

        this.updatePoints();
    }

    updateHTMLPosition(): void {
        if (this.element) {
            this.element.style.left = this.x + 'px';
            this.element.style.width = this.width + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.height = this.height + 'px';
        }
    }

    getPercentRect() {
        let rectMax = this.element.getBoundingClientRect();

        let left = this.x / rectMax.right * 100;
        left = (left < 0) ? 0 : left;
        left = (left > 100) ? 100 : left;
        let top = this.y / rectMax.bottom * 100;
        top = (top < 0) ? 0 : top;
        top = (top > 100) ? 100 : top;
        let bottom = (this.y + this.height) / rectMax.bottom * 100;
        bottom = (bottom < 0) ? 0 : bottom;
        bottom = (bottom > 100) ? 100 : bottom;
        let right =  (this.x + this.width) / rectMax.right * 100;
        right = (right < 0) ? 0 : right;
        right = (right > 100) ? 100 : right;

        return {top: top, right: right, bottom: bottom, left: left}
    }

    updateHTMLInsetClipPath(): void {
        if (this.element) {
            let rect = this.getPercentRect();
            //this.element.style.clipPath = "inset(" + rect.top + "% " + rect.right + "% " + rect.bottom + "% " + rect.left + "%)";
            this.element.style.clipPath = "polygon(0% 0%, 0% 100%, " +
                rect.left + "% 100%, " +
                rect.left + "% " + rect.top + "%, "+
                rect.right +"% "+ rect.top +"%, "+
                rect.right +"% "+ rect.bottom +"%, "+
                rect.left + "% "+ rect.bottom +"%, "+
                rect.left + "% 100%, 100% 100%, 100% 0%)";
        }
    }

}