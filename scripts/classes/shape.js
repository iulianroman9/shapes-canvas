var Shape = (function () {
    function Shape(x, y, color) {
        this.id = Shape.shapeCount++;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    Shape.shapeCount = 0;
    return Shape;
}());
export { Shape };
