import { useNavigate } from "react-router";
import { TechButtonProps, badge_colors } from "../types/TechTypes";

export default function TechButton({ tech, link }: TechButtonProps) {
    const color: string = badge_colors[tech];
    const transparent_styles: React.CSSProperties = {
        "--hover-color": color,
        transition: "transform 0.3s, background-color 0.3s, border-color 0.3s",
    } as React.CSSProperties;
    
    type HoverFocusEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FocusEvent<HTMLButtonElement, Element>;
    const set_colors = (e: HoverFocusEvent) => {
        const button = e.currentTarget;
        button.style.backgroundColor = color;
        button.style.borderColor = color;
    };
    const reset_colors = (e: HoverFocusEvent) => {
        const button = e.currentTarget;
        button.style.backgroundColor = "transparent";
        button.style.borderColor = "rgba(255, 255, 255, 0.5)";
    };
    
    const navigate = useNavigate();
    const navigate_to_link = () => {
        if (link) navigate(link);
    }

    return <div className="inline-block">
        <button
            className={`
                transform transition-all duration-300 ease-in-out hover:scale-125 focus:scale-125
                content-text px-2.5 py-0.5 border-2 rounded-lg
                bg-transparent
                border-solid border-white/50 text-white
                relative hover:z-[50] focus:z-[50]
            `}
            style={transparent_styles}
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