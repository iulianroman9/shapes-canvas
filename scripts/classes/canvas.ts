import { ShapeType } from "../types/shapeType";
import { Shape } from "./shape";
import { Circle } from "./circle";
import { Triangle } from "./triangle";
import { Rectangle } from "./rectangle";
import { Square } from "./square";

export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = [];
    private isDragging: boolean = false;
    private draggedShape: Shape | null;
    private startDragX: number = 0;
    private startDragY: number = 0;
    public isCollisionEnabled: boolean = false;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        this.setupEventListeners();
        this.drawEverything();
    }

    private setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            for (let i = this.shapes.length - 1; i >= 0; i--) {
                if (this.shapes[i].isPointInside(mx, my)) {
                    this.isDragging = true;
                    this.draggedShape = this.shapes[i];
                    
                    this.startDragX = this.draggedShape.x;
                    this.startDragY = this.draggedShape.y;

                    this.shapes.splice(i, 1);
                    this.shapes.push(this.draggedShape);
                    
                    this.drawEverything();
                    return;
                }
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.draggedShape) return;

            const rect = this.canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            
            this.draggedShape.x = mx;
            this.draggedShape.y = my;

            this.drawEverything();
        });

        window.addEventListener('mouseup', () => {
            if (this.isDragging && this.draggedShape && this.isCollisionEnabled) {
                for (const other of this.shapes) {
                    if (other === this.draggedShape) continue;

                    if (this.checkCollision(this.draggedShape, other)) {
                        this.draggedShape.x = this.startDragX;
                        this.draggedShape.y = this.startDragY;
                        break; 
                    }
                }
            }
            this.isDragging = false;
            this.draggedShape = null;
            this.drawEverything();
        });

        window.addEventListener('resize', () => this.drawEverything());
        window.addEventListener('scroll', () => this.drawEverything());
    }

    public addShape(type: ShapeType, color: string) {
        const x = Math.random() * (this.canvas.width - 100) + 50;
        const y = Math.random() * (this.canvas.height - 100) + 25;
        
        let newShape: Shape;

        switch (type) {
            case 'circle':
                newShape = new Circle(x, y, color, 30);
                break;
            case 'triangle':
                newShape = new Triangle(x, y, color, 60);
                break;
            case 'square':
                newShape = new Square(x, y, color, 50);
                break;
            case 'rectangle':
                newShape = new Rectangle(x, y, color, 80, 50);
                break;
            default:
                console.error("Unknown shape type");
                return;
        }

        this.shapes.push(newShape);
        this.drawEverything();
    }

    public clearCanvas() {
        this.shapes = [];
        this.drawEverything();
    }

    public redraw() {
        this.drawEverything();
    }

    private checkCollision(shapeA: Shape, shapeB: Shape): boolean {
        const a = shapeA.getCollisionBox();
        const b = shapeB.getCollisionBox();
        return (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y
        );
    }

    private drawEverything() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapes.forEach(shp => shp.draw(this.ctx));
        this.drawInfo();
    }

    private drawInfo() {
        this.ctx.save();
        const infoWidth = 150;
        const infoHeight = 110;
        const infoPad = 10;
        const startX = this.canvas.width - infoWidth - infoPad;
        const startY = infoPad;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(startX, startY, infoWidth, infoHeight);

        this.ctx.fillStyle = '#000000';
        this.ctx.textAlign = "left";
        this.ctx.font = "12px monospace";
        
        const info = [
            `Objects: ${this.shapes.length}`,
            `Canvas: ${this.canvas.width} x ${this.canvas.height}`,
            `Window: ${window.innerWidth} x ${window.innerHeight}`,
            `Scroll: ${Math.round(window.scrollX)}, ${Math.round(window.scrollY)}`,
            `Collision: ${this.isCollisionEnabled ? 'ON' : 'OFF'}`,
            `isDragging: ${this.isDragging}`,
        ];

        info.forEach((text, index) => {
            this.ctx.fillText(text, startX + 10, startY + 20 + (index * 15));
        });

        this.ctx.restore();
    }
}