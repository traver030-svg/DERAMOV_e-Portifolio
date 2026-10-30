
const portfolioData = {
    profile: {
        name: "TRAVER DERA",
        title: "Aspiring Mechanical Engineer | Smart Manufacturing & Automation",
        tagline: "Exploring mechanical design, intelligent systems, automation and emerging technologies.",
        location: "Faridabad,Haryana-India"
    },

    projects: [
        {
            id: 1,
            title: "Project Alpha",
            category: "Mechanical Design",
            description: "A dummy project used to test the portfolio system.",
            technologies: ["SolidWorks", "CAD"],
            image: "",
            status: "Prototype"
        },
        {
            id: 2,
            title: "Project Beta",
            category: "Artificial Intelligence",
            description: "A test project for data-driven engineering.",
            technologies: ["Python", "Machine Learning"],
            image: "",
            status: "In Progress"
        }
    ],

    skills: [
        {
            id: 1,
            name: "Computer-Aided Design",
            category: "Mechanical Engineering",
            level: "Intermediate"
        },
        {
            id: 2,
            name: "Python Programming",
            category: "Software",
            level: "Beginner"
        }
    ],

    achievements: [
        {
            id: 1,
            title: "Achievement Alpha",
            description: "A dummy achievement for testing.",
            year: 2026
        }
    ]
};

const PORTFOLIO_STORAGE_KEY = "ePortfolioProjects";

function getProjects() {
    const savedProjects = localStorage.getItem(PORTFOLIO_STORAGE_KEY);

    if (savedProjects !== null) {
        try {
            const parsedProjects = JSON.parse(savedProjects);

            if (Array.isArray(parsedProjects)) {
                return parsedProjects;
            }
        } catch (error) {
            console.error("Could not read saved projects:", error);
        }
    }

    return portfolioData.projects.map((project) => ({
        ...project,
        technologies: [...project.technologies]
    }));
}

function saveProjects(projects) {
    localStorage.setItem(
        PORTFOLIO_STORAGE_KEY,
        JSON.stringify(projects)
    );
}

const PORTFOLIO_SKILLS_KEY = "ePortfolioSkills";
const PORTFOLIO_ACHIEVEMENTS_KEY = "ePortfolioAchievements";

function getSkills() {
    const saved = localStorage.getItem(PORTFOLIO_SKILLS_KEY);

    if (saved !== null) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        } catch (error) {
            console.error("Could not read saved skills:", error);
        }
    }

    return portfolioData.skills.map(skill => ({ ...skill }));
}

function saveSkills(skills) {
    localStorage.setItem(PORTFOLIO_SKILLS_KEY, JSON.stringify(skills));
}

function getAchievements() {
    const saved = localStorage.getItem(PORTFOLIO_ACHIEVEMENTS_KEY);

    if (saved !== null) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        } catch (error) {
            console.error("Could not read saved achievements:", error);
        }
    }

    return portfolioData.achievements.map(achievement => ({
        ...achievement
    }));
}

function saveAchievements(achievements) {
    localStorage.setItem(
        PORTFOLIO_ACHIEVEMENTS_KEY,
        JSON.stringify(achievements)
    );
}


/* PROFILE STORAGE */
const PORTFOLIO_PROFILE_KEY = "ePortfolioProfile";

function getProfile() {
    const saved = localStorage.getItem(PORTFOLIO_PROFILE_KEY);

    if (saved !== null) {
        try {
            const parsed = JSON.parse(saved);

            if (
                parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed) &&
                typeof parsed.name === "string" &&
                typeof parsed.title === "string" &&
                typeof parsed.tagline === "string" &&
                typeof parsed.location === "string"
            ) {
                return parsed;
            }
        } catch (error) {
            console.error("Could not read saved profile:", error);
        }
    }

    return { ...portfolioData.profile };
}

function saveProfile(profile) {
    localStorage.setItem(
        PORTFOLIO_PROFILE_KEY,
        JSON.stringify(profile)
    );
}
