import { useEffect, useRef } from "react";
import p5 from "p5";

const TechnologiesFactory = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // const func = async () => {
    //     console.log(p5);
    //     console.log(containerRef.current);
    //     let sketch = function(p) {
    //         p.setup = function() {
    //             p.createCanvas(100, 100);
    //             p.background(0);
    //         };
    //     };

    //     new p5(sketch, containerRef.current);
    // };

    useEffect(() => {
        if (containerRef.current) {
            let sketch = function(p) {
                p.setup = function() {
                    p.createCanvas(100, 100);
                    p.background(0);
                };
            };
            //
            if (!containerRef.current.children.length) {
                new p5(sketch, containerRef.current);
            }
        }
    }, [containerRef]);

    return (
        <>
            gamefactory
            <div ref={containerRef} id="canvas-container"></div>
        </>
    );
};

export default TechnologiesFactory;
