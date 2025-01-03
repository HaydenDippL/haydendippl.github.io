// TODO: Implement Carousel component
// TODO: Implement Drag and Scroll
// TODO: Use Wheel event to scroll
// TODO: Implement wrap around
// TODO: Implement auto scroll when not hovering
// TODO: Implement easing in (starting auto scroll) and out (stopping auto scroll)

import { useEffect } from "react";

// Planning on using absolute positioning to move the carousel items around
// Must implement lots of logic to handle the wrap around feature

interface CarouselProps {
    items: JSX.Element[];
}

export default function Carousel({ items }: CarouselProps) {
    useEffect(() => {
        const carousel = document.getElementById("carousel");
        let scrollAmount = 0;
        let isHovering = false;

        function scrollStep() {
            if (!isHovering && carousel) {
                scrollAmount += 1;
                if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                    scrollAmount = 0;
                }
                carousel.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth"
                });
            }
        }

        const interval = setInterval(scrollStep, 50);

        carousel?.addEventListener("mouseenter", () => {
            isHovering = true;
        });

        carousel?.addEventListener("mouseleave", () => {
            isHovering = false;
        });

        return () => {
            clearInterval(interval);
            carousel?.removeEventListener("mouseenter", () => {
                isHovering = true;
            });
            carousel?.removeEventListener("mouseleave", () => {
                isHovering = false;
            });
        };
    }, []);

    return <div id="carousel" className="w-full h-auto flex flex-row gap-4 overflow-auto">
        {items}
    </div>;
}