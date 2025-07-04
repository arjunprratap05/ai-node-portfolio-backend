const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GOOGLE_API_KEY) {
    console.error("CRITICAL: GOOGLE_API_KEY environment variable is not set. Gemini API calls will fail.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 

const arjunKnowledgeBase = `
  Arjun's full name is Arjun Pratap. He is a Problem-solving-oriented Full Stack Developer with 3+ years of experience transforming business challenges into effective, scalable software solutions. He is familiar with ASP.NET and experienced in modern frontend and backend frameworks including ReactJS, Node.js, and REST APIs. He is skilled in using Docker, GitHub Actions, and AWS for cloud-native deployment. Arjun is adept at applying AI tools like ChatGPT, GitHub Copilot, and TensorFlow Lite for productivity, intelligent automation, and rapid development. His contact number is +91-9820903458 and email is arjun.pratap05@gmail.com. He can be found on LinkedIn, GitHub, and mentions a Portfolio.

Professional Summary Highlights:

Replaced time-consuming manual data entry with automated Excel upload capability.

Improved deployment reliability with multi-stage testing pipelines across environments.

Enhanced user experience by integrating smart referral workflows and precise filtering options.

Developed a dynamic blogging system enabling real-time publishing and editing.

Employed AI copilots and prompt engineering to streamline development and debugging.

Experience:

Software Developer at NIIT Ltd, Gurugram, India (Sep 2022 - Present):

Developed an Excel bulk upload system using ASP.NET, streamlining data input and significantly reducing effort.

Created reusable modules for automation tools, reducing redundant work for the team.

Leveraged GitHub Copilot to accelerate development of repetitive logic and components.

Used AI tools to generate test cases and improve test coverage and confidence.

Collaborated with cross-functional teams to resolve production incidents with minimal delay.

Technical Skills:

Languages/Frameworks: ASP.NET (Familiar), REST APIs, JavaScript, React.JS, NodeJS, VueJS, Java, Python, PHP.

Cloud & DevOps: Docker, Kubernetes, Git, GitHub Actions, Apache, Nginx, AWS (EC2, S3), Firebase, Appwrite.

AI/ML Tools: TensorFlow Lite, GitHub Copilot, ChatGPT, Prompt Engineering, OCR Integration.

Data Tools: SQL Server, PostgreSQL, MySQL, MongoDB, PowerBI.

Soft Skills: Root-Cause Analysis, Agile Methodology, Team Leadership, Communication.

Projects:

GitHub Profile Detective (ReactJS, Node.js, Vite, CSS, JavaScript, Asp.Net Core, Vercel, AWS) - Sep 2022 - Present: Developed a web application to search and display GitHub user profiles, providing insights into their activity. (Further features for Instagram planned).

Portfolio Website (ReactJS, Node.js, Vite, CSS, Google GenerativeAI, JavaScript, Vercel) - Feb 2025 - June 2025: Created a responsive developer portfolio featuring downloadable CV, API-integrated contact form, and live social links. Used AI prompts to enhance UX writing and developer content.

Discount Page Optimization (ASP.NET, SQL, JavaScript) - Jul 2024 - Jan 2025: Integrated referral logic and course-based filtering to improve usability of the coupon experience.

Mega Blog Clone (ReactJS, Vite, Appwrite, Vercel) - Feb 2024 - Jul 2024: Built a modular blogging platform with AI-assisted formatting and content publishing.

Task Tracker App (ReactJS, Vite) - Jan 2024 - Jul 2024: Designed a Kanban-style web app to manage team tasks with status tracking and filtering features.

Image Upload Tool (ASP.NET Core, Web API, JavaScript) - Jan 2023 - May 2023: Created a secure upload flow with validation and real-time previews for customer images.

Excel Export Feature (ASP.NET Core, Web API) - Jun 2022 - Dec 2022: Built downloadable Excel reports with filtering options by date and type for operational efficiency.

Manuscript OCR App (Android, TensorFlow Lite) - Sep 2021 - May 2022: Enabled real-time handwritten text recognition, offline use, and text-to-speech for accessibility.

QR Inventory System (Web, Android) - Feb 2021 - Aug 2021: Developed a cross-platform QR-based system for inventory tracking and stock status updates.

Education:

Ramrao Adik Institute of Technology, Mumbai University: B.Tech in Computer Engineering (2018-2022), CGPA: 7.30/10.

SRP College, Bihar School Examination Board (BSEB): Senior Secondary (XII) (2017).

Delhi Public School, Patna, Central Board (CBSE): Secondary (X) (2015).

Certifications:

AWS Certified Solutions Architect Associate (In Progress).

RDBMS Essentials & T-SQL View Certificate.

Programming in Java View Certificate.

Android Development (NIIT) - View Certificate.

DSA with Java (NPTEL) View Certificate.

Object-Oriented C++ View Certificate.
`;


async function getGeminiResponse(userMessage) {
    if (!process.env.GOOGLE_API_KEY) {
        throw new Error('Google AI API Key is missing. Cannot communicate with Gemini.');
    }

    try {
        const fullPrompt = `
            You are Arjun AI, a helpful assistant designed to provide information about Arjun.
            Answer the following questions about Arjun based SOLELY on the context provided below.
            If you cannot find the answer within the provided context about Arjun, state that you don't have enough information about Arjun to answer the question, or ask the user to provide more details about what they are looking for regarding Arjun.
            Do NOT use your general knowledge to answer questions about Arjun.

            --- Context about Arjun ---
            ${arjunKnowledgeBase}
            --- End of Context ---

            User's Question: ${userMessage}

            Arjun AI's Answer:
        `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text(); 
        
        return text; 

    } catch (error) {
        console.error("Error in geminiService.getGeminiResponse:", error.message);
        throw new Error(`Failed to get response from Google AI: ${error.message}. Please ensure your API key is valid, the model is correct, and there's a stable network connection.`);
    }
}

module.exports = {
    getGeminiResponse
};