import { TechBadgeProps, badge_colors, badge_text_colors } from "../types/TechTypes";

export default function TechBadge({ tech }: TechBadgeProps) {
    const colors: React.CSSProperties = {
        "color": badge_text_colors[tech],
        "backgroundColor": badge_colors[tech]
    }

    return <div
        className="inline-block text-md font-inter px-1.5 py-px rounded-md"
        style={colors}
    >
        {tech}
    </div>
}