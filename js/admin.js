

"use strict";

// ============================================
// 1. LOAD SAVED PORTFOLIO DATA
// ============================================

let projects = getProjects();
let skills = getSkills();
let achievements = getAchievements();
let editingSkillId = null;
let editingAchievementId = null;
let editingProjectId = null;

// ============================================
// 2. CONNECT HTML ELEMENTS
// ============================================

const projectForm = document.getElementById("project-form");
const skillForm = document.getElementById("skill-form");
const achievementForm = document.getElementById("achievement-form");

const projectsContainer = document.getElementById("admin-projects");
const skillsContainer = document.getElementById("admin-skills");
const achievementsContainer = document.getElementById("admin-achievements");

const formMessage = document.getElementById("form-message");
const skillMessage = document.getElementById("skill-message");
const achievementMessage = document.getElementById("achievement-message");

const totalProjects = document.getElementById("total-projects");
const totalSkills = document.getElementById("total-skills");
const totalAchievements = document.getElementById("total-achievements");

const cancelProjectEdit = document.getElementById("cancel-project-edit");
const cancelSkillEdit = document.getElementById("cancel-skill-edit");
const cancelAchievementEdit = document.getElementById("cancel-achievement-edit");
// ============================================
// 3. DASHBOARD STATISTICS
// ============================================

function renderStatistics() {
    totalProjects.textContent = projects.length;
    totalSkills.textContent = skills.length;
    totalAchievements.textContent = achievements.length;
}

// ============================================
// 4. PROJECT INVENTORY
// ============================================


function renderProjects() {
    projectsContainer.replaceChildren();

    if (projects.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No projects added yet.";
        projectsContainer.appendChild(message);
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

        
const editButton = document.createElement("button");
editButton.type = "button";
editButton.textContent = "Edit";
editButton.className = "edit-button";

editButton.addEventListener("click", () => {
    document.getElementById("project-title").value =
        project.title;

    document.getElementById("project-category").value =
        project.category;

    document.getElementById("project-description").value =
        project.description;

    document.getElementById("project-technologies").value =
        project.technologies.join(", ");

    document.getElementById("project-status").value =
        project.status;

    editingProjectId = project.id;
    cancelProjectEdit.hidden = false;

    const submitButton = projectForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Update Project";
    }

    formMessage.textContent =
        `Editing "${project.title}". Change the fields and submit to save.`;

    projectForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm(
                `Delete project "${project.title}"?`
            );

            if (!confirmed) return;

            projects = projects.filter(
                (item) => item.id !== project.id
            );

            saveProjects(projects);
            renderProjects();
            renderStatistics();
        });

        row.append(
    title,
    category,
    description,
    technologies,
    status,
    editButton,
    deleteButton
);

        projectsContainer.appendChild(row);
    });
}


// ============================================
// 5. SKILLS INVENTORY
// ============================================


function renderSkills() {
    skillsContainer.replaceChildren();

    if (skills.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No skills added yet.";
        skillsContainer.appendChild(message);
        return;
    }

    skills.forEach((skill) => {
        const row = document.createElement("article");
        row.className = "project-row";

        const name = document.createElement("h3");
        name.textContent = skill.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + skill.category;

        const level = document.createElement("p");
        level.textContent = "Proficiency: " + skill.level;

        
const editButton = document.createElement("button");
editButton.type = "button";
editButton.textContent = "Edit";
editButton.className = "edit-button";

editButton.addEventListener("click", () => {
    document.getElementById("skill-name").value = skill.name;
    document.getElementById("skill-category").value = skill.category;
    document.getElementById("skill-level").value = skill.level;

    // Remember which existing skill is being edited.
    editingSkillId = skill.id;
    cancelSkillEdit.hidden = false;

    const submitButton = skillForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Update Skill";
    }

    skillMessage.textContent = `Editing "${skill.name}". Change the fields and submit to save.`;

    skillForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});
const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm(
                `Delete skill "${skill.name}"?`
            );

            if (!confirmed) return;

            skills = skills.filter(
                (item) => item.id !== skill.id
            );

            saveSkills(skills);
            renderSkills();
            renderStatistics();
        });

        row.append(name, category, level, editButton, deleteButton);
        skillsContainer.appendChild(row);
    });
}


