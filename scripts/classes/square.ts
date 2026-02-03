import { Rectangle } from "./rectangle";

export class Square extends Rectangle {
    constructor(x: number, y: number, color: string, side: number) {
        super(x, y, color, side, side);
    }
}