import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Mail,
  Plus,
  Trash2,
  Edit,
  X,
  CheckSquare,
  Square,
  RefreshCw,
  Menu,
  Upload,
  FileText
} from "lucide-react";
import axios from "axios";
import Button from "../components/Button";

const resolveUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${apiUrl}${path}`;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/admin/stats`);
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard stats.");
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile & Titles", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "experience", label: "Experience & Edu", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Sparkles },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "messages", label: "Messages", icon: Mail }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 flex flex-col md:flex-row relative overflow-x-hidden w-full">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile Header */}
      <header className="md:hidden w-full bg-dark-800/90 border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Award className="text-primary" size={24} />
          <span className="font-bold text-lg text-white">Portfolio Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white/5 rounded-lg text-slate-300 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[68px] left-0 right-0 bg-dark-800 border-b border-white/10 shadow-xl z-20 flex flex-col p-4 gap-1.5"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/15 text-primary"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-dark-800/80 border-r border-white/10 flex-col z-20 sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10 flex items-center gap-2">
          <Award className="text-primary" size={24} />
          <span className="font-bold text-lg text-white">Admin Workspace</span>
        </div>

        <nav className="flex-grow p-4 flex flex-col gap-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                  activeTab === tab.id
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 z-10 overflow-y-auto overflow-x-hidden h-auto md:h-screen w-full">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-400 hover:text-white"><X size={16} /></button>
          </div>
        )}

        {/* Tab Components */}
        {activeTab === "dashboard" && (
          <DashboardTab stats={stats} loading={loadingStats} refreshStats={fetchStats} />
        )}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "projects" && <ProjectsTab triggerStatsRefresh={fetchStats} />}
        {activeTab === "experience" && <ExperienceTab triggerStatsRefresh={fetchStats} />}
        {activeTab === "skills" && <SkillsTab triggerStatsRefresh={fetchStats} />}
        {activeTab === "certificates" && <CertificatesTab triggerStatsRefresh={fetchStats} />}
        {activeTab === "achievements" && <AchievementsTab triggerStatsRefresh={fetchStats} />}
        {activeTab === "messages" && <MessagesTab triggerStatsRefresh={fetchStats} />}
      </main>
    </div>
  );
};

/* ==========================================================================
   SUB-TAB IMPLEMENTATIONS
   ========================================================================== */

