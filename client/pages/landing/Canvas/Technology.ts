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

    private hasFallen: boolean = false;
    private hasSlidedToTheEndOfTreadMill: boolean = false;
    private readonly GRAVITY = 0.15;
    private fallingSpeed = 1;
    private readonly airResistance = 0.05;
    private fallToCrusherSpeed = 3;

    constructor({ w, h, p, startX, startY, spawnRightSide, closestGear }: IConstructorProps) {
        this.w = w;
        this.h = h;
        this.p = p;
        this.xPos = startX;
        this.yPos = startY;
        this.spawnedRightSide = spawnRightSide;
        this.closestGear = closestGear;
        this.img = p.loadImage("images/graphql_logo.png");
    }

    display(treadMillTopYPos: number, done: DoneCallback) {
        this.p.push();
        this.p.imageMode(this.p.CENTER);
        this.p.image(this.img, this.xPos, this.yPos, this.w, this.h);
        let hasFallenToCrusher = false;

        if (!this.hasFallen) {
            return (this.hasFallen = this.fall(treadMillTopYPos));
        }
        if (this.hasFallen && !this.hasSlidedToTheEndOfTreadMill) {
            return (this.hasSlidedToTheEndOfTreadMill = this.slideToTheEndOfTreadMill());
        }
        if (this.hasFallen && this.hasSlidedToTheEndOfTreadMill) {
            return (hasFallenToCrusher = this.fallToCrusher());
        }
        if (hasFallenToCrusher) {
            done("someId");
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
        console.log(this.fallToCrusherSpeed);

        this.xPos = this.addOrSubstr(this.xPos, this.fallToCrusherSpeed);
        return true;
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
