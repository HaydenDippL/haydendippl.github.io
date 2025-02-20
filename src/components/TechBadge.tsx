import { useNavigate } from "react-router";
import { Tech, TechBadgeProps } from "../types/TechBadge";

const badge_colors: Record<Tech, string> = {
    [Tech.Angular]: "#cf44f9",
    [Tech.Cpp]: "#659bd3",
    [Tech.Django]: "#0c4b33",
    [Tech.React]: "#58c4dc",
    [Tech.DotNET]: "#bb74da",
    [Tech.Python]: "#ffdf5d",
    [Tech.SQL]: "#c5df2f",
    [Tech.TypeScript]: "#3178c6",
}

export default function TechBadge({ tech, size, transparent, grow, link }: TechBadgeProps) {
    const color: string = badge_colors[tech];
    const size_classes: string = (size === "lg") ?
        "content-text px-2.5 py-0.5 border-2 rounded-lg" :
        "text-sm font-inter px-1 py-px border-1 rounded-sm";
    const transparent_classes: string = (transparent) ?
        "bg-transparent" :
        "";
    const transparent_styles: React.CSSProperties = (transparent) ?
    {
        "--hover-color": color,
        transition: "transform 0.3s, background-color 0.3s, border-color 0.3s",
    } as React.CSSProperties :
    { 
        "background-color": color,
        "borderColor": color
    } as React.CSSProperties;
    const grow_classes: string = (grow) ?
        "transform transition-all duration-300 ease-in-out hover:scale-125 hover:z-[900] focus:scale-125 hover:z-[900]":
        "";
    const navigate = useNavigate();

    type HoverFocusEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FocusEvent<HTMLButtonElement, Element>;
    const set_colors = (e: HoverFocusEvent) => {
        if (transparent) {
            const button = e.currentTarget;
            button.style.backgroundColor = color;
            button.style.borderColor = color;
        }
    };
    const reset_colors = (e: HoverFocusEvent) => {
        if (transparent) {
            const button = e.currentTarget;
            button.style.backgroundColor = "transparent";
            button.style.borderColor = "rgba(255, 255, 255, 0.5)";
        }
    };
    const navigate_to_link = () => {
        if (link) navigate(link);
    }

    return <div className="inline-block">
        <button 
            className={`
                ${size_classes}
                ${transparent_classes}
                ${grow_classes}
                border-solid border-white/50`}
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