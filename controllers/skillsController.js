const Skill = require('../models/Skill');

async function getSkills(req, res) {
  try {
    const skills = await Skill.find({});
    
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    const formattedResponse = Object.keys(groupedSkills).map(categoryTitle => ({
      title: categoryTitle,
      skills: groupedSkills[categoryTitle].map(skill => ({
        name: skill.name,
        
        logo: skill.logo, 
        percentage: skill.percentage,
        topics: skill.topics, 
      })),
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error fetching skills from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch skills data.' });
  }
}

async function seedSkillsData(req, res) {
  const initialSkills = [
    
    { name: 'HTML', logo: '/assets/tech_logo/html.png', percentage: 95, category: 'Frontend', topics: ['Forms', 'Accessibility', 'Semantic HTML5'] },
    { name: 'CSS', logo: '/assets/tech_logo/css.png', percentage: 90, category: 'Frontend', topics: ['Flexbox', 'Grid', 'Animations'] },
    { name: 'Sass', logo: '/assets/tech_logo/sass.png', percentage: 85, category: 'Frontend', topics: ['Variables', 'Mixins', 'Partials'] },
    { name: 'JavaScript', logo: '/assets/tech_logo/javascript.png', percentage: 85, category: 'Frontend', topics: ['ES6+', 'Promises', 'Async/Await'] },
    { name: 'React JS', logo: '/assets/tech_logo/reactjs.png', percentage: 88, category: 'Frontend', topics: ['Hooks', 'Context API', 'Routing'] },
    { name: 'Redux', logo: '/assets/tech_logo/redux.png', percentage: 80, category: 'Frontend', topics: ['State Management', 'Actions', 'Reducers'] },
    { name: 'Tailwind CSS', logo: '/assets/tech_logo/tailwindcss.png', percentage: 82, category: 'Frontend', topics: ['Utility-first CSS', 'Customization', 'Responsive Design'] },
    { name: 'Material UI', logo: '/assets/tech_logo/materialui.png', percentage: 75, category: 'Frontend', topics: ['Components', 'Styling', 'Theming'] },
    { name: 'Bootstrap', logo: '/assets/tech_logo/bootstrap.png', percentage: 70, category: 'Frontend', topics: ['Grid System', 'Components', 'Utilities'] },
    { name: 'Angular', logo: '/assets/tech_logo/angular.png', percentage: 70, category: 'Frontend', topics: ['Components', 'Modules', 'Services'] },
    { name: 'Next JS', logo: '/assets/tech_logo/nextjs.png', percentage: 70, category: 'Frontend', topics: ['Server-side Rendering', 'Routing', 'API Routes'] },
    { name: 'TypeScript', logo: '/assets/tech_logo/typescript.png', percentage: 70, category: 'Frontend', topics: ['Static Typing', 'Interfaces', 'Generics'] }, 
    
    
    { name: 'Node JS', logo: '/assets/tech_logo/nodejs.png', percentage: 78, category: 'Backend', topics: ['Express.js', 'Middleware', 'REST APIs'] },
    { name: 'Express JS', logo: '/assets/tech_logo/express.png', percentage: 75, category: 'Backend', topics: ['Routing', 'Middleware', 'Templating'] },
    { name: 'MySQL', logo: '/assets/tech_logo/mysql.png', percentage: 70, category: 'Backend', topics: ['Schemas', 'Queries', 'Database Design'] },
    { name: 'MongoDB', logo: '/assets/tech_logo/mongodb.png', percentage: 65, category: 'Backend', topics: ['Schemas', 'Queries', 'Aggregation'] },
    { name: 'Firebase', logo: '/assets/tech_logo/firebase.png', percentage: 60, category: 'Backend', topics: ['Authentication', 'Firestore', 'Functions'] },
    { name: 'PostgreSQL', logo: '/assets/tech_logo/postgre.png', percentage: 68, category: 'Backend', topics: ['Queries', 'Transactions', 'Normalization'] },
    { name: 'Spring Boot', logo: '/assets/tech_logo/springboot.png', percentage: 70, category: 'Backend', topics: ['REST Controllers', 'Dependency Injection'] },
    
    
    { name: 'C', logo: '/assets/tech_logo/c.png', percentage: 60, category: 'Languages', topics: ['Pointers', 'Memory Management'] },
    { name: 'C++', logo: '/assets/tech_logo/cpp.png', percentage: 65, category: 'Languages', topics: ['OOP', 'STL'] },
    { name: 'Java', logo: '/assets/tech_logo/java.png', percentage: 70, category: 'Languages', topics: ['OOP', 'Collections', 'Spring'] },
    { name: 'Python', logo: '/assets/tech_logo/python.png', percentage: 80, category: 'Languages', topics: ['Flask', 'Django', 'Data Science'] },
    { name: 'C-Sharp', logo: '/assets/tech_logo/csharp.png', percentage: 55, category: 'Languages', topics: ['OOP', '.NET'] },
    { name: 'Asp.net', logo: '/assets/tech_logo/aspnet.png', percentage: 70, category: 'Languages', topics: ['MVC', 'Web Forms'] },
    { name: 'Asp.net Core', logo: '/assets/tech_logo/aspnetcore.png', percentage: 70, category: 'Languages', topics: ['MVC', 'Razor Pages', 'API'] },
    
    
    { name: 'Git', logo: '/assets/tech_logo/git.png', percentage: 90, category: 'Tools', topics: ['Commits', 'Branches', 'Merging'] },
    { name: 'GitHub', logo: '/assets/tech_logo/github.png', percentage: 85, category: 'Tools', topics: ['Repositories', 'PRs', 'Actions'] },
    { name: 'VS Code', logo: '/assets/tech_logo/vscode.png', percentage: 95, category: 'Tools', topics: ['Extensions', 'Debugging'] },
    { name: 'Postman', logo: '/assets/tech_logo/postman.png', percentage: 80, category: 'Tools', topics: ['API Testing', 'Collections'] },
    { name: 'Compass', logo: '/assets/tech_logo/mc.png', percentage: 70, category: 'Tools', topics: ['UI Management'] },
    { name: 'Vercel', logo: '/assets/tech_logo/vercel.png', percentage: 75, category: 'Tools', topics: ['Deployments', 'CI/CD'] },
    { name: 'Netlify', logo: '/assets/tech_logo/netlify.png', percentage: 72, category: 'Tools', topics: ['Deployments', 'Serverless Functions'] },
    { name: 'Cursor', logo: '/assets/tech_logo/cursor.png', percentage: 80, category: 'Tools', topics: ['AI-powered coding'] },
    { name: 'Docker', logo: '/assets/tech_logo/docker.png', percentage: 70, category: 'Tools', topics: ['Containers', 'Images'] },
    { name: 'AWS', logo: '/assets/tech_logo/aws.png', percentage: 70, category: 'Tools', topics: ['S3', 'EC2'] },
    { name: 'Kubernetes', logo: '/assets/tech_logo/kubernetes.png', percentage: 70, category: 'Tools', topics: ['Pods', 'Deployments'] },
    { name: 'Jira', logo: '/assets/tech_logo/jira.png', percentage: 70, category: 'Tools', topics: ['Boards', 'Tickets'] },
  ];

  try {
    await Skill.deleteMany({}); 
    await Skill.insertMany(initialSkills);
    res.status(200).json({ message: 'Skills data seeded successfully!' });
  } catch (error) {
    console.error('Error seeding skills data:', error);
    res.status(500).json({ error: 'Failed to seed skills data.' });
  }
}

module.exports = {
  getSkills,
  seedSkillsData,
};