import { ProjectItem } from "@/common/types/projects";
import { projectsData } from "@/common/constants/projects-data";

/**
 * Get all projects that are marked as shown
 */
export const getProjectsData = (): ProjectItem[] => {
  return projectsData.filter((project) => project.is_show);
};

/**
 * Get all featured projects
 */
export const getFeaturedProjects = (): ProjectItem[] => {
  return projectsData.filter(
    (project) => project.is_show && project.is_featured,
  );
};

/**
 * Get project by slug
 */
export const getProjectsDataBySlug = (
  slug: string,
): ProjectItem | undefined => {
  return projectsData.find(
    (project) => project.slug === slug && project.is_show,
  );
};

/**
 * Get all unique stacks used in projects
 */
export const getProjectStacks = (): string[] => {
  const stacks = new Set<string>();

  projectsData
    .filter((project) => project.is_show)
    .forEach((project) => {
      project.stacks.forEach((stack) => stacks.add(stack));
    });

  return Array.from(stacks).sort();
};

/**
 * Get projects filtered by stack
 */
export const getProjectsByStack = (stack: string): ProjectItem[] => {
  return projectsData.filter(
    (project) => project.is_show && project.stacks.includes(stack),
  );
};

/**
 * Get project by ID
 */
export const getProjectById = (id: number): ProjectItem | undefined => {
  return projectsData.find((project) => project.id === id && project.is_show);
};
