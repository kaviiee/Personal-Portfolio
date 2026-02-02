import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  FileText,
  Brain,
  Braces,
  Coffee,
  Database,
  Files, 
  Search, 
  GitGraph, 
  Bug, 
  Settings, 
  ChevronRight, 
  ChevronDown, 
  X,
  MoreVertical,
  Circle,
  Code2,
  FileJson,
  FileCode,
  FileType,
  Terminal as TerminalIcon,

  User,
  Briefcase,
  Mail,
  ExternalLink,
  Calendar,
  Award,
  Download
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import JSZip from "jszip";


const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop();

  switch (ext) {
    case 'html':
      return <Code2 size={16} className="text-orange-400" />;
    case 'css':
      return <FileText size={16} className="text-blue-400" />;
    case 'js':
      return <Braces size={16} className="text-yellow-400" />;
    case 'tsx':
      return <Braces size={16} className="text-sky-400" />; // React TSX

    case 'ts':
      return <FileCode size={16} className="text-blue-500" />; // plain TS
      // case 'tsx':
    // case 'ts':
    //   return <FileCode size={16} className="text-blue-500" />;
    case 'java':
      return <Coffee size={16} className="text-red-400" />;
    case 'json':
      return <FileJson size={16} className="text-green-400" />;
    case 'sql':
      return <Database size={16} className="text-purple-400" />;
    default:
      return <FileText size={16} className="text-gray-400" />;
  }
};


// ==========================================
// 🛠️ USER CONFIGURATION
// ==========================================

