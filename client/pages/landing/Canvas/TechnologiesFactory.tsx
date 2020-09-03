/// @ts-check
import { useEffect, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import p5 from "p5";
import { Gear } from "./Gear";

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
                const gearImage = p.loadImage("images/gear.png");
                let gear1: Gear;
                let gear2: Gear;

                p.setup = () => {
                    canvas.background(255);
                    gear1 = new Gear(p, gearImage, 50, 50, 0.04);
                    gear2 = new Gear(p, gearImage, 50, 50, -0.04);
                };

                p.draw = () => {
                    const halfCanvasHeight: number = canvas.height / 2;
                    windowResized();
                    p.push();
                    gear1.display(canvas.width / 2 - 100, halfCanvasHeight);
                    p.pop();
                    p.push();
                    gear2.display(canvas.width / 2 + 100, halfCanvasHeight);
                    p.pop();
                    p.rect(0, halfCanvasHeight, canvas.width - 148, 50, 0, 35, 35, 0);
                    const squareColor = p.color(100, 50, 100);
                    squareColor.setAlpha(0.5);
                    p.strokeWeight(3);
                    p.fill(squareColor);
                    p.rectMode(p.CENTER);
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
