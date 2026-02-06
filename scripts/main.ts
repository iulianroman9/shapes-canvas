import { Canvas } from "./classes/canvas.js";
import { ShapeType } from "./types/shapeType.js";

const canvasManager = new Canvas('my-canvas');
const clearButton = document.getElementById('clear-button') as HTMLButtonElement;
const collisionToggle = document.getElementById('collision-toggle') as HTMLInputElement;
const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
const shapeButtons = document.querySelectorAll('.button-container button');

shapeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const type = (e.target as HTMLElement).getAttribute('data-shape') as ShapeType;
        if (type) {
            const color = colorPicker.value;
            canvasManager.addShape(type, color);
        }
    });
});

clearButton.addEventListener('click', () => {
    canvasManager.clearCanvas();
});

collisionToggle.addEventListener('change', () => {
    canvasManager.isCollisionEnabled = collisionToggle.checked;
    canvasManager.redraw();
});