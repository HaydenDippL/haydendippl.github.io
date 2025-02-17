import { DateTime } from "luxon";
import { ProjectData, ProjectPreviewData, ProjectPreviewProps } from "../types/ProjectTypes";

import {
    UWOpenRecRosterProject
} from "../projects/UWOpenRecRoster";

const projects: ProjectData[] = [
    UWOpenRecRosterProject
].sort((a, b) => {
    const a_ms = DateTime.fromISO(a.published).toMillis();
    const b_ms = DateTime.fromISO(b.published).toMillis();
    return b_ms - a_ms;
});

function get_released_projects() {
    const now: DateTime = DateTime.now();
    return projects.filter((project) => now >= DateTime.fromISO(project.published));
}

export function get_project(id: string | undefined): ProjectData | undefined {
    if (id === undefined) return undefined;
        
    const id_number: number = parseInt(id);
    if (isNaN(id_number) || id_number < 0 || id_number >= projects.length)
        return undefined;

    const project: ProjectData = projects[id_number];
    const now: DateTime = DateTime.now();
    const published: DateTime = DateTime.fromISO(project.published);

    if (now < published)
        return undefined;

    return project;
}

export function get_project_previews(): ProjectPreviewProps[] {
    return get_released_projects().map((project) => {
        return {
            id: project.id,
            starred: project.starred,
            published: project.published,
            image: project.image,
            title: project.title,
            description: project.description,
        } as ProjectPreviewData;
    }).sort((a, b) => {
        const a_ms = DateTime.fromISO(a.published).toMillis();
        const b_ms = DateTime.fromISO(b.published).toMillis();
        return b_ms - a_ms;
    });
}

export function get_carousel_previews(): ProjectPreviewProps[] {
    const MAX_PROJECTS = 10;
    
    const starred_projects: ProjectData[] = projects.filter((project) => project.starred);
    let remaining_starred_projects: number = starred_projects.length;

    const carousel_preview: ProjectData[] = [];
    for (let i = 0; i < MAX_PROJECTS && i < projects.length; ++i) {
        if (i + remaining_starred_projects >= MAX_PROJECTS) {
            carousel_preview.push(...starred_projects.slice(starred_projects.length - remaining_starred_projects));
            break;
        }

        const project: ProjectData = projects[i];
        if (project.starred) --remaining_starred_projects;
        carousel_preview.push(project);
    }

    return carousel_preview.map((project) => {
        return {
            id: project.id,
            starred: project.starred,
            published: project.published,
            image: project.image,
            title: project.title,
            description: project.description,
        } as ProjectPreviewData;
    });
}

export function get_project_ids(): number[] {
    return get_released_projects().map((project) => project.id);
}