// ============================================
// 6. ACHIEVEMENTS INVENTORY
// ============================================


function renderAchievements() {
    achievementsContainer.replaceChildren();

    if (achievements.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No achievements added yet.";
        achievementsContainer.appendChild(message);
        return;
    }

    achievements.forEach((achievement) => {
        const row = document.createElement("article");
        row.className = "project-row";

        const title = document.createElement("h3");
        title.textContent = achievement.title;

        const description = document.createElement("p");
        description.textContent = achievement.description;

        const year = document.createElement("p");
        year.textContent = "Year: " + achievement.year;

        
const editButton = document.createElement("button");
editButton.type = "button";
editButton.textContent = "Edit";
editButton.className = "edit-button";

editButton.addEventListener("click", () => {
    document.getElementById("achievement-title").value =
        achievement.title;

    document.getElementById("achievement-year").value =
        achievement.year;

    document.getElementById("achievement-description").value =
        achievement.description;

    editingAchievementId = achievement.id;
    cancelAchievementEdit.hidden = false;

    const submitButton = achievementForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Update Achievement";
    }

    achievementMessage.textContent =
        `Editing "${achievement.title}". Change the fields and submit to save.`;

    achievementForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm(
                `Delete achievement "${achievement.title}"?`
            );

            if (!confirmed) return;

            achievements = achievements.filter(
                (item) => item.id !== achievement.id
            );

            saveAchievements(achievements);
            renderAchievements();
            renderStatistics();
        });

        row.append(title, description, year, editButton, deleteButton);
        achievementsContainer.appendChild(row);
    });
}


// ============================================
// 7. ADD A PROJECT
// ============================================


projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document
        .getElementById("project-title").value.trim();

    const category = document
        .getElementById("project-category").value.trim();

    const description = document
        .getElementById("project-description").value.trim();

    const technologies = document
        .getElementById("project-technologies")
        .value
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);

    const status = document.getElementById("project-status").value;

    if (!title || !category || !description || technologies.length === 0) {
        formMessage.textContent =
            "Complete all fields and enter at least one technology.";
        return;
    }

    if (editingProjectId !== null) {
        const index = projects.findIndex(
            (project) => project.id === editingProjectId
        );

        if (index === -1) {
            formMessage.textContent =
                "Could not find the project to update. Please select Edit again.";
            editingProjectId = null;
            return;
        }

        projects[index] = {
            ...projects[index],
            title,
            category,
            description,
            technologies,
            status
        };

        saveProjects(projects);
        formMessage.textContent =
            `Project "${title}" updated successfully.`;
    } else {
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
        saveProjects(projects);
        formMessage.textContent =
            `Project "${title}" added successfully.`;
    }

    editingProjectId = null;
    projectForm.reset();

    const submitButton = projectForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Add Project";
    }

    renderProjects();
    renderStatistics();
});

// ============================================
// 8. ADD A SKILL
// ============================================


skillForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("skill-name").value.trim();
    const category = document.getElementById("skill-category").value.trim();
    const level = document.getElementById("skill-level").value;

    if (!name || !category) {
        skillMessage.textContent = "Please complete all skill fields.";
        return;
    }

    if (editingSkillId !== null) {
        // Update the existing skill instead of creating a duplicate.
        const index = skills.findIndex(
            (skill) => skill.id === editingSkillId
        );

        if (index === -1) {
            skillMessage.textContent =
                "Could not find the skill to update. Please select Edit again.";
            editingSkillId = null;
            return;
        }

        skills[index] = {
            ...skills[index],
            name,
            category,
            level
        };

        saveSkills(skills);
        skillMessage.textContent = `Skill "${name}" updated successfully.`;
    } else {
        // Normal Add Skill behaviour.
        const newSkill = {
            id: Date.now(),
            name,
            category,
            level
        };

        skills.push(newSkill);
        saveSkills(skills);
        skillMessage.textContent = `Skill "${name}" added successfully.`;
    }

    editingSkillId = null;
    skillForm.reset();

    const submitButton = skillForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Add Skill";
    }

    renderSkills();
    renderStatistics();
});

