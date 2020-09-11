interface DoneCallback {
    (technologyId: string): void;
}

interface ConstructorProps {
    p: any;
    spawnRightSide: boolean;
    startX: number;
    startY: number;
    w: number;
    h: number;
}

export class Technology {
    public w: number;
    private h: number;
    private img: any;
    private xPos: number = 0;
    private yPos: number = 0;
    private p: any; // p5 context
    private spawnedRightSide: boolean;

    private hasFallen: boolean = false;

    constructor({ w, h, p, startX, startY, spawnRightSide }: ConstructorProps) {
        this.w = w;
        this.h = h;
        this.img = p.loadImage("images/graphql_logo.png");
        this.p = p;
        this.xPos = startX;
        this.yPos = startY;
        this.spawnedRightSide = spawnRightSide;
    }

    display(treadMillTopYPos: number, done: DoneCallback) {
        this.p.push();
        this.p.imageMode(this.p.CENTER);
        this.p.image(this.img, this.xPos, this.yPos, this.w, this.h);

        let hasSlidedToTheEndOfTreadMill = false;
        let hasFallenToCrusher = false;

        if (!this.hasFallen) {
            return (this.hasFallen = this.fall(treadMillTopYPos));
        }
        if (this.hasFallen && !hasSlidedToTheEndOfTreadMill) {
            return (hasSlidedToTheEndOfTreadMill = this.slideToTheEndOfTreadMill());
        }
        if (this.hasFallen && hasSlidedToTheEndOfTreadMill) {
            return (hasFallenToCrusher = this.fallToCrusher());
        }
        if (hasFallenToCrusher) {
            done("someId");
        }
        this.p.pop();
    }

    fall(treadMillTopYPos: number): boolean {
        this.yPos += 1;
        console.log(this.yPos >= treadMillTopYPos - this.h / 2);
        if (this.yPos >= treadMillTopYPos - this.h / 2) return true;
        return false;
    }

    slideToTheEndOfTreadMill(): boolean {
        this.xPos = this.addOrSubstr(this.xPos, this.spawnedRightSide, 1);
        return true;
    }
    fallToCrusher(): boolean {
        return true;
    }

    private addOrSubstr(whatNum: number, add: boolean, howMany: number): number {
        if (add) return whatNum + howMany;
        return whatNum - howMany;
    }
}
