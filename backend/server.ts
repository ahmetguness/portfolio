import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes';
import blogRoutes from './routes/blog.routes';
import projectRoutes from './routes/project.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});