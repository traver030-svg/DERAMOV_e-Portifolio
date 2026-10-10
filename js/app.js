
"use strict";

// 1. Read and display the profile
const profile = portfolioData.profile;

document.getElementById("profile-name").textContent = profile.name;
document.getElementById("profile-title").textContent = profile.title;
document.getElementById("profile-tagline").textContent = profile.tagline;


// 2. Display projects
const projectsContainer = document.getElementById("projects-container");

portfolioData.projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const category = document.createElement("p");
    category.textContent = project.category;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("p");
    technologies.textContent = "Technologies: " + project.technologies.join(", ");

    const status = document.createElement("p");
    status.textContent = "Status: " + project.status;

    card.append(title, category, description, technologies, status);
    projectsContainer.appendChild(card);
});


// 3. Display skills
const skillsContainer = document.getElementById("skills-container");

portfolioData.skills.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const name = document.createElement("h3");
    name.textContent = skill.name;

    const category = document.createElement("p");
    category.textContent = skill.category;

    const level = document.createElement("p");
    level.textContent = "Level: " + skill.level;

    card.append(name, category, level);
    skillsContainer.appendChild(card);
});


// 4. Display achievements
const achievementsContainer = document.getElementById("achievements-container");

portfolioData.achievements.forEach((achievement) => {
    const card = document.createElement("article");
    card.className = "achievement-card";

    const title = document.createElement("h3");
    title.textContent = achievement.title;

    const description = document.createElement("p");
    description.textContent = achievement.description;

    const year = document.createElement("p");
    year.textContent = "Year: " + achievement.year;

    card.append(title, description, year);
    achievementsContainer.appendChild(card);
});