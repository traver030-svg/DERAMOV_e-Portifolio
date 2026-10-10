
"use strict";

// Temporary working copy of the portfolio data.
// Persistent storage will be added in a later stage.
let projects = portfolioData.projects.map((project) => ({
    ...project,
    technologies: [...project.technologies]
}));

// References to dashboard elements
const projectForm = document.getElementById("project-form");
const projectsContainer = document.getElementById("admin-projects");
const formMessage = document.getElementById("form-message");

const totalProjects = document.getElementById("total-projects");
const totalSkills = document.getElementById("total-skills");
const totalAchievements = document.getElementById("total-achievements");

// Render dashboard statistics
function renderStatistics() {
    totalProjects.textContent = projects.length;
    totalSkills.textContent = portfolioData.skills.length;
    totalAchievements.textContent = portfolioData.achievements.length;
}

// Render the project inventory
function renderProjects() {
    projectsContainer.replaceChildren();

    if (projects.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No projects have been added yet.";
        projectsContainer.appendChild(emptyMessage);
        return;
    }

    projects.forEach((project) => {
        const row = document.createElement("article");
        row.className = "project-row";

        const title = document.createElement("h3");
        title.textContent = project.title;

        const category = document.createElement("p");
        category.textContent = project.category;

        const description = document.createElement("p");
        description.textContent = project.description;

        const technologies = document.createElement("p");
        technologies.textContent =
            "Technologies: " + project.technologies.join(", ");

        const status = document.createElement("p");
        status.textContent = "Status: " + project.status;

        row.append(title, category, description, technologies, status);
        projectsContainer.appendChild(row);
    });
}

// Add a new project using the form
projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("project-title").value.trim();
    const category = document.getElementById("project-category").value.trim();
    const description = document.getElementById("project-description").value.trim();

    const technologies = document
        .getElementById("project-technologies")
        .value
        .split(",")
        .map((technology) => technology.trim())
        .filter((technology) => technology.length > 0);

    const status = document.getElementById("project-status").value;

    if (!title || !category || !description || technologies.length === 0) {
        formMessage.textContent =
            "Please complete all fields and enter at least one technology.";
        return;
    }

    const newProject = {
        id: Date.now(),
        title,
        category,
        description,
        technologies,
        image: "",
        status
    };

    projects.push(newProject);

    renderProjects();
    renderStatistics();

    formMessage.textContent = `"${title}" added to the test inventory.`;

    projectForm.reset();
});

// Initial dashboard rendering
renderProjects();
renderStatistics();