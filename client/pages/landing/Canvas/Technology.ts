import { Gear } from "./Gear";

interface DoneCallback {
    (technologyId: string): void;
}

interface IConstructorProps {
    p: any;
    w: number;
    h: number;
    startX: number;
    startY: number;
    spawnRightSide: boolean;
    closestGear: Gear;
    canvasHeight: number;
    imagePath?: string;
}

export class Technology {
    public w: number;
    private h: number;
    private xPos: number = 0;
    private yPos: number = 0;
    private p: any; // p5 context
    private closestGear: Gear;
    private spawnedRightSide: boolean;
    private img: any;
    private canvasHeight: number;

    private hasFallen: boolean = false;
    private hasSlidedToTheEndOfTreadMill: boolean = false;
    private hasFallenToCrusher: boolean = false;
    private readonly GRAVITY = 0.15;
    private fallingSpeed = 1;
    private readonly airResistance = 0.05;
    private fallToCrusherSpeed = 3;
    private finished = false;

    constructor({
        w,
        h,
        p,
        startX,
        startY,
        spawnRightSide,
        closestGear,
        canvasHeight,
        imagePath = "images/graphql_logo.png"
    }: IConstructorProps) {
        this.w = w;
        this.h = h;
        this.p = p;
        this.xPos = startX;
        this.yPos = startY;
        this.spawnedRightSide = spawnRightSide;
        this.closestGear = closestGear;
        this.canvasHeight = canvasHeight;
        this.img = p.loadImage(imagePath);
    }

    display(treadMillTopYPos: number, done: DoneCallback) {
        this.p.push();
        this.p.imageMode(this.p.CENTER);
        this.p.image(this.img, this.xPos, this.yPos, this.w, this.h);

        if (!this.hasFallen) {
            return (this.hasFallen = this.fall(treadMillTopYPos));
        }
        if (this.hasFallen && !this.hasSlidedToTheEndOfTreadMill) {
            return (this.hasSlidedToTheEndOfTreadMill = this.slideToTheEndOfTreadMill());
        }
        if (this.hasFallen && this.hasSlidedToTheEndOfTreadMill && !this.hasFallenToCrusher) {
            return (this.hasFallenToCrusher = this.fallToCrusher());
        }

        if (this.hasFallenToCrusher && !this.finished) {
            this.finished = true;
            done("im done");
        }
        this.p.pop();
    }

    fall(YCoordToPass: number): boolean {
        this.yPos = this.yPos + this.fallingSpeed;
        this.fallingSpeed = this.fallingSpeed + this.GRAVITY;
        return this.yPos > YCoordToPass - this.h / 2 - 5;
    }

    slideToTheEndOfTreadMill(): boolean {
        this.xPos = this.addOrSubstr(this.xPos, 3);
        if (this.hasPassedAPosition(this.xPos, this.addOrSubstr(this.closestGear.xPos, 7), this.spawnedRightSide)) {
            this.fallingSpeed = 1;
            return true;
        } else {
            return false;
        }
    }

    fallToCrusher(): boolean {
        this.fall(1000);
        if (this.fallToCrusherSpeed > 0) {
            this.fallToCrusherSpeed = this.fallToCrusherSpeed - this.airResistance;
        }
        this.xPos = this.addOrSubstr(this.xPos, this.fallToCrusherSpeed);
        if (this.yPos >= this.canvasHeight) {
            return true;
        }
        return false;
    }

    private addOrSubstr(whatNum: number, howMany: number): number {
        if (this.spawnedRightSide) return whatNum + howMany;
        return whatNum - howMany;
    }

    private hasPassedAPosition(currentCoordinate: number, coordinateToPass: number, fromRightSide: boolean) {
        if (fromRightSide) {
            return currentCoordinate > coordinateToPass;
        } else {
            return currentCoordinate < coordinateToPass;
        }
    }
}
