const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    bio: { type: String, required: true },
    image: { type: String },
    resumeLink: { type: String },
    social: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
    stats: {
      experience: { type: String },
      projects: { type: String },
      clients: { type: String },
    },
    // Dynamic Landing Page Section Texts
    heroTitle: { type: String },
    heroSubtitle: { type: String },
    heroDescription: { type: String },
    
    aboutTitle: { type: String },
    aboutSubtitle: { type: String },
    aboutHeading: { type: String },
    
    skillsTitle: { type: String },
    skillsSubtitle: { type: String },
    
    projectsTitle: { type: String },
    projectsSubtitle: { type: String },
    
    experienceTitle: { type: String },
    experienceSubtitle: { type: String },
    
    certificatesTitle: { type: String },
    certificatesSubtitle: { type: String },
    
    contactTitle: { type: String },
    contactSubtitle: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
