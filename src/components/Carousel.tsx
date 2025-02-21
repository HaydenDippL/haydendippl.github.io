import { useRef, useEffect, useState } from "react";

interface CarouselProps {
    items: JSX.Element[];
}

export default function Carousel({ items }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [scrollAmount, setScrollAmount] = useState(0);
    const [isScrollable, setIsScrollable] = useState(false);

    // Check if carousel needs scrolling
    useEffect(() => {
        const checkScrollable = () => {
            if (carouselRef.current) {
                const { scrollWidth, clientWidth } = carouselRef.current;
                setIsScrollable(scrollWidth > clientWidth);
            }
        };

        checkScrollable(); // Run on mount
        window.addEventListener("resize", checkScrollable);
        
        return () => window.removeEventListener("resize", checkScrollable);
    }, [items]);

    // Auto-scroll effect when not hovering
    useEffect(() => {
        if (!isScrollable) return;

        const carousel = carouselRef.current;

        function scrollStep() {
            if (!isHovering && carousel) {
                setScrollAmount((prev) => {
                    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                    return prev + 1 >= maxScroll ? 0 : prev + 1;
                });

                carousel.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }

        const interval = setInterval(scrollStep, 50);

        carousel?.addEventListener("mouseenter", () => setIsHovering(true));
        carousel?.addEventListener("mouseleave", () => setIsHovering(false));

        return () => {
            clearInterval(interval);
            carousel?.removeEventListener("mouseenter", () => setIsHovering(true));
            carousel?.removeEventListener("mouseleave", () => setIsHovering(false));
        };
    }, [isHovering, scrollAmount, isScrollable]);

    return (
        <div
            ref={carouselRef}
            className={`w-full h-auto flex flex-row gap-6 p-8 
                ${isScrollable ? (isHovering ? "overflow-auto" : "overflow-hidden") : "justify-center"}`}
        >
            {items}
        </div>
    );
}