const USER_CONFIG = {
  name: "Kavisha Parikh",
  title: "Software Engineer & MS CS Student",
  email: "kavishaparikh9@gmail.com",
  phone: "(929) 758-0921",
  location: "Amherst, MA",
  social: {
    github: "github.com/kaviiee",
    linkedin: "linkedin.com/in/parikhkavisha",
    twitter: "" // Not provided in resume, left blank or removed
  },
  about: {
    summary: "Master's student in Computer Science at UMass Amherst with a strong foundation in full-stack development, distributed systems, and machine learning. Experienced in building scalable applications and optimizing database performance.",
    interests: [
      "Distributed Systems",
      "Machine Learning & AI",
      "System Design",
    ]
  },
  education: [
    {
      school: "University of Massachusetts Amherst",
      degree: "Master of Science in Computer Science",
      year: "Sep 2024 - May 2026",
      gpa: "3.96/4.0",
      coursework: "Software Engineering, Advanced Database Systems, Neural Networks, Data Visualization, Network Security, Cryptography."
    },
    {
      school: "Gujarat Technological University",
      degree: "Bachelor of Engineering in Information Technology",
      year: "Sep 2020 - Aug 2024",
      gpa: "",
      coursework: "Data Structures and Algorithms, Computer Architecture, Operating Systems."
    },
    {
      school: "Indian Institute of Technology Madras",
      degree: "Bachelor of Science in Data Science",
      year: "Sep 2021 - Aug 2024",
      gpa: "",
      coursework: "Software Testing, AI Search Methods, Advanced Web Development, Machine Learning, OOP."
    }
  ],
  experience: [
    {
      company: "Mercury Infoway",
      role: "Software Engineer Intern",
      period: "Dec 2023 - May 2024",
      description: [
        "Designed and implemented 4 core modules for a national e-governance platform using C# and ASP.NET Core MVC.",
        "Established role-based access control (RBAC) to enable fine-grained permissions for 12 roles supporting thousands of users.",
        "Accelerated dashboard page load time by optimizing SQL queries and introducing caching.",
        "Increased unit and integration test coverage from 45% to 80%, uncovering 7 critical regression bugs."
      ]
    }
  ],
  skills: {
    languages: ["Java", "Python", "JavaScript", "TypeScript", "C#", "SQL", "HTML", "CSS", "C++"],
    frameworks: ["React.js", "Node.js", "Express.js", "Vue.js", "ASP.NET Core", "Flask", "FastAPI", "Spring Boot", "PyTorch", "sci-kit learn", "pandas", "numpy"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"],
    tools: ["AWS (Lambda, Amplify, Elastic Beanstalk, EC2, S3, SQS)", "Docker", "Git", "JIRA", "Postman", "Linux", "Maven"]
  },
  projects: [
    {
      id: 1,
      name: "Scalable Database Query Engine",
      stack: ["Java", "Spring Boot", "Maven", "JUnit", "B+ Tree"],
      description: "Architected a disk-based relational query engine executing SQL-like queries over 70M+ records with LRU buffering and B+ Tree indexing.",
      link: "github.com/kaviiee/Database-Query-Engine"
    },
    {
      id: 2,
      name: "RepoRadar - Codebase Summarizer",
      stack: ["Python", "AWS", "LLM APIs", "AST"],
      description: "Engineered a code summarization pipeline using AST traversal and LLMs to generate structured summaries for 150+ file codebases.",
      link: "github.com/kaviiee/RepoRadar---Codebase-Summarizer"
    },
    {
      id: 3,
      name: "Badminton Shot Prediction",
      stack: ["Python", "R-GCN", "ML"],
      description: "Implemented an R-GCN with attention to predict player movement and shot types on 43K+ strokes, reducing model params by 44%.",
      link: "github.com/kaviiee"
    },
    {
      id: 4,
      name: "Online Grocery Management",
      stack: ["Vue.js", "Flask", "Redis", "Celery"],
      description: "Full stack e-commerce platform with async background processing for orders and Redis caching, decreasing latency by 35%.",
      link: "github.com/kaviiee/grocery-store-v2"
    },
    {
        id: 5,
        name: "Image Recognition as a Service",
        stack: ["Java", "AWS EC2", "SQS", "S3"],
        description: "Built an on-demand auto-scaling Image Recognition Service improving response time by 20% using load balancers.",
        link: "github.com/kaviiee"
    }
  ],
  hobbies: [
    {
        id: 1,
        name: "HackUMass",
        description: "It was an incredible, high-energy experience. It reminded me how much I enjoy building alongside others. Sharing ideas, debugging late while sipping coffee, and watching something slowly take shape despite time constraints. It was challenging, energizing, and deeply motivating.",
        image: "/HackUMass.jpeg"
      },  
    {
        id: 2,
        name: "Basketball",
        description: "Basketball turned from a hobby into a serious commitment that led me to compete at the national level in India. The experience taught me discipline, resilience, teamwork, and how to perform under pressure, qualities I carry into every challenge I take on.",
        image: "/Basketball.jpeg"
      },
      {
        id: 3,
        name: "Mentoring",
        description: "Evaluated asignments and exams involing Advanced Neural Networks, and Computer Vision for 80+ students. Provided constructive feedbacks and criticisms. Helped build final projects of 10 teams by providing guidance",
        image: "/Mentorship.png"
      },
      {
        id: 4,
        name: "Reading Tech Blogs",
        description: "Keeping up-to-date with latest technologies and software engineering trends.",
        image: "/Newsletter.png"
      },
      {
        id: 5,
        name: "Hiking n Traveling",
        description: "Exploring new mountain tops, cultures, cuisines, and cities around the world.",
        image: "/Traveling.jpeg"
      }
    ]
};

// ==========================================
// 🤖 AI CONTEXT GENERATION
// ==========================================

const GENERATED_CONTEXT = `
You are an interactive terminal assistant for ${USER_CONFIG.name}'s portfolio website. 
${USER_CONFIG.name} is a ${USER_CONFIG.title} based in ${USER_CONFIG.location}.
Your goal is to answer questions from recruiters or developers about ${USER_CONFIG.name} in a concise, technical, CLI-style format.
Do NOT use Markdown formatting. Use plain text.

PROFILE:
- Role: ${USER_CONFIG.title}
- Email: ${USER_CONFIG.email}
- Phone: ${USER_CONFIG.phone}

EDUCATION:
${USER_CONFIG.education.map(e => `- ${e.degree} at ${e.school} (${e.year})`).join("\n")}

EXPERIENCE:
${USER_CONFIG.experience.map(e => `- ${e.role} at ${e.company} (${e.period})`).join("\n")}

SKILLS:
- Languages: ${USER_CONFIG.skills.languages.join(", ")}
- Frameworks: ${USER_CONFIG.skills.frameworks.join(", ")}
- Tools: ${USER_CONFIG.skills.tools.join(", ")}

PROJECTS:
${USER_CONFIG.projects.map((p, i) => `${i + 1}. ${p.name}: ${p.description} (Stack: ${p.stack.join(", ")})`).join("\n")}

If the user asks "help" or "ls", list available "commands": "about", "projects", "education", "experience", "skills", "contact".
`;

// ==========================================
// 🧩 COMPONENTS & APP LOGIC
// ==========================================

// --- UI Components ---

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-vscode-accent/10 text-vscode-accent border border-vscode-accent/20">
    {children}
  </span>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
      <span className="w-1 h-6 bg-vscode-accent rounded-sm"></span>
      {title}
    </h2>
    {children}
  </div>
);