// --- 1. DASHBOARD ---
const DashboardTab = ({ stats, loading, refreshStats }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const statCards = [
    { label: "Total Projects", value: stats?.projects || 0, icon: FolderGit2, color: "text-blue-400" },
    { label: "Experiences & Edu", value: stats?.experiences || 0, icon: Briefcase, color: "text-green-400" },
    { label: "Total Skills", value: stats?.skills || 0, icon: Sparkles, color: "text-yellow-400" },
    { label: "Certificates", value: stats?.certificates || 0, icon: Award, color: "text-purple-400" },
    { label: "Achievements", value: stats?.achievements || 0, icon: Award, color: "text-orange-400" },
    { label: "Inbound Messages", value: stats?.contacts || 0, icon: Mail, color: "text-cyan-400" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time statistics of your portfolio database</p>
        </div>
        <Button variant="glass" onClick={refreshStats} className="p-2.5 rounded-xl">
          <RefreshCw size={18} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass p-6 rounded-2xl border border-glass-border flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{card.label}</p>
                <h3 className="text-4xl font-extrabold text-white mt-2">{card.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl bg-white/5 ${card.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 glass p-6 rounded-2xl border border-glass-border">
        <h3 className="text-lg font-bold text-white mb-4">Independent Deployment Info</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          This admin panel runs in isolation. Updates made here will push straight to your MongoDB database and populate immediately on your main client landing page.
        </p>
        <div className="bg-[#12121a] p-4 rounded-xl border border-white/5 text-xs font-mono text-slate-400">
          <span className="text-primary font-bold">API URL:</span> {import.meta.env.VITE_API_URL || "http://localhost:5000"}
        </div>
      </div>
    </div>
  );
};

// --- 2. PROFILE TAB (DYNAMIC COPIES AND PERSONAL INFO) ---
const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("info"); // info, headings

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/api/profile`);
      setProfile(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, [field]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.put(`${apiUrl}/admin/profile/${profile._id}`, profile);
      setProfile(data); // update local state with returned paths
      setMessage("Profile and landing page titles saved successfully!");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Profile & Section Headings</h1>
        <p className="text-slate-400 text-sm mt-1">Customize personal info and section titles across the landing page</p>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Sub tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
        <button
          type="button"
          onClick={() => setActiveSection("info")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeSection === "info" ? "bg-primary text-dark-900" : "text-slate-400 hover:text-white"
          }`}
        >
          Personal & Social Details
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("headings")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            activeSection === "headings" ? "bg-primary text-dark-900" : "text-slate-400 hover:text-white"
          }`}
        >
          Landing Page Section Headings
        </button>
      </div>

      {profile && (
        <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-4xl text-sm">
          {activeSection === "info" && (
            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Name</label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Job Role</label>
                  <input
                    type="text"
                    required
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Location</label>
                  <input
                    type="text"
                    value={profile.location || ""}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Profile photo upload selector with delete icon */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Profile Image</label>
                  <div className="flex items-center gap-4">
                    {profile.image && (
                      <div className="relative group">
                        <img
                          src={resolveUrl(profile.image)}
                          alt="Profile Preview"
                          className="w-12 h-12 object-cover rounded-xl border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => setProfile({ ...profile, image: "" })}
                          className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white cursor-pointer transition-all"
                          title="Delete Photo"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all">
                      <Upload size={14} /> Select Photo File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "image")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Resume document upload selector with delete icon */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Resume File (PDF)</label>
                  <div className="flex items-center gap-3">
                    {profile.resumeLink && (
                      <div className="relative flex items-center bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl pr-9">
                        <span className="text-xs text-primary font-mono truncate max-w-[150px] flex items-center gap-1.5">
                          <FileText size={12} /> {profile.resumeLink.split('/').pop()}
                        </span>
                        <button
                          type="button"
                          onClick={() => setProfile({ ...profile, resumeLink: "" })}
                          className="absolute right-2 p-0.5 bg-red-500 hover:bg-red-600 rounded-full text-white cursor-pointer transition-all"
                          title="Delete Resume"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all">
                      <Upload size={14} /> Select PDF Document
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileChange(e, "resumeLink")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Bio Description</label>
                <textarea
                  rows={4}
                  required
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <h3 className="text-base font-bold text-white mt-4 border-b border-white/5 pb-2">Social Profiles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">GitHub</label>
                  <input
                    type="text"
                    value={profile.social?.github || ""}
                    onChange={(e) => setProfile({
                      ...profile,
                      social: { ...profile.social, github: e.target.value }
                    })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">LinkedIn</label>
                  <input
                    type="text"
                    value={profile.social?.linkedin || ""}
                    onChange={(e) => setProfile({
                      ...profile,
                      social: { ...profile.social, linkedin: e.target.value }
                    })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Twitter</label>
                  <input
                    type="text"
                    value={profile.social?.twitter || ""}
                    onChange={(e) => setProfile({
                      ...profile,
                      social: { ...profile.social, twitter: e.target.value }
                    })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <h3 className="text-base font-bold text-white mt-4 border-b border-white/5 pb-2">Experience & Project Counter Metrics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Experience Stat (e.g., 6 months)</label>
                  <input
                    type="text"
                    value={profile.stats?.experience || ""}
                    onChange={(e) => setProfile({
                      ...profile,
                      stats: { ...profile.stats, experience: e.target.value }
                    })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Projects Stat (e.g., 15+)</label>
                  <input
                    type="text"
                    value={profile.stats?.projects || ""}
                    onChange={(e) => setProfile({
                      ...profile,
                      stats: { ...profile.stats, projects: e.target.value }
                    })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Clients Stat (e.g., 2+)</label>
                  <input
                    type="text"
                    value={profile.stats?.clients || ""}
                    onChange={(e) => setProfile({
                      ...profile,
                      stats: { ...profile.stats, clients: e.target.value }
                    })}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "headings" && (
            <div className="flex flex-col gap-6">
              {/* Hero Section Edit */}
              <div className="glass p-5 rounded-2xl border border-glass-border flex flex-col gap-4">
                <h3 className="font-bold text-white border-b border-white/5 pb-2 text-sm uppercase text-primary">Hero Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Hero Title</label>
                    <input type="text" value={profile.heroTitle || ""} onChange={(e) => setProfile({ ...profile, heroTitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Hero Subtitle</label>
                    <input type="text" value={profile.heroSubtitle || ""} onChange={(e) => setProfile({ ...profile, heroSubtitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-slate-300 font-medium text-xs">Hero Body Text</label>
                  <textarea rows={2} value={profile.heroDescription || ""} onChange={(e) => setProfile({ ...profile, heroDescription: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none" />
                </div>
              </div>

              {/* About Section Edit */}
              <div className="glass p-5 rounded-2xl border border-glass-border flex flex-col gap-4">
                <h3 className="font-bold text-white border-b border-white/5 pb-2 text-sm uppercase text-primary">About Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Title</label>
                    <input type="text" value={profile.aboutTitle || ""} onChange={(e) => setProfile({ ...profile, aboutTitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Subtitle</label>
                    <input type="text" value={profile.aboutSubtitle || ""} onChange={(e) => setProfile({ ...profile, aboutSubtitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-slate-300 font-medium text-xs">Main Bold Heading (glowing copy)</label>
                  <input type="text" value={profile.aboutHeading || ""} onChange={(e) => setProfile({ ...profile, aboutHeading: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>

              {/* Skills Section Edit */}
              <div className="glass p-5 rounded-2xl border border-glass-border flex flex-col gap-4">
                <h3 className="font-bold text-white border-b border-white/5 pb-2 text-sm uppercase text-primary">Skills Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Title</label>
                    <input type="text" value={profile.skillsTitle || ""} onChange={(e) => setProfile({ ...profile, skillsTitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Subtitle</label>
                    <input type="text" value={profile.skillsSubtitle || ""} onChange={(e) => setProfile({ ...profile, skillsSubtitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              {/* Projects Section Edit */}
              <div className="glass p-5 rounded-2xl border border-glass-border flex flex-col gap-4">
                <h3 className="font-bold text-white border-b border-white/5 pb-2 text-sm uppercase text-primary">Projects Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Title</label>
                    <input type="text" value={profile.projectsTitle || ""} onChange={(e) => setProfile({ ...profile, projectsTitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Subtitle</label>
                    <input type="text" value={profile.projectsSubtitle || ""} onChange={(e) => setProfile({ ...profile, projectsSubtitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              {/* Experience Section Edit */}
              <div className="glass p-5 rounded-2xl border border-glass-border flex flex-col gap-4">
                <h3 className="font-bold text-white border-b border-white/5 pb-2 text-sm uppercase text-primary">Experience & Education Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Title</label>
                    <input type="text" value={profile.experienceTitle || ""} onChange={(e) => setProfile({ ...profile, experienceTitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Subtitle</label>
                    <input type="text" value={profile.experienceSubtitle || ""} onChange={(e) => setProfile({ ...profile, experienceSubtitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              {/* Certificates Section Edit */}
              <div className="glass p-5 rounded-2xl border border-glass-border flex flex-col gap-4">
                <h3 className="font-bold text-white border-b border-white/5 pb-2 text-sm uppercase text-primary">Certificates & Achievements Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Title</label>
                    <input type="text" value={profile.certificatesTitle || ""} onChange={(e) => setProfile({ ...profile, certificatesTitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Subtitle</label>
                    <input type="text" value={profile.certificatesSubtitle || ""} onChange={(e) => setProfile({ ...profile, certificatesSubtitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              {/* Contact Section Edit */}
              <div className="glass p-5 rounded-2xl border border-glass-border flex flex-col gap-4">
                <h3 className="font-bold text-white border-b border-white/5 pb-2 text-sm uppercase text-primary">Contact Section</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Title</label>
                    <input type="text" value={profile.contactTitle || ""} onChange={(e) => setProfile({ ...profile, contactTitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-medium text-xs">Section Subtitle</label>
                    <input type="text" value={profile.contactSubtitle || ""} onChange={(e) => setProfile({ ...profile, contactSubtitle: e.target.value })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving Changes..." : "Save Config Copy"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

// --- 3. PROJECTS ---
const ProjectsTab = ({ triggerStatsRefresh }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [techInput, setTechInput] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrlLocal, setGithubUrlLocal] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/api/projects`);
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFileChangeLocal = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setCurrentProject(null);
    setTitle("");
    setDescription("");
    setImage("");
    setTechInput("");
    setLiveUrl("");
    setGithubUrlLocal("");
    setFeatured(false);
    setOrder(projects.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setCurrentProject(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setImage(proj.image);
    setTechInput(proj.techStack?.join(", ") || "");
    setLiveUrl(proj.liveUrl || "");
    setGithubUrlLocal(proj.githubUrl || "");
    setFeatured(proj.featured || false);
    setOrder(proj.order || 0);
    setModalOpen(true);
  };

  const saveProject = async (e) => {
    e.preventDefault();
    const techStack = techInput.split(",").map(t => t.trim()).filter(Boolean);
    const payload = { title, description, image, techStack, liveUrl, githubUrl: githubUrlLocal, featured, order };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      if (currentProject) {
        await axios.put(`${apiUrl}/admin/projects/${currentProject._id}`, payload);
      } else {
        await axios.post(`${apiUrl}/admin/projects`, payload);
      }
      setModalOpen(false);
      fetchProjects();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save project.");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/admin/projects/${id}`);
      fetchProjects();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Manage Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Add, update, or remove portfolio items</p>
        </div>
        <Button variant="primary" onClick={openAddModal} className="gap-2">
          <Plus size={18} /> Add Project
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj._id} className="glass p-5 rounded-2xl border border-glass-border flex flex-col justify-between h-full">
              <div>
                <img
                  src={resolveUrl(proj.image)}
                  alt={proj.title}
                  className="w-full h-40 object-cover rounded-xl border border-white/5 mb-4"
                  onError={(e) => { e.target.src = "https://placehold.co/600x400/1e1e2d/22d3ee?text=Project"; }}
                />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-lg line-clamp-1">{proj.title}</h3>
                  {proj.featured && (
                    <span className="text-[10px] bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.techStack?.map((t, i) => (
                    <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-auto">
                <span className="text-xs text-slate-500 font-semibold">Order: {proj.order}</span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(proj)} className="p-2 bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-primary rounded-xl transition-all cursor-pointer">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => deleteProject(proj._id)} className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-all cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex justify-center items-center p-6 z-50 overflow-y-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 md:p-8 rounded-3xl border border-glass-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{currentProject ? "Edit Project" : "Add Project"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={saveProject} className="flex flex-col gap-5 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                {/* Project preview image selector with delete overlay */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Project Image</label>
                  <div className="flex items-center gap-4">
                    {image && (
                      <div className="relative group">
                        <img
                          src={resolveUrl(image)}
                          alt="Project Preview"
                          className="w-10 h-10 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => setImage("")}
                          className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white cursor-pointer transition-all"
                          title="Delete Project Image"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all">
                      <Upload size={14} /> Choose Image File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChangeLocal}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Description</label>
                <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Tech Stack (comma separated)</label>
                <input type="text" required value={techInput} onChange={(e) => setTechInput(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Live Demo URL</label>
                  <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">GitHub Repository URL</label>
                  <input type="text" value={githubUrlLocal} onChange={(e) => setGithubUrlLocal(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Display Order</label>
                  <input type="number" required value={order} onChange={(e) => setOrder(Number(e.target.value))} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                <button type="button" onClick={() => setFeatured(!featured)} className="flex items-center gap-3 mt-6 text-slate-300 select-none cursor-pointer">
                  {featured ? <CheckSquare className="text-primary" size={20} /> : <Square size={20} />}
                  <span>Featured Project</span>
                </button>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="glass" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Project</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- 4. EXPERIENCE & EDUCATION ---
const ExperienceTab = ({ triggerStatsRefresh }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("work");
  const [order, setOrder] = useState(0);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/api/experience`);
      setExperiences(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openAddModal = () => {
    setCurrentExp(null);
    setTitle("");
    setCompany("");
    setPeriod("");
    setDescription("");
    setType("work");
    setOrder(experiences.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (exp) => {
    setCurrentExp(exp);
    setTitle(exp.title);
    setCompany(exp.company);
    setPeriod(exp.period);
    setDescription(exp.description);
    setType(exp.type || "work");
    setOrder(exp.order || 0);
    setModalOpen(true);
  };

  const saveExperience = async (e) => {
    e.preventDefault();
    const payload = { title, company, period, description, type, order };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      if (currentExp) {
        await axios.put(`${apiUrl}/admin/experience/${currentExp._id}`, payload);
      } else {
        await axios.post(`${apiUrl}/admin/experience`, payload);
      }
      setModalOpen(false);
      fetchExperiences();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save experience.");
    }
  };

  const deleteExperience = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/admin/experience/${id}`);
      fetchExperiences();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Experience & Education</h1>
          <p className="text-slate-400 text-sm mt-1">Manage professional jobs and academic credentials</p>
        </div>
        <Button variant="primary" onClick={openAddModal} className="gap-2">
          <Plus size={18} /> Add Entry
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="overflow-x-auto glass rounded-2xl border border-glass-border">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Role / Degree</th>
                <th className="px-6 py-4">Institution / Employer</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {experiences.map((exp) => (
                <tr key={exp._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      exp.type === "work" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
                    }`}>
                      {exp.type === "work" ? "Job" : "Education"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{exp.title}</td>
                  <td className="px-6 py-4">{exp.company}</td>
                  <td className="px-6 py-4">{exp.period}</td>
                  <td className="px-6 py-4">{exp.order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(exp)} className="p-2 bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-primary rounded-xl transition-all cursor-pointer">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => deleteExperience(exp._id)} className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-all cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex justify-center items-center p-6 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 md:p-8 rounded-3xl border border-glass-border w-full max-w-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{currentExp ? "Edit Entry" : "Add Entry"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={saveExperience} className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary">
                  <option value="work">Job / Professional Experience</option>
                  <option value="education">Education / Degree</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Title / Role</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Institution / Company</label>
                  <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Period / Duration</label>
                  <input type="text" required placeholder="e.g. 2024 - Present" value={period} onChange={(e) => setPeriod(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Display Order</label>
                  <input type="number" required value={order} onChange={(e) => setOrder(Number(e.target.value))} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Description</label>
                <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="glass" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Entry</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- 5. SKILLS ---
const SkillsTab = ({ triggerStatsRefresh }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [category, setCategory] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [level, setLevel] = useState(90);
  const [order, setOrder] = useState(0);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/admin/skills`);
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setCurrentSkill(null);
    setCategory("");
    setSkillsText("");
    setLevel(90);
    setOrder(skills.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (sk) => {
    setCurrentSkill(sk);
    setCategory(sk.category);
    setSkillsText(sk.names?.join(", ") || "");
    setLevel(sk.level || 90);
    setOrder(sk.order || 0);
    setModalOpen(true);
  };

  const saveSkill = async (e) => {
    e.preventDefault();
    const names = skillsText.split(",").map(s => s.trim()).filter(Boolean);
    const payload = { category, names, level: Number(level), order: Number(order) };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      if (currentSkill) {
        await axios.put(`${apiUrl}/admin/skills/${currentSkill._id}`, payload);
      } else {
        await axios.post(`${apiUrl}/admin/skills`, payload);
      }
      setModalOpen(false);
      fetchSkills();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save skill category.");
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/admin/skills/${id}`);
      fetchSkills();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Manage Skills</h1>
          <p className="text-slate-400 text-sm mt-1">Specify technology skill categories, lists, and group orders</p>
        </div>
        <Button variant="primary" onClick={openAddModal} className="gap-2">
          <Plus size={18} /> Add Category Group
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="overflow-x-auto glass rounded-2xl border border-glass-border">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Skills (Comma Separated)</th>
                <th className="px-6 py-4">Proficiency (%)</th>
                <th className="px-6 py-4">Display Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {skills.map((sk) => (
                <tr key={sk._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">
                    <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-xs text-slate-300 font-medium">
                      {sk.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-md truncate text-slate-400 font-mono text-xs">
                    {sk.names?.join(", ")}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{sk.level || 90}%</td>
                  <td className="px-6 py-4 font-medium text-white">{sk.order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(sk)} className="p-2 bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-primary rounded-xl transition-all cursor-pointer">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => deleteSkill(sk._id)} className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-all cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex justify-center items-center p-6 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 md:p-8 rounded-3xl border border-glass-border w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{currentSkill ? "Edit Skill Group" : "Add Skill Group"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={saveSkill} className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend, Backend, Tools"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Skills (comma separated)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. React.js, Next.js, HTML, CSS, JavaScript"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Proficiency (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Category Display Order</label>
                  <input
                    type="number"
                    required
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="glass" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Skills Group</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- 6. CERTIFICATES ---
const CertificatesTab = ({ triggerStatsRefresh }) => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState(0);

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/api/certificates`);
      setCerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const openAddModal = () => {
    setCurrentCert(null);
    setTitle("");
    setIssuer("");
    setDate("");
    setLink("");
    setOrder(certs.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (cert) => {
    setCurrentCert(cert);
    setTitle(cert.title);
    setIssuer(cert.issuer);
    setDate(cert.date || "");
    setLink(cert.link || "");
    setOrder(cert.order || 0);
    setModalOpen(true);
  };

  const saveCert = async (e) => {
    e.preventDefault();
    const payload = { title, issuer, date, link, order };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      if (currentCert) {
        await axios.put(`${apiUrl}/admin/certificates/${currentCert._id}`, payload);
      } else {
        await axios.post(`${apiUrl}/admin/certificates`, payload);
      }
      setModalOpen(false);
      fetchCerts();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save certificate.");
    }
  };

  const deleteCert = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/admin/certificates/${id}`);
      fetchCerts();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Manage Certificates</h1>
          <p className="text-slate-400 text-sm mt-1">Specify training certifications and license issuers</p>
        </div>
        <Button variant="primary" onClick={openAddModal} className="gap-2">
          <Plus size={18} /> Add Certificate
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="overflow-x-auto glass rounded-2xl border border-glass-border">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Certificate Name</th>
                <th className="px-6 py-4">Issuer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {certs.map((c) => (
                <tr key={c._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">{c.title}</td>
                  <td className="px-6 py-4">{c.issuer}</td>
                  <td className="px-6 py-4">{c.date}</td>
                  <td className="px-6 py-4">{c.order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(c)} className="p-2 bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-primary rounded-xl transition-all cursor-pointer">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => deleteCert(c._id)} className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-all cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex justify-center items-center p-6 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 md:p-8 rounded-3xl border border-glass-border w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{currentCert ? "Edit Certificate" : "Add Certificate"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={saveCert} className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Certificate Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Issuer</label>
                <input type="text" required value={issuer} onChange={(e) => setIssuer(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Issue Date / Period</label>
                  <input type="text" placeholder="e.g. May 2026" value={date} onChange={(e) => setDate(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Order</label>
                  <input type="number" required value={order} onChange={(e) => setOrder(Number(e.target.value))} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Verification Link</label>
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="glass" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Certificate</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- 7. ACHIEVEMENTS ---
const AchievementsTab = ({ triggerStatsRefresh }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAch, setCurrentAch] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [order, setOrder] = useState(0);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/api/achievements`);
      setAchievements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openAddModal = () => {
    setCurrentAch(null);
    setTitle("");
    setDescription("");
    setDate("");
    setOrder(achievements.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (ach) => {
    setCurrentAch(ach);
    setTitle(ach.title);
    setDescription(ach.description);
    setDate(ach.date || "");
    setOrder(ach.order || 0);
    setModalOpen(true);
  };

  const saveAchievement = async (e) => {
    e.preventDefault();
    const payload = { title, description, date, order };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      if (currentAch) {
        await axios.put(`${apiUrl}/admin/achievements/${currentAch._id}`, payload);
      } else {
        await axios.post(`${apiUrl}/admin/achievements`, payload);
      }
      setModalOpen(false);
      fetchAchievements();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save achievement.");
    }
  };

  const deleteAchievement = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/admin/achievements/${id}`);
      fetchAchievements();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Manage Achievements</h1>
          <p className="text-slate-400 text-sm mt-1">Manage accomplishments, honors, or awards</p>
        </div>
        <Button variant="primary" onClick={openAddModal} className="gap-2">
          <Plus size={18} /> Add Achievement
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="overflow-x-auto glass rounded-2xl border border-glass-border">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {achievements.map((ach) => (
                <tr key={ach._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">{ach.title}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{ach.description}</td>
                  <td className="px-6 py-4">{ach.date}</td>
                  <td className="px-6 py-4">{ach.order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(ach)} className="p-2 bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-primary rounded-xl transition-all cursor-pointer">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => deleteAchievement(ach._id)} className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-all cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex justify-center items-center p-6 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 md:p-8 rounded-3xl border border-glass-border w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{currentAch ? "Edit Achievement" : "Add Achievement"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={saveAchievement} className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Achievement Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Date</label>
                  <input type="text" placeholder="e.g. 2026" value={date} onChange={(e) => setDate(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-medium">Order</label>
                  <input type="number" required value={order} onChange={(e) => setOrder(Number(e.target.value))} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-medium">Description</label>
                <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="glass" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Achievement</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- 8. MESSAGES (INBOX) ---
const MessagesTab = ({ triggerStatsRefresh }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const { data } = await axios.get(`${apiUrl}/admin/contacts`);
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id, readStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.put(`${apiUrl}/admin/contacts/${id}/read`, { read: readStatus });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/admin/contacts/${id}`);
      fetchMessages();
      triggerStatsRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Contact Messages</h1>
        <p className="text-slate-400 text-sm mt-1">Review inquiries submitted via your contact form</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-primary" size={32} />
        </div>
      ) : messages.length === 0 ? (
        <div className="glass p-8 rounded-2xl text-center text-slate-400">
          No messages received.
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl">
          {messages.map((msg) => (
            <div key={msg._id} className={`glass p-6 rounded-2xl border transition-all ${
              msg.read ? "border-glass-border opacity-75" : "border-primary/35 shadow-[0_0_15px_-5px_rgba(34,211,238,0.2)]"
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    {msg.subject}
                    {!msg.read && <span className="bg-primary/20 text-primary border border-primary/20 text-[10px] px-2.5 py-0.5 rounded-full">New</span>}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    From: <span className="text-white font-medium">{msg.name}</span> ({msg.email})
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAsRead(msg._id, !msg.read)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-slate-300 transition-all border border-white/5 cursor-pointer"
                  >
                    {msg.read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/10 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-dark-900/50 p-4 rounded-xl border border-white/5">{msg.message}</p>
              <div className="text-right text-xs text-slate-500 mt-2 font-medium">
                Received: {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
