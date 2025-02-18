export type SkeletonTextProps = {
    min_lines: number, // min number of lines
    max_lines: number, // max number of lines
    min_line_width: number, // percentage [0-1]
    min_last_line_width: number, // percentage [0-1]
    tailwind_height_class: string // tailwind class
}

export default function SkeletonText({min_lines, max_lines, min_line_width, min_last_line_width, tailwind_height_class} : SkeletonTextProps): JSX.Element[] {
    const lines: number = Math.random() * (max_lines - min_lines) + min_lines;
    const full_lines: number = Math.floor(lines);
    
    const skeleton_text: JSX.Element[] = Array.from({ length: Math.ceil(lines) }).map((_, i) => {
        let width: number;
        if (i < full_lines || i === 0) width = Math.round((Math.random() * (100 - min_line_width) + min_line_width)); // [min_line_width% - 100%]
        else width = Math.round((Math.random() * (100 - min_last_line_width) + min_last_line_width)); // [min_line_width% - 100%]

        const css_style_class: string = `${width}%`;
        return <div key={i} style={{ width: css_style_class}} className={`${tailwind_height_class} skeleton`} />
    });
    
    return skeleton_text;
}