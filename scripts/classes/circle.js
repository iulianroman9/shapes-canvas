var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Shape } from "./shape.js";
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, color, radius) {
        var _this = _super.call(this, x, y, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    Circle.prototype.isPointInside = function (mx, my) {
        var distance = Math.sqrt(Math.pow((mx - this.x), 2) + Math.pow((my - this.y), 2));
        return distance <= this.radius;
    };
    Circle.prototype.getCollisionBox = function () {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            w: this.radius * 2,
            h: this.radius * 2
        };
    };
    return Circle;
}(Shape));
export { Circle };