// --- View Components ---

const HomeView = ({ onNavigate }: { onNavigate: (file: string) => void }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
    <div className="mb-8 relative group">
       <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
       <div className="relative w-49 h-49 bg-[#252526] rounded-full overflow-hidden flex items-center justify-center text-5xl font-bold border-2 border-vscode-accent/50 text-vscode-accent select-none shadow-2xl">
          {/* {USER_CONFIG.name[0]} */}
          <img 
            // src="https://drive.google.com/uc?export=download&id=15tJLEIFb0neEhnj2UMwKYmjcftli_ML0" 
            src="/portfolio_picture.jpeg"
            alt="Profile"
            className="w-full h-full max-w-[200px] max-h-[200px] object-cover block transition-transform duration-500 group-hover:scale-110"
          />
       </div>
    </div>
    
    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
      {USER_CONFIG.name}
    </h1>
    <h2 className="text-xl md:text-2xl text-gray-400 mb-8 font-light flex items-center justify-center gap-2">
      <Briefcase size={20} className="text-vscode-accent" />
      {USER_CONFIG.title}
    </h2>
    
    <p className="max-w-xl text-gray-300 mb-10 leading-relaxed text-lg">
      {USER_CONFIG.about.summary}
    </p>


  <div className="flex flex-col sm:flex-row gap-4">
     <a 
    href="/resume_swe.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="px-8 py-3 bg-[#0e639c] hover:bg-[#1177bb] text-white rounded shadow transition-all transform hover:-translate-y-1 font-medium flex items-center gap-2"
  >
    <FileText size={18} />
    View SWE Resume
  </a>

  <a 
    href="/resume_mle.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="px-8 py-3 border border-[#3c3c3c] bg-[#252526] hover:bg-[#333333] text-white rounded transition-all transform hover:-translate-y-1 font-medium flex items-center gap-2"
  >
    <Brain size={18} />
    View MLE Resume
  </a>
  {/* <button 
    onClick={() => onNavigate('resume_swe.pdf')}
    className="px-8 py-3 bg-vscode-accent hover:bg-blue-600 text-white rounded shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1 font-medium flex items-center gap-2"
  >
    <FileText size={18} />
    View SWE Resume
  </button>

  <button 
    onClick={() => onNavigate('resume_mle.pdf')}
    className="px-8 py-3 border border-white bg-[#2a2a2a] hover:bg-[#333333] text-white rounded transition-all transform hover:-translate-y-1 font-medium flex items-center gap-2"
  >
    <Brain size={18} />
    View MLE Resume
  </button> */}
</div>
</div>
);

const ProjectsView = () => (
  <div className="p-8 max-w-6xl mx-auto">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
      <p className="text-gray-400">Scalable systems, ML pipelines, and full-stack applications.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {USER_CONFIG.projects.map((project) => (
        <div 
          key={project.id} 
          className="bg-[#252526] border border-white/5 rounded-lg p-6 hover:border-vscode-accent/50 transition-all duration-300 group hover:shadow-xl hover:shadow-black/20 flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-vscode-accent transition-colors flex items-center gap-2">
               {project.name}
            </h3>
          </div>
          
          <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map(tech => (
              <span key={tech} className="text-xs text-cyan-300 bg-cyan-950/30 px-2 py-1 rounded">
                #{tech}
              </span>
            ))}
          </div>
          
           {project.link && (
            <a 
              href={`https://${project.link}`} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 text-sm text-vscode-accent hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
            >
              <ExternalLink size={14} />
              <span>View Code</span>
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);

const EducationView = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <Section title="Education">
      <div className="space-y-6">
        {USER_CONFIG.education.map((edu, index) => (
            <div key={index} className="bg-[#252526] p-6 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{edu.school}</h3>
                    <div className="flex items-center gap-2 text-vscode-accent text-sm font-mono mt-1 md:mt-0">
                        <Calendar size={14} />
                        {edu.year}
                    </div>
                </div>
                <div className="text-lg text-gray-300 mb-2">{edu.degree}</div>
                {edu.gpa && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <Award size={14} />
                        <span>GPA: {edu.gpa}</span>
                    </div>
                )}
                <div className="text-sm text-gray-400">
                    <span className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Coursework:</span>
                    <p className="mt-1 leading-relaxed">{edu.coursework}</p>
                </div>
            </div>
        ))}
      </div>
    </Section>

    <Section title="Certificates">
        <div className="bg-[#252526] p-4 rounded-lg border border-white/5 flex items-center gap-3">
            <Award size={20} className="text-yellow-500" />
            <span className="text-gray-300">Prompt Engineering and Programming with OpenAI and LangChain from Columbia+</span>
        </div>
    </Section>
  </div>
);

const AboutView = () => (
  <div className="p-8 max-w-4xl mx-auto text-gray-300">
    <Section title="Work Experience">
        <div className="space-y-8">
            {USER_CONFIG.experience.map((job, i) => (
                <div key={i} className="relative pl-8 border-l border-white/10">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-vscode-accent"></div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                        <h3 className="text-xl font-bold text-white">{job.role}</h3>
                        <span className="text-sm text-gray-500 font-mono">{job.period}</span>
                    </div>
                    <div className="text-lg text-vscode-accent mb-4">{job.company}</div>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400">
                        {job.description.map((desc, j) => (
                            <li key={j} className="leading-relaxed">{desc}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </Section>

    <Section title="Technical Skills">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#252526] p-5 rounded-lg border border-white/5">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-blue-400">#</span> Languages & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {USER_CONFIG.skills.languages.map(s => <Badge key={s}>{s}</Badge>)}
              {USER_CONFIG.skills.frameworks.map(s => <Badge key={s}>{s}</Badge>)}
            </div>
          </div>
          
          <div className="bg-[#252526] p-5 rounded-lg border border-white/5">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-green-400">#</span> Tools & Databases
            </h3>
            <div className="flex flex-wrap gap-2">
              {USER_CONFIG.skills.databases.map(s => <Badge key={s}>{s}</Badge>)}
              {USER_CONFIG.skills.tools.map(s => <Badge key={s}>{s}</Badge>)}
            </div>
          </div>
       </div>
    </Section>
    {/* <Section title="Beyond Code">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    {USER_CONFIG.hobbies.map(hobby => (
      <div key={hobby.id} className="bg-[#252526] p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
        <img src={hobby.image} alt={hobby.name} className="w-full h-40 object-cover rounded-md mb-3" />
        <h3 className="text-white font-semibold text-lg">{hobby.name}</h3>
        <p className="text-gray-400 mt-1 text-sm">{hobby.description}</p>
      </div>
    ))}
  </div>
</Section> */}
  </div>
);

const BeyondCodeView = () => (
  <div className="p-8 max-w-6xl mx-auto text-gray-300">
    <Section title="Beyond Code">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {USER_CONFIG.hobbies.map(hobby => (
          <div
            key={hobby.id}
            className="bg-[#252526] p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <img
              src={hobby.image}
              alt={hobby.name}
              className="w-full h-46 object-cover rounded-md mb-3"
            />
            <h3 className="text-white font-semibold text-lg">{hobby.name}</h3>
            <p className="text-gray-400 mt-1 text-sm">{hobby.description}</p>
          </div>
        ))}
      </div>
    </Section>
  </div>
);


const ContactView = () => (
  <div className="h-full flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-500">
     <div className="max-w-lg w-full bg-[#252526] border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-8">
          I'm currently based in {USER_CONFIG.location}. Feel free to reach out!
        </p>

        <div className="space-y-4">
          <a 
            href={`mailto:${USER_CONFIG.email}`}
            className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</div>
              <div className="text-white font-medium">{USER_CONFIG.email}</div>
            </div>
          </a>

          <a 
            href={`https://${USER_CONFIG.social.github}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">GitHub</div>
              <div className="text-white font-medium">{USER_CONFIG.social.github}</div>
            </div>
          </a>
          
          <a 
             href={`https://${USER_CONFIG.social.linkedin}`}
             target="_blank"
             rel="noreferrer"
             className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-blue-700/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">LinkedIn</div>
              <div className="text-white font-medium">{USER_CONFIG.social.linkedin}</div>
            </div>
          </a>
        </div>
     </div>
  </div>
);

// --- Data Configuration ---

type FileType = {
  name: string;
  icon?: React.ReactNode;
  component: React.ReactNode; 
};

type TerminalMessage = {
  role: 'user' | 'system';
  content: string;
};

// --- Components ---

const SidebarItem = ({ 
  file, 
  active, 
  onClick 
}: { 
  file: FileType, 
  active: boolean, 
  onClick: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-1.5 cursor-pointer select-none text-sm transition-colors border-l-2
      ${active ? 'bg-white/5 text-white border-vscode-accent' : 'text-gray-400 hover:text-white border-transparent hover:bg-white/5'}
    `}
  >
    {getFileIcon(file.name)}
    <span>{file.name}</span>
  </div>
);

const Tab = ({ 
  file, 
  active, 
  onClick,
  onClose
}: { 
  file: FileType, 
  active: boolean, 
  onClick: () => void,
  onClose: (e: React.MouseEvent) => void
}) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 py-2 min-w-[120px] max-w-[200px] border-r border-black/20 cursor-pointer select-none text-sm group
      ${active ? 'bg-vscode-bg text-white border-t-2 border-t-vscode-accent' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#252526]'}
    `}
  >
    {getFileIcon(file.name)}
    <span className="truncate flex-1">{file.name}</span>
    <span 
      onClick={onClose}
      className={`opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded p-0.5 ${active ? 'opacity-100' : ''}`}
    >
      <X size={12} />
    </span>
  </div>
);

const Terminal = () => {
  const [history, setHistory] = useState<TerminalMessage[]>([
    { role: 'system', content: `🤖 Welcome to ${USER_CONFIG.name}'s AI Dev Terminal v2.0.0` },
    { role: 'system', content: 'Hi! I\'m your AI helper! Ask me anything about her "skills", "projects", "education", or anything else!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<any>(null); // Store AI chat session
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleMinimize = () => setIsMinimized(prev => !prev);
  
  useEffect(() => {
  if (isMinimized) {
    bottomRef.current?.parentElement?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}, [isMinimized]);

  useEffect(() => {
    // console.log("VITE_API_KEY:", import.meta.env.VITE_API_KEY); // <-- Add this

    // Initialize Gemini Chat Session
    if (import.meta.env.VITE_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: GENERATED_CONTEXT,
        }
      });
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      const userMsg = input.trim();
      setInput('');
      setHistory(prev => [...prev, { role: 'user', content: userMsg }]);
      setIsTyping(true);

      try {
        if (!chatRef.current) {
           // Fallback if key missing or init failed
           setTimeout(() => {
             setHistory(prev => [...prev, { role: 'system', content: 'Error: API_KEY not configured or connection failed.' }]);
             setIsTyping(false);
           }, 500);
           return;
        }

        // Send message to Gemini
        const result = await chatRef.current.sendMessage({ message: userMsg });
        const responseText = result.text;

        // Simulate typing effect slightly
        setTimeout(() => {
            setHistory(prev => [...prev, { role: 'system', content: responseText }]);
            setIsTyping(false);
        }, 300);

      } catch (error) {
        console.error(error);
        setHistory(prev => [...prev, { role: 'system', content: 'Error: Connection timed out or API error.' }]);
        setIsTyping(false);
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    
    <div 
      className={`flex flex-col bg-vscode-terminal text-vscode-text font-mono text-sm ai-terminal transition-all duration-300 ${
        isMinimized ? 'h-[32px]' : 'h-60'
      }`}
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 border-b border-vscode-terminalBorder gap-6 text-xs select-none uppercase tracking-wide">
        <span className="cursor-pointer border-b border-transparent hover:text-white pb-0.5">Problems</span>
        <span className="cursor-pointer border-b border-transparent hover:text-white pb-0.5">Output</span>
        <span className="cursor-pointer border-b border-transparent hover:text-white pb-0.5">Debug Console</span>
        <span className="cursor-pointer border-b border-white text-white font-bold pb-0.5 flex items-center gap-2">
          <span className="text-xs text-cyan-400 font-semibold ai-badge">AI</span>
          Terminal
        </span>
        <span className="cursor-pointer border-b border-transparent hover:text-white pb-0.5">Ports</span>
        <div className="flex-1" />
        <div className="flex gap-2">
            <button className="hover:text-white cursor-pointer px-1" 
            onClick={toggleMinimize}>
              {isMinimized ? '▢' : '_'} {/* simple indicator */}
            </button>
            {/* <Maximize2
    size={12}
    className="hover:text-white cursor-pointer"
    onClick={() => setIsMinimized(!isMinimized)}
  /> */}
  {/* <Trash2
    size={12}
    className="hover:text-white cursor-pointer"
    onClick={(e) => { e.stopPropagation(); setHistory([]); }}
  />
  <X size={12} className="hover:text-white cursor-pointer" /> */}
            {/* <Maximize2 size={12} className="hover:text-white cursor-pointer" />
            <Trash2 size={12} className="hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); setHistory([]); }} />
            <X size={12} className="hover:text-white cursor-pointer" /> */}
        </div>
      </div>

      {/* Terminal Output */}
      {!isMinimized && (

      <div className={`flex-1 overflow-y-auto p-4 space-y-1 cursor-text scrollbar-thin scrollbar-thumb-gray-600 `}
      >
        {history.map((msg, i) => (
          <div key={i} className={`${msg.role === 'user' ? 'text-white font-bold mt-2' : 'text-gray-300'}`}>
            {msg.role === 'user' ? (
              <span className="flex gap-2">
                 <span className="text-green-500">➜</span>
                 <span className="text-cyan-500">kaviiee</span>
                 <span className="text-yellow-500">git:(<span className="text-red-500">main</span>)</span>
                 <span className="text-blue-400">✗</span>
                 {msg.content}
              </span>
            ) : (
              <div className="whitespace-pre-wrap pl-0">{msg.content}</div>
            )}
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center gap-2 mt-2">
            <span className="text-green-500">➜</span>
            <span className="text-cyan-500">kaviiee</span>
            <span className="text-yellow-500">git:(<span className="text-red-500">main</span>)</span>
            <span className="text-blue-400">✗</span>
            <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-white flex-1 font-mono"
                autoFocus
                spellCheck={false}
                autoComplete="off"
            />
        </div>
        
        {isTyping && (
             <div className="text-gray-400 italic">Thinking...</div>
        )}
        <div ref={bottomRef} />
      </div>
      )}
    </div>
  );
};

const App = () => {
  const [activeFile, setActiveFile] = useState<string>('home.html');
  const [openFiles, setOpenFiles] = useState<string[]>(['home.html']);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleNavigate = (filename: string) => {
    if (!openFiles.includes(filename)) {
      setOpenFiles([...openFiles, filename]);
    }
    setActiveFile(filename);
  };

  const FILES: Record<string, FileType> = {
    'home.html': { 
        name: 'home.html', 
        //icon: <Code2 size={16} className="text-blue-400" />, 
        component: <HomeView onNavigate={handleNavigate} /> 
    },
    'about.java': { 
        name: 'about.java', 
        //icon: <Code2 size={16} className="text-purple-400" />, 
        component: <AboutView /> 
    },
    'projects.js': { 
        name: 'projects.js', 
        //icon: <Code2 size={16} className="text-yellow-400" />, 
        component: <ProjectsView /> 
    },
    'education.json': { 
        name: 'education.json', 
        //icon: <GraduationCap size={16} className="text-pink-400" />, 
        component: <EducationView /> 
    },
    'beyond-code.tsx': {
      name: 'beyond-code.tsx',
      component: <BeyondCodeView />
    },
    'contact.sql': { 
        name: 'contact.sql', 
        //icon: <Code2 size={16} className="text-blue-300" />, 
        component: <ContactView /> 
    },
  };

  const handleFileClick = (filename: string) => {
    handleNavigate(filename);
  };

  const handleTabClose = (e: React.MouseEvent, filename: string) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(f => f !== filename);
    setOpenFiles(newOpenFiles);
    if (activeFile === filename && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    } else if (newOpenFiles.length === 0) {
      setActiveFile('');
    }
  };

  const downloadProject = async () => {
    try {
        const zip = new JSZip();
        
        // Fetch current code
        const response = await fetch('/index.tsx');
        if (!response.ok) throw new Error("Could not fetch source code");
        let sourceCode = await response.text();

        // Fix imports for local usage (npm style)
        // We do NOT remove JSZip import because it's needed in the local file too. 
        // Package.json includes jszip dependency, so it works.
        sourceCode = sourceCode
            .replace(/https:\/\/esm\.sh\/react@[\d\.]+\/jsx-runtime/g, "react/jsx-runtime") 
            .replace(/https:\/\/esm\.sh\/react-dom@[\d\.]+\/client/g, "react-dom/client") 
            .replace(/https:\/\/esm\.sh\/([a-z0-9@\/\.\-]+)(\?.*)?/g, (match, p1) => {
                const parts = p1.split('@');
                return parts[0];
            })
            // IMPORTANT: JSZip import is PRESERVED.
        
        // Create package.json
        const packageJson = {
            "name": "portfolio-kavisha",
            "version": "1.0.0",
            "type": "module",
            "scripts": {
                "dev": "vite",
                "build": "vite build",
                "preview": "vite preview"
            },
            "dependencies": {
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "lucide-react": "^0.460.0",
                "@google/genai": "^1.38.0",
                "jszip": "^3.10.1" 
            },
            "devDependencies": {
                "@types/react": "^18.2.0",
                "@types/react-dom": "^18.2.0",
                "@vitejs/plugin-react": "^4.2.0",
                "vite": "^5.0.0",
                "typescript": "^5.0.0",
                "autoprefixer": "^10.4.16",
                "postcss": "^8.4.31",
                "tailwindcss": "^3.3.5"
            }
        };

        // Create index.html (Simple version using Tailwind CDN for ease of use)
        const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${USER_CONFIG.name} - Portfolio</title>
    <!-- Tailwind via CDN for simplicity in this generated kit -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              mono: ['Fira Code', 'monospace'],
            },
            colors: {
              vscode: {
                bg: '#1e1e1e',
                sidebar: '#252526',
                activityBar: '#333333',
                statusBar: '#007acc',
                tabActive: '#1e1e1e',
                tabInactive: '#2d2d2d',
                text: '#d4d4d4',
                lineNum: '#858585',
                accent: '#007acc',
                hover: '#2a2d2e',
                selection: '#264f78',
                terminal: '#1e1e1e',
                terminalBorder: '#2b2b2b'
              }
            }
          }
        }
      }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#1e1e1e] text-[#d4d4d4] m-0 overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

        // Create main.tsx
        const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

        // Create index.css (Empty or basic reset)
        const indexCss = `
body {
  margin: 0;
  background-color: #1e1e1e;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #1e1e1e;
}
::-webkit-scrollbar-thumb {
  background: #424242;
}
::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}
`;

        // README
        const readme = `# ${USER_CONFIG.name} Portfolio

## Setup

1. Install Node.js (v16+)
2. Run \`npm install\`
3. Create a \`.env\` file and add your API Key if using Gemini features:
   \`\`\`
   VITE_API_KEY=your_key_here
   \`\`\`
   (Note: You'll need to update the code to use import.meta.env.VITE_API_KEY instead of import.meta.env.VITE_API_KEY)
4. Run \`npm run dev\`

## Enjoy!
`;
        
        // Remove the root.render call from the source code so it can be an exported App component
        const appTsx = sourceCode
            .replace(/const root = createRoot\(document\.getElementById\("root"\)!\);\s*root\.render\(<App \/>\);/, "export default App;")
            .replace(/process\.env\.API_KEY/g, "import.meta.env.VITE_API_KEY");

        zip.file("package.json", JSON.stringify(packageJson, null, 2));
        zip.file("index.html", indexHtml);
        zip.file("vite.config.ts", "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})");
        zip.file("README.md", readme);
        zip.folder("src")!.file("main.tsx", mainTsx);
        zip.folder("src")!.file("App.tsx", appTsx);
        zip.folder("src")!.file("index.css", indexCss);

        const content = await zip.generateAsync({ type: "blob" });
        
        // Trigger download
        const url = window.URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "portfolio-source.zip";
        a.click();
        window.URL.revokeObjectURL(url);

    } catch (e) {
        console.error("Download failed", e);
        alert("Failed to generate zip. Please copy the code manually.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-vscode-bg text-vscode-text overflow-hidden font-sans">
      
      {/* Top Title Bar */}
      <div className="h-8 bg-vscode-activityBar flex items-center justify-between px-4 text-xs select-none border-b border-black/20">
        <div className="flex gap-4">
            <span className="font-bold">Visual Studio Code</span>
            <span className="hidden md:inline">File</span>
            <span className="hidden md:inline">Edit</span>
            <span className="hidden md:inline">View</span>
            <span className="hidden md:inline">Go</span>
            <span className="hidden md:inline">Run</span>
            <span className="hidden md:inline">Terminal</span>
            <span className="hidden md:inline">Help</span>
        </div>
        <div className="opacity-50">{USER_CONFIG.name}Dev - Portfolio</div>
        <div className="flex items-center">
             <button 
                onClick={downloadProject}
                className="flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded transition-colors text-vscode-accent"
                title="Download Project Source"
             >
                <Download size={14} />
                <span className="hidden sm:inline">Download Source</span>
             </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Activity Bar */}
        <div className="w-12 bg-vscode-activityBar flex flex-col items-center py-2 justify-between flex-shrink-0 z-20">
            <div className="flex flex-col gap-4">
                <div className="p-2 cursor-pointer border-l-2 border-white opacity-100"><Files size={24} color="white" /></div>
                <div className="p-2 cursor-pointer border-l-2 border-transparent opacity-50 hover:opacity-100"><Search size={24} color="white" /></div>
                <div className="p-2 cursor-pointer border-l-2 border-transparent opacity-50 hover:opacity-100"><GitGraph size={24} color="white" /></div>
                <div className="p-2 cursor-pointer border-l-2 border-transparent opacity-50 hover:opacity-100"><Bug size={24} color="white" /></div>
            </div>
            <div className="flex flex-col gap-4 mb-2">
                <div className="p-2 cursor-pointer opacity-50 hover:opacity-100"><Settings size={24} color="white" /></div>
            </div>
        </div>

        {/* Sidebar (Explorer) */}
        {isSidebarOpen && (
          <div className="w-64 bg-vscode-sidebar flex flex-col border-r border-black/20 flex-shrink-0 hidden md:flex">
            <div className="h-9 px-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-vscode-text/60">
                <span>Explorer</span>
                <div className="flex gap-1">
                    <MoreVertical size={16} />
                </div>
            </div>
            
            {/* Project Folder */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-2 py-1 flex items-center gap-1 font-bold text-xs cursor-pointer hover:bg-vscode-hover text-white">
                    <ChevronDown size={14} />
                    <span>PORTFOLIO</span>
                </div>
                <div className="flex flex-col">
                    {Object.keys(FILES).map(fileName => (
                        <SidebarItem 
                            key={fileName}
                            file={FILES[fileName]} 
                            active={activeFile === fileName} 
                            onClick={() => handleFileClick(fileName)}
                        />
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* Vertical Split: Editor Top, Terminal Bottom */}
        <div className="flex-1 flex flex-col bg-vscode-bg overflow-hidden relative">
            
            {/* Editor Area */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Tabs */}
                <div className="flex bg-vscode-activityBar overflow-x-auto scrollbar-hide flex-shrink-0 border-b border-black/20">
                    {openFiles.map(fileName => (
                        <Tab 
                            key={fileName}
                            file={FILES[fileName]} 
                            active={activeFile === fileName} 
                            onClick={() => setActiveFile(fileName)}
                            onClose={(e) => handleTabClose(e, fileName)}
                        />
                    ))}
                </div>

                {/* Breadcrumbs */}
                <div className="h-6 flex items-center px-4 bg-vscode-bg text-xs text-white/50 gap-2 flex-shrink-0">
                    <span>portfolio</span>
                    <ChevronRight size={12} />
                    <span>src</span>
                    <ChevronRight size={12} />
                    {activeFile && (
                        <span className="flex items-center gap-1 text-white">
                            {FILES[activeFile].icon}
                            {activeFile}
                        </span>
                    )}
                </div>

                {/* Main Content (Preview Area) */}
                <div className="flex-1 overflow-auto relative scrollbar-thin scrollbar-thumb-vscode-activityBar scrollbar-track-transparent">
                    {activeFile ? (
                        <div className="min-h-full pb-4 animate-in fade-in duration-300">
                            {FILES[activeFile].component}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-white/20">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                               <Code2 size={48} className="opacity-50" />
                            </div>
                            <p className="font-medium">Select a file to view</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Terminal Area - Fixed height at bottom */}
            <Terminal />
            {/* <div className="h-60 border-t border-vscode-terminalBorder flex-shrink-0">
                <Terminal />
            </div> */}

        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-vscode-statusBar text-white flex items-center justify-between px-3 text-xs select-none z-30">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 hover:bg-white/20 px-1 h-full cursor-pointer">
                <GitGraph size={12} />
                <span>main*</span>
            </div>
            <div className="flex items-center gap-1 hover:bg-white/20 px-1 h-full cursor-pointer">
                <Circle size={10} fill="white" className="mr-1" />
                <span>0 errors</span>
                <span>0 warnings</span>
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="hover:bg-white/20 px-1 cursor-pointer">Prettier</div>
            <div className="hover:bg-white/20 px-1 cursor-pointer">TypeScript React</div>
            <div className="hover:bg-white/20 px-1 cursor-pointer"><Bug size={12} /></div>
        </div>
      </div>

    </div>
  );
};

export default App;