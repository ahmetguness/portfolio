import React from 'react';
import { FaReact, FaCogs, FaServer } from "react-icons/fa";
import { DiJavascript1 } from "react-icons/di";
import { SiTypescript, SiPostgresql, SiLinux } from "react-icons/si";
import { TbBrandReactNative, TbSql } from "react-icons/tb";


interface SkillsProps {
  skill: string;
}

const Skills: React.FC<SkillsProps> = ({ skill }) => {
  const icon: Record<string, JSX.Element> = {
    "React Native": <TbBrandReactNative />,
    React: <FaReact />,
    Javascript: <DiJavascript1 />,
    TypeScript: <SiTypescript />,
    n8n: <FaCogs />,
    SQL: <TbSql />,
    PostgreSQL: <SiPostgresql />,
    Linux: <SiLinux />,
    Backend: <FaServer />
  }

  return (
    <div title={skill} className='SkillBox'>
      {icon[skill]}
    </div>
  )
}

export default Skills