// ============================================
// 9. ADD AN ACHIEVEMENT
// ============================================


achievementForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document
        .getElementById("achievement-title")
        .value.trim();

    const description = document
        .getElementById("achievement-description")
        .value.trim();

    const year = Number(
        document.getElementById("achievement-year").value
    );

    if (
        !title ||
        !description ||
        !Number.isInteger(year) ||
        year < 1900 ||
        year > 2100
    ) {
        achievementMessage.textContent =
            "Enter a title, description, and valid year.";
        return;
    }

    if (editingAchievementId !== null) {
        // Update the existing achievement.
        const index = achievements.findIndex(
            (item) => item.id === editingAchievementId
        );

        if (index === -1) {
            achievementMessage.textContent =
                "Could not find the achievement to update. Please select Edit again.";
            editingAchievementId = null;
            return;
        }

        achievements[index] = {
            ...achievements[index],
            title,
            description,
            year
        };

        saveAchievements(achievements);

        achievementMessage.textContent =
            `Achievement "${title}" updated successfully.`;
    } else {
        // Normal Add Achievement behaviour.
        const newAchievement = {
            id: Date.now(),
            title,
            description,
            year
        };

        achievements.push(newAchievement);
        saveAchievements(achievements);

        achievementMessage.textContent =
            `Achievement "${title}" added successfully.`;
    }

    editingAchievementId = null;
    achievementForm.reset();

    const submitButton = achievementForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Add Achievement";
    }

    renderAchievements();
    renderStatistics();
});


function cancelProjectEditing() {
    editingProjectId = null;
    projectForm.reset();

    const submitButton = projectForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) submitButton.textContent = "Add Project";

    cancelProjectEdit.hidden = true;
    formMessage.textContent = "";
}

function cancelSkillEditing() {
    editingSkillId = null;
    skillForm.reset();

    const submitButton = skillForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) submitButton.textContent = "Add Skill";

    cancelSkillEdit.hidden = true;
    skillMessage.textContent = "";
}

function cancelAchievementEditing() {
    editingAchievementId = null;
    achievementForm.reset();

    const submitButton = achievementForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Add Achievement";
    }

    cancelAchievementEdit.hidden = true;
    achievementMessage.textContent = "";
}

cancelProjectEdit.addEventListener("click", cancelProjectEditing);
cancelSkillEdit.addEventListener("click", cancelSkillEditing);
cancelAchievementEdit.addEventListener("click", cancelAchievementEditing);

// ============================================
// 10. INITIALISE THE DASHBOARD
// ============================================

renderProjects();
renderSkills();
renderAchievements();
renderStatistics();


/* =========================================
   PORTFOLIO BACKUP — EXPORT
========================================= */

const exportBackupButton = document.getElementById(
    "export-backup-button"
);

const backupMessage = document.getElementById(
    "backup-message"
);

