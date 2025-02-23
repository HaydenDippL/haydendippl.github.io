import { useNavigate } from "react-router";
import { TechButtonProps, badge_colors, badge_text_colors } from "../types/TechTypes";
import { useEffect, useState } from "react";

export default function TechButton({ tech, link }: TechButtonProps) {
    const BREAKPOINT_FILL_STATE: number = 640;
    const [fill_state, set_fill_state] = useState<boolean>(window.innerWidth <= BREAKPOINT_FILL_STATE);

    useEffect(() => {
        const handle_resize = () => {
            set_fill_state(window.innerWidth <= BREAKPOINT_FILL_STATE);
        }

        handle_resize();
        window.addEventListener("resize", handle_resize);

        return () => window.removeEventListener("resize", handle_resize);
    }, []);

    const badge_color: string = badge_colors[tech];
    const text_color: string = badge_text_colors[tech];
    
    type HoverFocusEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FocusEvent<HTMLButtonElement, Element>;
    const set_colors = (e: HoverFocusEvent) => {
        const button = e.currentTarget;
        button.style.backgroundColor = badge_color;
        button.style.borderColor = badge_color;
        button.style.color = text_color;
    };
    const reset_colors = (e: HoverFocusEvent) => {
        const button = e.currentTarget;
        button.style.backgroundColor = "transparent";
        button.style.borderColor = "rgba(255, 255, 255, 0.5)";
        button.style.color = "#ffffff"
    };
    
    const navigate = useNavigate();
    const navigate_to_link = () => {
        if (link) navigate(link);
    }

    if (fill_state) {
        return <div className="inline-block">
            <button
                className="content-text px-2.5 py-0.5 border-2 rounded-lg border-solid"
                style={{
                    backgroundColor: badge_color,
                    borderColor: badge_color,
                    color: text_color
                }}
                onClick={() => navigate_to_link()}
            >
                { tech }
            </button>
        </div>
    } else {
        return <div className="inline-block">
            <button
                className="
                    transform transition-all duration-300 ease-in-out hover:scale-125 focus:scale-125
                    content-text px-2.5 py-0.5 border-2 rounded-lg
                    bg-transparent
                    border-solid border-white/50 text-white
                    relative hover:z-[50] focus:z-[50]
                "
                onMouseEnter={(e) => set_colors(e)}
                onMouseLeave={(e) => reset_colors(e)}
                onFocus={(e) => set_colors(e)}
                onBlur={(e) => reset_colors(e)}
                onClick={() => navigate_to_link()}
            >
                {tech}
            </button>
        </div>
    }
}