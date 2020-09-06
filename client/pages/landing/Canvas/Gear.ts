export class Gear {
    public w: number;
    private h: number;
    private img: any;
    private rotationSpeed: number;
    private rotation: number = 0;
    private p: any; // p5 context

    constructor(p: any, w: number, h: number, rotationSpeed: number) {
        this.w = w;
        this.h = h;
        this.img = p.loadImage("images/gear.png");
        this.rotationSpeed = rotationSpeed;
        this.p = p;
    }

    display(x: number, y: number) {
        this.rotation = this.rotation + this.rotationSpeed;
        this.p.translate(x, y);
        this.p.rotate(this.rotation);
        this.p.imageMode(this.p.CENTER);
        this.p.image(this.img, 0, 0, this.w, this.h);
    }
}
