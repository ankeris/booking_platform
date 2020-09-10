interface DoneCallback {
    (technologyId: string): void;
}

export class Technology {
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

    display(x: number, y: number, done: DoneCallback) {
        this.rotation = this.rotation + this.rotationSpeed;
        this.p.translate(x, y);
        this.p.rotate(this.rotation);
        this.p.imageMode(this.p.CENTER);
        this.p.image(this.img, 0, 0, this.w, this.h);

        let hasFallen = false;
        let hasSlidedToTheEndOfTreadMill = false;
        let hasFallenToCrusher = false;
        if (!hasFallen) {
            return (hasFallen = this.fall());
        }
        if (hasFallen && !hasSlidedToTheEndOfTreadMill) {
            return (hasSlidedToTheEndOfTreadMill = this.slideToTheEndOfTreadMill());
        }
        if (hasFallen && hasSlidedToTheEndOfTreadMill) {
            return (hasFallenToCrusher = this.fallToCrusher());
        }
        if (hasFallenToCrusher) {
            done("someId");
        }
    }

    fall(): boolean {
        return true;
    }

    slideToTheEndOfTreadMill(): boolean {
        return true;
    }
    fallToCrusher(): boolean {
        return true;
    }
}
