import { Circle } from "./classes/circle.js";
import { Triangle } from "./classes/triangle.js";
import { Rectangle } from "./classes/rectangle.js";
import { Square } from "./classes/square.js";
var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');
var clearButton = document.getElementById('clear-button');
var collisionToggle = document.getElementById('collision-toggle');
var shapeColors = ['#ff0000', '#0000ff', '#00ff00', '#8c00ff'];
var shapes = [];
var startDragX, startDragY;
var isDragging = false;
var draggedShape;
canvas.addEventListener('mousedown', function (e) {
    var rect = canvas.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;
    for (var i = shapes.length - 1; i >= 0; i--) {
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
canvas.addEventListener('mousemove', function (e) {
    if (!isDragging || !draggedShape)
        return;
    var rect = canvas.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;
    draggedShape.x = mx;
    draggedShape.y = my;
    drawEverything();
});
window.addEventListener('mouseup', function () {
    if (isDragging && draggedShape && collisionToggle.checked) {
        for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var other = shapes_1[_i];
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
clearButton.addEventListener('click', function () {
    shapes = [];
    drawEverything();
});
function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(function (shp) { return shp.draw(ctx); });
    drawInfo();
}
window.addEventListener('resize', drawEverything);
window.addEventListener('scroll', drawEverything);
collisionToggle.addEventListener('change', drawEverything);
function drawInfo() {
    ctx.save();
    var infoWidth = 150;
    var infoHeight = 100;
    var infoPad = 10;
    var startX = canvas.width - infoWidth - infoPad;
    var startY = infoPad;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(startX, startY, infoWidth, infoHeight);
    ctx.fillStyle = '#000000';
    ctx.textAlign = "left";
    var info = [
        "Objects: ".concat(shapes.length),
        "Canvas: ".concat(canvas.width, " x ").concat(canvas.height),
        "Window: ".concat(window.innerWidth, " x ").concat(window.innerHeight),
        "Scroll: ".concat(window.scrollX, ", ").concat(window.scrollY),
        "Collision: ".concat(collisionToggle.checked ? 'ON' : 'OFF'),
        "isDragging: ".concat(isDragging),
    ];
    info.forEach(function (text, index) {
        ctx.fillText(text, startX + 15, startY + 15 + (index * 15));
    });
    ctx.restore();
}
document.querySelectorAll('.button-container button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        var type = e.target.getAttribute('data-shape');
        if (type) {
            createShape(type);
        }
    });
});
function createShape(type) {
    var x = Math.random() * (canvas.width - 100) + 50;
    var y = Math.random() * (canvas.height - 100) + 25;
    var color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
    var newShape;
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
function checkCollision(shapeA, shapeB) {
    var a = shapeA.getCollisionBox();
    var b = shapeB.getCollisionBox();
    return (a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y);
}
drawEverything();
