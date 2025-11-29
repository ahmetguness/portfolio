import dummyImage from '../assets/dummy_image.jpg';
import { Post } from '../types/blog';

export const postsData: Post[] = [
  {
    slug: 'diving-deep-into-react-server-components',
    date: 'November 27, 2025',
    title: 'Diving Deep into React Server Components',
    tags: ['React', 'Next.js', 'WebDev'],
    url: '#',
    image: dummyImage,
    content: `
React Server Components (RSCs) are a new architecture that allows developers to build applications that span the server and client. 
This post explores the "why" behind RSCs and provides a practical guide on how to start using them in your Next.js applications.

### Key Concepts
- Zero-bundle-size components
- Direct access to server-side resources
- Seamless integration with Client Components

We will build a small demo application to illustrate these points.
    `
  },
  {
    slug: 'the-art-of-state-management',
    date: 'October 15, 2025',
    title: 'The Art of State Management: Zustand vs. Redux',
    tags: ['React', 'State Management', 'TypeScript'],
    url: '#',
    image: dummyImage,
    content: `
Choosing the right state management library can be daunting. Redux has been the long-standing champion, but newer libraries like Zustand offer a simpler, more modern approach.

### Comparison
| Feature      | Redux Toolkit        | Zustand              |
|--------------|----------------------|----------------------|
| Boilerplate  | Moderate             | Minimal              |
| API Surface  | Large (Actions, Reducers) | Small (Hooks-based)  |
| Bundle Size  | Larger               | Tiny                 |

This article breaks down the pros and cons of each, helping you decide which is right for your next project.
    `
  },
  {
    slug: 'creating-generative-art-with-framer-motion',
    date: 'September 02, 2025',
    title: 'Creating Generative Art with Framer Motion',
    tags: ['Animation', 'Framer Motion', 'Creative Coding'],
    url: '#',
    image: dummyImage,
    content: `
Framer Motion is not just for UI animations. Its powerful and flexible API can be harnessed to create stunning generative art.

In this tutorial, we will walk through the process of creating a dynamic, interactive particle system from scratch. We'll cover:
- Using the \`useSpring\` hook for organic motion
- Staggering animations with \`staggerChildren\`
- Responding to user input to create an interactive experience

Get ready to unlock your creative potential with Framer Motion!
    `
  },
];
