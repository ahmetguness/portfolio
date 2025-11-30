import { Request, Response } from 'express';
import { getAllProjects, getProjectBySlug } from '../services/project.service';

export const getAllProjectsController = async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving projects');
  }
};

export const getProjectBySlugController = async (req: Request, res: Response) => {
  try {
    const project = await getProjectBySlug(req.params.slug);
    if (project) {
      res.json(project);
    } else {
      res.status(404).send('Project not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving project');
  }
};
