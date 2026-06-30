import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../ui/Icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const [profile, setProfile] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/profile`);
        setProfile(data);
      } catch (error) {
        console.warn("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  const socialLinks = profile
    ? [
        { icon: GithubIcon, href: profile.social.github, label: "GitHub" },
        { icon: LinkedinIcon, href: profile.social.linkedin, label: "LinkedIn" },
        { icon: TwitterIcon, href: profile.social.twitter, label: "Twitter" },
        { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
      ]
    : [];

  return (
    <footer className="border-t border-white/5 bg-dark-900 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand/Name */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">{profile?.name || "..."}</h3>
            <p className="text-slate-400 text-sm">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-primary hover:scale-110 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} {profile?.name || "..."}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
