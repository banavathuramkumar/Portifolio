import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Calendar, ExternalLink } from "lucide-react";
import axios from "axios";
import SectionHeading from "../ui/SectionHeading";

const CertificatesAchievements = () => {
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const [certsRes, achsRes, profileRes] = await Promise.all([
        axios.get(`${apiUrl}/api/certificates`),
        axios.get(`${apiUrl}/api/achievements`),
        axios.get(`${apiUrl}/api/profile`)
      ]);
      setCertificates(certsRes.data);
      setAchievements(achsRes.data);
      setProfile(profileRes.data);
    } catch (err) {
      console.error("Failed to fetch certificates/achievements/profile", err);
      setError("Failed to load certifications and achievements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="certificates" className="py-16 md:py-24 relative bg-dark-900 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (certificates.length === 0 && achievements.length === 0 && !error) {
    return null;
  }

  return (
    <section id="certificates" className="py-16 md:py-24 relative bg-dark-900 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title={profile?.certificatesTitle || "Certificates & Achievements"} 
          subtitle={profile?.certificatesSubtitle || "Honors, certifications, and milestones in my development career."}
          align="center"
        />

        {error ? (
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm mb-4">{error}</p>
            <button onClick={fetchData} className="glass px-6 py-2 rounded-xl text-primary border border-primary/20 hover:bg-primary/10 transition-colors text-xs font-semibold">
              Retry
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 mt-16">
            
            {/* Certificates Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>

              {certificates.length === 0 ? (
                <p className="text-slate-500 text-sm">No certifications added yet.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert._id || index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass p-6 rounded-2xl border border-glass-border hover:border-primary/30 transition-all duration-300 flex justify-between items-center group"
                    >
                      <div>
                        <h4 className="font-bold text-white text-lg group-hover:text-primary transition-colors">
                          {cert.title}
                        </h4>
                        <p className="text-slate-300 text-sm mt-1">{cert.issuer}</p>
                        {cert.date && (
                          <div className="flex items-center gap-1.5 text-xs text-accent mt-3">
                            <Calendar size={12} />
                            <span>{cert.date}</span>
                          </div>
                        )}
                      </div>
                      
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/5 hover:bg-primary text-slate-300 hover:text-dark-900 rounded-xl transition-all"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Achievements Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <Trophy size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">Milestones & Achievements</h3>
              </div>

              {achievements.length === 0 ? (
                <p className="text-slate-500 text-sm">No milestones added yet.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {achievements.map((ach, index) => (
                    <motion.div
                      key={ach._id || index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass p-6 rounded-2xl border border-glass-border hover:border-accent/30 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white text-lg">
                          {ach.title}
                        </h4>
                        {ach.date && (
                          <span className="text-[10px] font-semibold bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full text-accent">
                            {ach.date}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mt-2">
                        {ach.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesAchievements;
