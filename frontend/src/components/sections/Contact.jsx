import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/profile`);
        setProfile(data);
      } catch (error) {
        console.warn("Failed to fetch profile", error);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${apiUrl}/api/contact`, formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({ 
        loading: false, 
        success: false, 
        error: "Failed to send message. Please try again later." 
      });
    }
  };

  if (loadingProfile) {
    return (
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12 text-center text-slate-400">
          Loading contact information...
        </div>
      </section>
    );
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title={profile.contactTitle || "Get in Touch"} 
          subtitle={profile.contactSubtitle || "Have a question or want to work together? Leave a message!"}
        />

        <div className="grid lg:grid-cols-12 gap-12 mt-12">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-4 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass p-8 rounded-2xl h-full border-glass-border">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Fill out the form and I will get back to you within 24 hours.
              </p>

              <div className="flex flex-col gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-white hover:text-primary transition-colors font-medium">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-2xl border-glass-border">
              {status.success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle size={64} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-400">Thank you for reaching out. I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-300">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required
                        className="bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-300">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required
                        className="bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="john@gmail.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required
                      className="bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required
                      rows={5}
                      className="bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  {status.error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl">
                      <XCircle size={18} />
                      <p className="text-sm">{status.error}</p>
                    </div>
                  )}

                  <div className="mt-2">
                    <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={status.loading}>
                      {status.loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                          Sending...
                        </div>
                      ) : (
                        <>Send Message <Send size={18} /></>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
