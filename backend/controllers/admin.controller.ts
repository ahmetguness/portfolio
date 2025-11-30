import { Request, Response } from 'express';
import { getAdmin } from '../services/admin.service';

export const getAdminInfo = async (req: Request, res: Response) => {
  try {
    const admin = await getAdmin();
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving admin information');
  }
};