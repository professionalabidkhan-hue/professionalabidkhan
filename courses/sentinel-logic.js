// sentinel-logic.js
function analyzeJobWithAI(jobTitle) {
    const insights = {
        "Cyber": "Matches 'Sentinel-6' Security protocols. High priority for Hub members.",
        "Developer": "Direct alignment with our Full-Stack Architecture modules. Career growth: Exponential.",
        "React": "Frontend dominance role. Ideal for modern UI specialists in the community.",
        "Research": "Pedagogy-linked opportunity. High value for academic portfolio building.",
        "Default": "Verified opportunity. Aligns with Hub professional standards."
    };

    // Case-insensitive search
    const title = jobTitle.toLowerCase();
    
    if (title.includes("cyber")) return insights["Cyber"];
    if (title.includes("developer")) return insights["Developer"];
    if (title.includes("react")) return insights["React"];
    if (title.includes("research")) return insights["Research"];
    
    return insights["Default"];
}