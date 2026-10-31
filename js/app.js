

"use strict";

// 1. Read and display the profile from Supabase

async function loadPublicProfile() {
    try {
        const { data: profile, error } = await window.portfolioSupabase
            .from("profiles")
            .select("name, title, tagline")
            .eq("id", true)
            .single();

        if (error) {
            throw error;
        }

        document.getElementById("profile-name").textContent = profile.name;
        document.getElementById("profile-title").textContent = profile.title;
        document.getElementById("profile-tagline").textContent = profile.tagline;

    } catch (error) {
        console.error("Public profile loading failed:", error);

        // Use existing local data as a fallback
        const profile = getProfile();

        document.getElementById("profile-name").textContent = profile.name;
        document.getElementById("profile-title").textContent = profile.title;
        document.getElementById("profile-tagline").textContent = profile.tagline;
    }
}

loadPublicProfile();

// 2. Display projects
const projectsContainer = document.getElementById("projects-container");

getProjects().forEach((project) => {
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

getSkills().forEach((skill) => {
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

getAchievements().forEach((achievement) => {
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