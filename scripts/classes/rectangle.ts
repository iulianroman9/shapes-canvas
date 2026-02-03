import { Shape } from "./shape";

export class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(x: number, y: number, color: string, width: number, height: number) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isPointInside(mx: number, my: number): boolean {
        return (
            mx >= this.x &&
            mx <= this.x + this.width &&
            my >= this.y &&
            my <= this.y + this.height
        );
    }

    getCollisionBox() {
        return {
            x: this.x,
            y: this.y,
            w: this.width,
            h: this.height
        }
    }
}