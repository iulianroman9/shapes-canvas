import { Shape } from "./shape";

export class Triangle extends Shape {
    side: number;

    constructor(x: number, y: number, color: string, side: number) {
        super(x, y, color);
        this.side = side;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.side / 2, this.y + this.side);
        ctx.lineTo(this.x + this.side / 2, this.y + this.side);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    isPointInside(mx: number, my: number): boolean {
        return (
            mx >= this.x - this.side / 2 &&
            mx <= this.x + this.side / 2 &&
            my >= this.y &&
            my <= this.y + this.side
        );
    }
}