import { TechBadgeProps, TechBadgeSize, badge_colors, badge_text_colors } from "../types/TechTypes";

export default function TechBadge({ tech, size }: TechBadgeProps) {
    const colors: React.CSSProperties = {
        "color": badge_text_colors[tech],
        "backgroundColor": badge_colors[tech]
    };

    const size_classes: string = (size === TechBadgeSize.small) ?
        "text-md px-1.5 py-px rounded-md font-medium" :
        "text-2xl px-3 py-1 rounded-xl font-semibold";

    return <div className={`inline-block font-inter ${size_classes}`} style={colors}>
        {tech}
    </div>
}