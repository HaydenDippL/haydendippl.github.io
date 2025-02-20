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

export type TechBadgeProps = {
    tech: Tech,
    size: "lg" | "sm",
    transparent: boolean,
    grow: boolean
    link?: string
}