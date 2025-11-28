import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useBlog } from '../data/BlogContext';
import { motion } from 'framer-motion';

// A simple component to render pseudo-markdown
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="prose prose-invert prose-lg max-w-none text-mid-gray space-y-4">
            {content.trim().split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-2xl font-bold text-light-gray mt-8 mb-2">{paragraph.replace('### ', '')}</h3>
                }
                if (paragraph.startsWith('|')) {
                    // This is a very basic table parser for the example
                    const rows = content.trim().split('\n').filter(p => p.startsWith('|'));
                    const headers = rows[0].split('|').slice(1, -1).map(h => h.trim());
                    const alignments = rows[1].split('|').slice(1, -1).map(a => a.includes(':--') ? 'text-left' : a.includes('--:') ? 'text-right' : 'text-center');
                    const body = rows.slice(2).map(r => r.split('|').slice(1, -1).map(c => c.trim()));
                    
                    if (index > 1) return null; // Render table only once

                    return (
                        <table key="table" className="w-full font-mono">
                            <thead>
                                <tr>
                                    {headers.map((h, i) => <th key={i} className={`p-2 border-b-2 border-card-blue ${alignments[i]}`}>{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {body.map((row, i) => (
                                    <tr key={i} className="border-b border-card-blue/50">
                                        {row.map((cell, j) => <td key={j} className={`p-2 ${alignments[j]}`}>{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
                return <p key={index}>{paragraph}</p>;
            })}
        </div>
    );
};

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlog();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <motion.div
      className="py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/blog" className="font-mono text-accent-cyan hover:underline mb-8 inline-block">
        &larr; All Posts
      </Link>
      
      <img src={post.image} alt={post.title} className="rounded-md object-cover w-full h-96 mb-8" />

      <h1 className="text-4xl md:text-5xl font-bold text-light-gray mb-2">{post.title}</h1>
      <p className="text-mid-gray font-mono mb-2">{post.date}</p>
      <div className="flex flex-wrap gap-2 mb-12">
        {post.tags.map(tag => (
            <span key={tag} className="text-xs font-mono bg-accent-cyan/10 text-accent-cyan px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      <MarkdownRenderer content={post.content} />
      
    </motion.div>
  );
};

export default BlogDetailPage;
