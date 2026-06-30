import PageWrapper from "../components/layout/PageWrapper";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import CertificatesAchievements from "../components/sections/CertificatesAchievements";
import Contact from "../components/sections/Contact";

const HomePage = () => {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <PageWrapper>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <CertificatesAchievements />
        <Contact />
      </PageWrapper>
      <Footer />
    </>
  );
};

export default HomePage;
