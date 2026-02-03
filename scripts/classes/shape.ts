export abstract class Shape {
    static shapeCount = 0;
    id: number;
    x: number;
    y: number;
    color: string;

    constructor (x: number, y: number, color: string) {
        this.id = Shape.shapeCount++;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract isPointInside(mx: number, my: number): boolean;
}