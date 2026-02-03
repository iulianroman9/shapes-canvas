import { Shape } from "./shape";

export class Circle extends Shape {
    radius: number;

    constructor(x: number, y: number, color: string, radius: number) {
        super(x, y, color);
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    isPointInside(mx: number, my: number): boolean {
        const distance = Math.sqrt((mx - this.x) ** 2 + (my - this.y) ** 2);
        return distance <= this.radius;
    }

    getCollisionBox() {
        return { 
            x: this.x - this.radius, 
            y: this.y - this.radius, 
            w: this.radius * 2, 
            h: this.radius * 2 
        };
    }
}