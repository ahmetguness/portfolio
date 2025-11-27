import dummyImage from '../assets/dummy_image.svg';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    slug: 'cyber-interface',
    title: 'Cyber-Interface',
    description: 'A futuristic data visualization dashboard built with React and D3.js, featuring real-time data streams and complex animations.',
    longDescription: 'This project was an exploration into real-time data handling and advanced frontend animations. The goal was to create a UI that feels alive and responsive, mimicking a sci-fi command center. I utilized D3.js for complex data-driven SVG visualizations and Framer Motion for the fluid layout animations. WebSocket integration allows for a continuous stream of mock data.',
    techStack: ['React', 'TypeScript', 'D3.js', 'Framer Motion', 'SCSS'],
    githubUrl: '#',
    liveUrl: '#',
    image: dummyImage,
  },
  {
    slug: 'project-nebula',
    title: 'Project Nebula',
    description: 'A full-stack e-commerce platform for digital assets. Includes a custom-built cart, Stripe integration, and JWT authentication.',
    longDescription: 'Project Nebula is a complete e-commerce solution for selling digital goods. The backend is built with Node.js and Express, providing a RESTful API for managing products, users, and orders. User authentication is handled securely with JSON Web Tokens (JWT), and payments are processed through the Stripe API. The frontend is a responsive React application.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
    githubUrl: '#',
    liveUrl: '#',
    image: dummyImage,
  },
  {
    slug: 'ai-content-generator',
    title: 'AI Content Generator',
    description: 'A minimalist web app that leverages the OpenAI API to generate blog posts and marketing copy. Designed to be clean and fast.',
    longDescription: 'This tool provides a simple interface to interact with the powerful OpenAI GPT models. Users can input a prompt, and the application streams the response back token by token, creating a real-time typing effect. The entire application is built with Vite for speed and uses Tailwind CSS for a clean, utility-first design.',
    techStack: ['Vite', 'React', 'Tailwind CSS', 'OpenAI API'],
    githubUrl: '#',
    liveUrl: '#',
    image: dummyImage,
  },
];
