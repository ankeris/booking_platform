/// @ts-check
import { useEffect, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import p5 from "p5";
import { Gear } from "./Gear";
import { Technology } from "./Technology";

const CanvasWrapper = styled.section`
    height: 60vh;
    canvas {
        border: 2px solid black;
    }
`;

const TechnologiesFactory = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const sketch = p => {
                const canvas: p5 = p.createCanvas(p.windowWidth, p.windowHeight / 1.7);
                const DISTANCE_FROM_CENTER: number = 100;
                const TREADMILL_HEIGHT = 55;
                const TREADMILL_Y_POS: number = canvas.height / 2;
                const allTechnologies: Array<Technology> = [];
                const techDisplayed: Array<Technology> = [];

                let gear1: Gear;
                let gear2: Gear;

                p.setup = () => {
                    canvas.background(255);
                    gear1 = new Gear(p, 50, 50, 0.04);
                    gear2 = new Gear(p, 50, 50, -0.04);
                    let spawnRightSide = true;
                    setInterval(() => {
                        if (techDisplayed.length < 3) {
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
                                    h: 60
                                })
                            );
                            console.log(techDisplayed);
                            spawnRightSide = !spawnRightSide;
                        }
                    }, 2000);
                };

                p.draw = () => {
                    windowResized();
                    treadMills();
                    drawTechnologies();
                };

                const treadMills = () => {
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
                        techDisplayed[i].display(TREADMILL_Y_POS - TREADMILL_HEIGHT / 2, () => {
                            console.log("done");
                        });
                    }
                };

                const windowResized = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight / 1.7);
                };
            };

            if (!containerRef.current.children.length) {
                new p5(sketch, containerRef.current);
            }
        }
    }, [containerRef]);

    return (
        <>
            <CanvasWrapper ref={containerRef} id="canvas-container"></CanvasWrapper>
        </>
    );
};

export default TechnologiesFactory;
