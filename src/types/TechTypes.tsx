export enum Tech {
    "Angular" = "Angular",
    "Cpp" = "C++",
    "Django" = "Django",
    "React" = "React",
    "DotNET" = ".NET",
    "Python" = "Python",
    "SQL" = "SQL",
    "TypeScript" = "TypeScript"
}

export type TechButtonProps = {
    tech: Tech,
    link?: string
}

export type TechBadgeProps = {
    tech: Tech
}

export const badge_colors: Record<Tech, string> = {
    [Tech.Angular]: "#cf44f9",
    [Tech.Cpp]: "#659bd3",
    [Tech.Django]: "#0c4b33",
    [Tech.React]: "#58c4dc",
    [Tech.DotNET]: "#bb74da",
    [Tech.Python]: "#ffdf5d",
    [Tech.SQL]: "#c5df2f",
    [Tech.TypeScript]: "#3178c6",
}

export const badge_text_colors: Record<Tech, string> = {
    [Tech.Angular]: "#ffffff",
    [Tech.Cpp]: "#ffffff",
    [Tech.Django]: "#ffffff",
    [Tech.React]: "#000000",
    [Tech.DotNET]: "#ffffff",
    [Tech.Python]: "#ffffff",
    [Tech.SQL]: "#000000",
    [Tech.TypeScript]: "#ffffff",
}