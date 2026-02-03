export abstract class Shape {
    id: number;
    x: number;
    y: number;
    color: string;

    constructor (x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract isPointInside(mx: number, my: number): boolean;
    abstract getCollisionBox(): {x: number, y: number, w: number, h: number};
}