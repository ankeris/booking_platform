/// @ts-check
import { useEffect, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import p5 from "p5";
import { Gear } from "./Gear";
import { Technology } from "./Technology";
import { Nullable } from "@core/general.types";
import { ITechnology } from "@core/technologies.types";

const CanvasWrapper = styled.section`
    height: 60vh;
    canvas {
        border: 2px solid black;
    }
`;
interface IProps {
    allTechnologies: ITechnology[];
}

const TechnologiesFactory = ({ allTechnologies }: IProps) => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const sketch = p => {
                const canvas: p5 = p.createCanvas(p.windowWidth, p.windowHeight / 1.7);
                const DISTANCE_FROM_CENTER: number = 100;
                const TREADMILL_HEIGHT = 55;
                const canvasHeight = canvas.height;
                const TREADMILL_Y_POS: number = canvas.height / 2;

                let spawnerInterval: number;
                const spawnIndexLength = allTechnologies.length;
                let spawnIndex = 0;
                let spawnRightSide = true;
                let techDisplayed: Array<Technology | null> = [];
                let gear1: Gear;
                let gear2: Gear;

                p.setup = () => {
                    p.pixelDensity(0.9);
                    canvas.background(255);
                    gear1 = new Gear(p, 50, 50, 0.04);
                    gear2 = new Gear(p, 50, 50, -0.04);
                    spawnerInterval = setInterval(spawn, 2000);
                };

                p.draw = () => {
                    resizeCanvasToWindow();
                    drawTreadMills();
                    drawTechnologies();
                };

                const drawTreadMills = () => {
                    const leftGearXPos = canvas.width / 2 - DISTANCE_FROM_CENTER;
                    const rightGearXPos = canvas.width / 2 + DISTANCE_FROM_CENTER;
                    p.push();
                    gear1.display(leftGearXPos, TREADMILL_Y_POS);
                    p.pop();
                    p.push();
                    gear2.display(rightGearXPos, TREADMILL_Y_POS);
                    p.pop();
                    p.rect(0, TREADMILL_Y_POS, canvas.width - DISTANCE_FROM_CENTER - gear1.w + 5, 55, 0, 35, 35, 0);
                    p.rect(
                        canvas.width,
                        TREADMILL_Y_POS,
                        canvas.width - DISTANCE_FROM_CENTER - gear1.w + 5,
                        55,
                        35,
                        0,
                        0,
                        35
                    );
                    const squareColor = p.color(100, 50, 100);
                    squareColor.setAlpha(0.5);
                    p.strokeWeight(5);
                    p.fill(squareColor);
                    p.rectMode(p.CENTER);
                };

                const drawTechnologies = () => {
                    for (let i = 0; i < techDisplayed.length; i++) {
                        const curr = techDisplayed[i];
                        if (curr) {
                            curr.display(TREADMILL_Y_POS - TREADMILL_HEIGHT / 2, _ => {
                                techDisplayed[i] = null;
                            });
                        }
                    }
                    // clear the list
                    if (techDisplayed.length > 5) {
                        techDisplayed = techDisplayed.filter(x => Boolean(x));
                    }
                };

                const resizeCanvasToWindow = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight / 1.7);
                };

                const spawn = () => {
                    const getXPos = spawnRightSide ? 50 : canvas.width - 50;
                    const closestGear = spawnRightSide ? gear1 : gear2;
                    techDisplayed.push(
                        new Technology({
                            p,
                            spawnRightSide,
                            closestGear,
                            startX: getXPos,
                            startY: -25,
                            w: 60,
                            h: 60,
                            canvasHeight,
                            imagePath: allTechnologies[spawnIndex].logoImage.publicUrl
                        })
                    );
                    if (spawnIndex < spawnIndexLength - 1) {
                        spawnIndex++;
                    } else {
                        spawnIndex = 0;
                    }
                    spawnRightSide = !spawnRightSide;
                };

                window.addEventListener("focus", () => (spawnerInterval = setInterval(spawn, 2000)), false);

                window.addEventListener("blur", () => clearInterval(spawnerInterval), false);
            };

            if (!containerRef.current.children.length) {
                new p5(sketch, containerRef.current);
            }
        }
    }, [containerRef]);

    return <CanvasWrapper ref={containerRef} id="canvas-container"></CanvasWrapper>;
};

export default TechnologiesFactory;
