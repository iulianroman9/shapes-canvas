import { ShapeType } from "./types/shapeType";
import { Shape } from "./classes/shape";
import { Circle } from "./classes/circle";
import { Triangle } from "./classes/triangle";
import { Rectangle } from "./classes/rectangle";
import { Square } from "./classes/square";

const canvas = document.getElementById('my-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const clearButton = document.getElementById('clear-button') as HTMLButtonElement;
const collisionToggle = document.getElementById('collision-toggle') as HTMLInputElement;
const shapeColors = ['#ff0000','#0000ff','#00ff00','#8c00ff']

let shapes: Shape[] = [];

let startDragX: number, startDragY: number;
let isDragging = false;
let draggedShape: Shape | null;

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let i = shapes.length - 1; i >= 0; i--) {
        if (shapes[i].isPointInside(mx, my)) {
            isDragging = true;
            draggedShape = shapes[i];
            
            startDragX = draggedShape.x;
            startDragY = draggedShape.y;

            shapes.splice(i, 1);
            shapes.push(draggedShape);
            
            drawEverything();
            return;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDragging || !draggedShape) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    draggedShape.x = mx;
    draggedShape.y = my;

    drawEverything();
});

window.addEventListener('mouseup', () => {
    if (isDragging && draggedShape && collisionToggle.checked) {
        for (const other of shapes) {
            if (other === draggedShape)
                continue;

            if (checkCollision(draggedShape, other)) {
                draggedShape.x = startDragX;
                draggedShape.y = startDragY;
                break; 
            }
        }
    }

    isDragging = false;
    draggedShape = null;
    drawEverything();
});

clearButton.addEventListener('click', () => {
    shapes = [];
    drawEverything();
});

function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shp => shp.draw(ctx));
    drawInfo();
}

window.addEventListener('resize', drawEverything);
window.addEventListener('scroll', drawEverything);
collisionToggle.addEventListener('change', drawEverything);

function drawInfo() {
    ctx.save();
    const infoWidth = 150;
    const infoHeight = 100;
    const infoPad = 10;
    const startX = canvas.width - infoWidth - infoPad;
    const startY = infoPad;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(startX, startY, infoWidth, infoHeight);

    ctx.fillStyle = '#000000';
    ctx.textAlign = "left";
    
    const info = [
        `Objects: ${shapes.length}`,
        `Canvas: ${canvas.width} x ${canvas.height}`,
        `Window: ${window.innerWidth} x ${window.innerHeight}`,
        `Scroll: ${window.scrollX}, ${window.scrollY}`,
        `Collision: ${collisionToggle.checked ? 'ON' : 'OFF'}`,
        `isDragging: ${isDragging}`,
    ];

    info.forEach((text, index) => {
        ctx.fillText(text, startX + 15, startY + 15 + (index * 15));
    });

    ctx.restore();
}

document.querySelectorAll('.button-container button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const type = (e.target as HTMLElement).getAttribute('data-shape') as ShapeType;
        if (type) {
            createShape(type);
        }
    });
});

function createShape(type: ShapeType) {
    const x = Math.random() * (canvas.width - 100) + 25;
    const y = Math.random() * (canvas.height - 100) + 25;
    const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];

    let newShape: Shape;

    if (type === 'circle') {
        newShape = new Circle(x, y, color, 30);
    }
    else if (type === 'triangle') {
        newShape = new Triangle(x, y, color, 60);
    }
    else if (type === 'square') {
        newShape = new Square(x, y, color, 50);
    }
    else {
        newShape = new Rectangle(x, y, color, 80, 50);
    }

    shapes.push(newShape);
    drawEverything();
}

function checkCollision(shapeA: Shape, shapeB: Shape): boolean {
    const a = shapeA.getCollisionBox();
    const b = shapeB.getCollisionBox();

    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

drawEverything();