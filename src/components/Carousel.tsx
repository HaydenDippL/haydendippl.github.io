import { useRef, useEffect, useState } from "react";

interface CarouselProps {
    items: JSX.Element[];
}

export default function Carousel({ items }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [scrollAmount, setScrollAmount] = useState(0);

    useEffect(() => {
        const carousel = carouselRef.current;

        function scrollStep() {
            if (!isHovering && carousel) {
                setScrollAmount(scrollAmount => {
                    if (scrollAmount + 1 >= carousel.scrollWidth - carousel.clientWidth) {
                        return 0;
                    }
                    return scrollAmount + 1;
                });

                carousel.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth"
                });
            }
        }

        const interval = setInterval(scrollStep, 50);

        carousel?.addEventListener("mouseenter", () => {
            setIsHovering(true);
        });

        carousel?.addEventListener("mouseleave", () => {
            setIsHovering(false);
        });

        return () => {
            clearInterval(interval);
            carousel?.removeEventListener("mouseenter", () => {
                setIsHovering(true);
            });
            carousel?.removeEventListener("mouseleave", () => {
                setIsHovering(false);
            });
        };
    }, [isHovering, scrollAmount]);

    return <div id="carousel" ref={carouselRef} className={`w-full h-auto flex flex-row gap-4 px-4 ${isHovering ? "overflow-auto" : "overflow-hidden"}`}>
        {items}
    </div>;
}