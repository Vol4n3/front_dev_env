import {IDrawable, IDrawList} from "./interfaces";

export class Scene {

    public scene: HTMLElement;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public backgroundColor: string;
    public clearFrame: boolean = true;
    private drawList: IDrawList[] = [];
    private isPlaying: boolean = true;

    constructor(id: string, public drawType: string = "canvas") {
        this.init(id);
    }

    init(id?: string) {
        if (this.drawType === "canvas") {
            this.scene = document.getElementById(id);
            this.canvas = document.createElement('canvas');
            window.addEventListener('resize', this.resize.bind(this));
            this.resize();
            this.context = this.canvas.getContext('2d');
            this.scene.appendChild(this.canvas);
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    public add(item: IDrawable, id?: string) {
        this.drawList.push({
            item: item,
            id: id
        })
    }

    removeItem(id: string) {
        for (let i in this.drawList) {
            if (this.drawList[i].id === id) {
                delete this.drawList[i];
                break;
            }
        }
    }

    public resume() {
        this.isPlaying = true;
    }

    public pause() {
        this.isPlaying = false;
    }

    public toggle() {
        this.isPlaying = !this.isPlaying;
    }


    private draw(): void {
        if (this.isPlaying) {
            if (this.clearFrame && this.drawType === "canvas") this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(0, 0, this.getWidth(), this.getHeight());
            this.context.fill();
            for (let d: number = 0; d < this.drawList.length; d++) {
                let draw = this.drawList[d].item;
                if (this.drawType === "canvas") {
                    this.context.save();
                    this.context.beginPath();
                    draw.draw(this.context);
                    this.context.closePath();
                    this.context.restore();
                }
                else {
                    draw.update();
                }
                if (draw.isCollide) this.checkCollision(draw, d);
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    private checkCollision(item: IDrawable, i: number): void {
        for (let d: number = 0; d < this.drawList.length; d++) {
            let draw = this.drawList[d].item;
            if (d !== i && draw.isCollide) {
                item.collisionTo(draw);
            }
        }
    }

    private resize() {
        this.canvas.width = this.getWidth();
        this.canvas.height = this.getHeight();
    }

    public getWidth() {
        return this.scene.clientWidth;
    }

    public getHeight() {
        return this.scene.clientHeight;
    }
}