function exportPortfolioBackup() {
    try {
        const backup = {
            app: "DERAMOV_e-Portifolio",
            formatVersion: 1,
            exportedAt: new Date().toISOString(),

            profile: portfolioData.profile,

            projects: getProjects(),
            skills: getSkills(),
            achievements: getAchievements()
        };

        const json = JSON.stringify(backup, null, 2);

        const blob = new Blob(
            [json],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        const date = new Date()
            .toISOString()
            .slice(0, 10);

        link.href = url;
        link.download = `portfolio-backup-${date}.json`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        backupMessage.textContent =
            "Backup exported successfully.";

    } catch (error) {
        console.error("Backup export failed:", error);

        backupMessage.textContent =
            "Backup failed. Check the browser console for details.";
    }
}

if (exportBackupButton) {
    exportBackupButton.addEventListener(
        "click",
        exportPortfolioBackup
    );
}


/* =========================================
   PORTFOLIO BACKUP — IMPORT VALIDATION
========================================= */

const importBackupFile = document.getElementById(
    "import-backup-file"
);

const backupPreview = document.getElementById(
    "backup-preview"
);

const backupPreviewDetails = document.getElementById(
    "backup-preview-details"
);

const confirmImportButton = document.getElementById(
    "confirm-import-button"
);

const cancelImportButton = document.getElementById(
    "cancel-import-button"
);

let pendingBackup = null;

function isValidBackup(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return false;
    }

    if (data.app !== "DERAMOV_e-Portifolio") {
        return false;
    }

    if (data.formatVersion !== 1) {
        return false;
    }

    if (
        !Array.isArray(data.projects) ||
        !Array.isArray(data.skills) ||
        !Array.isArray(data.achievements) ||
        !data.profile ||
        typeof data.profile !== "object" ||
        Array.isArray(data.profile)
    ) {
        return false;
    }

    const validProjects = data.projects.every(item =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        Number.isFinite(Number(item.id)) &&
        typeof item.title === "string" &&
        typeof item.category === "string" &&
        typeof item.description === "string" &&
        Array.isArray(item.technologies) &&
        item.technologies.every(technology =>
            typeof technology === "string"
        ) &&
        typeof item.status === "string"
    );

    const validSkills = data.skills.every(item =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        Number.isFinite(Number(item.id)) &&
        typeof item.name === "string" &&
        typeof item.category === "string" &&
        typeof item.level === "string"
    );

    const validAchievements = data.achievements.every(item =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        Number.isFinite(Number(item.id)) &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        Number.isFinite(Number(item.year))
    );

    return validProjects && validSkills && validAchievements;
}

function clearBackupPreview() {
    pendingBackup = null;
    importBackupFile.value = "";
    backupPreview.hidden = true;
    confirmImportButton.disabled = true;
    backupPreviewDetails.textContent = "";
}



importBackupFile.addEventListener("change", async (event) => {
    // Clear the preview without clearing the selected file.
    pendingBackup = null;
    backupPreview.hidden = true;
    confirmImportButton.disabled = true;
    backupPreviewDetails.textContent = "";

    const fileInput = event.currentTarget;
    const file = fileInput.files && fileInput.files[0];

    if (!file) {
        backupMessage.textContent =
            "No file was selected. Please try again.";
        return;
    }

    backupMessage.textContent = `Reading ${file.name}...`;

    try {
        if (file.size === 0) {
            throw new Error("The selected file is empty.");
        }

        if (file.size > 10 * 1024 * 1024) {
            throw new Error("The backup file exceeds the 10 MB limit.");
        }

        const text = await file.text();
        const data = JSON.parse(text);

        if (!isValidBackup(data)) {
            throw new Error(
                "Invalid backup. Select a JSON file exported by this portfolio."
            );
        }

        pendingBackup = data;

        backupPreviewDetails.textContent =
            `File: ${file.name} | ` +
            `Exported: ${data.exportedAt || "Unknown date"} | ` +
            `Projects: ${data.projects.length} | ` +
            `Skills: ${data.skills.length} | ` +
            `Achievements: ${data.achievements.length}. ` +
            "Restoring will replace the current records in these three categories.";

        backupPreview.hidden = false;
        confirmImportButton.disabled = false;

        backupMessage.textContent =
            "Backup validated. Review the preview before restoring.";

    } catch (error) {
        console.error("Backup validation failed:", error);
        backupMessage.textContent =
            error.message || "Could not read this backup file.";
    }
});

/* =========================================
   PORTFOLIO BACKUP — RESTORE
========================================= */

