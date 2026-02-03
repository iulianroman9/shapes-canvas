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
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(x, y, color, side) {
        var _this = _super.call(this, x, y, color) || this;
        _this.side = side;
        return _this;
    }
    Triangle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.side / 2, this.y + this.side);
        ctx.lineTo(this.x + this.side / 2, this.y + this.side);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    Triangle.prototype.isPointInside = function (mx, my) {
        return (mx >= this.x - this.side / 2 &&
            mx <= this.x + this.side / 2 &&
            my >= this.y &&
            my <= this.y + this.side);
    };
    Triangle.prototype.getCollisionBox = function () {
        return {
            x: this.x - this.side / 2,
            y: this.y,
            w: this.side,
            h: this.side
        };
    };
    return Triangle;
}(Shape));
export { Triangle };