confirmImportButton.addEventListener("click", () => {
    if (!pendingBackup || !isValidBackup(pendingBackup)) {
        backupMessage.textContent =
            "No valid backup is ready to restore.";
        return;
    }

    const confirmed = window.confirm(
        "Restore this backup?\n\n" +
        "The current projects, skills, and achievements will be replaced. " +
        "Export a backup of your current data first if you may need it later."
    );

    
if (!confirmed) return;

// Automatically export the current data before restoration.
try {
    const safetyBackup = {
        app: "DERAMOV_e-Portifolio",
        formatVersion: 1,
        exportedAt: new Date().toISOString(),
        profile: portfolioData.profile,
        projects: getProjects(),
        skills: getSkills(),
        achievements: getAchievements()
    };

    const json = JSON.stringify(safetyBackup, null, 2);
    const blob = new Blob([json], {
        type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    link.href = url;
    link.download = `portfolio-safety-backup-${timestamp}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

} catch (error) {
    console.error("Safety backup export failed:", error);

    backupMessage.textContent =
        "Could not create the safety backup. Restoration cancelled.";

    return;
}


    // Preserve the current records so they can be rolled back if saving fails.
    const previousProjects = localStorage.getItem("ePortfolioProjects");
    const previousSkills = localStorage.getItem("ePortfolioSkills");
    const previousAchievements = localStorage.getItem(
        "ePortfolioAchievements"
    );

    try {
        // Prepare independent copies before changing storage.
        const restoredProjects = JSON.parse(
            JSON.stringify(pendingBackup.projects)
        );
        const restoredSkills = JSON.parse(
            JSON.stringify(pendingBackup.skills)
        );
        const restoredAchievements = JSON.parse(
            JSON.stringify(pendingBackup.achievements)
        );

        // Save all three categories.
        saveProjects(restoredProjects);
        saveSkills(restoredSkills);
        saveAchievements(restoredAchievements);

        // Refresh the dashboard from saved data.
        projects = getProjects();
        skills = getSkills();
        achievements = getAchievements();

        // Exit any edit mode before rendering.
        cancelProjectEditing();
        cancelSkillEditing();
        cancelAchievementEditing();

        renderProjects();
        renderSkills();
        renderAchievements();
        renderStatistics();

        clearBackupPreview();

        backupMessage.textContent =
            "Backup restored successfully.";

    } catch (error) {
        console.error("Backup restore failed:", error);

        // Attempt to roll back all three storage entries.
        try {
            const previousValues = [
                ["ePortfolioProjects", previousProjects],
                ["ePortfolioSkills", previousSkills],
                ["ePortfolioAchievements", previousAchievements]
            ];

            for (const [key, value] of previousValues) {
                if (value === null) {
                    localStorage.removeItem(key);
                } else {
                    localStorage.setItem(key, value);
                }
            }

            projects = getProjects();
            skills = getSkills();
            achievements = getAchievements();

            renderProjects();
            renderSkills();
            renderAchievements();
            renderStatistics();

            backupMessage.textContent =
                "Restore failed. Previous records were recovered where possible.";

        } catch (rollbackError) {
            console.error("Backup rollback failed:", rollbackError);

            backupMessage.textContent =
                "Restore and automatic recovery both encountered errors. " +
                "Do not close this tab; check the console.";
        }
    }
});


/* PROFILE MANAGEMENT — LOAD AND SAVE */

const profileForm = document.getElementById("profile-form");
const profileNameInput = document.getElementById("profile-name");
const profileTitleInput = document.getElementById("profile-title");
const profileTaglineInput = document.getElementById("profile-tagline");
const profileLocationInput = document.getElementById("profile-location");
const profileMessage = document.getElementById("profile-message");

function loadProfileIntoForm() {
    const profile = getProfile();

    profileNameInput.value = profile.name || "";
    profileTitleInput.value = profile.title || "";
    profileTaglineInput.value = profile.tagline || "";
    profileLocationInput.value = profile.location || "";
}

profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = {
        name: profileNameInput.value.trim(),
        title: profileTitleInput.value.trim(),
        tagline: profileTaglineInput.value.trim(),
        location: profileLocationInput.value.trim()
    };

    if (
        !profile.name ||
        !profile.title ||
        !profile.tagline ||
        !profile.location
    ) {
        profileMessage.textContent =
            "Please complete all profile fields.";
        return;
    }

    try {
        saveProfile(profile);
        profileMessage.textContent =
            "Profile saved successfully.";
    } catch (error) {
        console.error("Profile save failed:", error);
        profileMessage.textContent =
            "Could not save the profile. Check browser storage.";
    }
});

loadProfileIntoForm();
