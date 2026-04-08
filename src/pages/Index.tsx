import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import SitesSection from "@/components/SitesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <AnimatedSection>
      <AboutSection />
    </AnimatedSection>
    <AnimatedSection animation="fade-in-up" delay="100ms">
      <CoursesSection />
    </AnimatedSection>
    <AnimatedSection animation="scale-in">
      <TestimonialsSection />
    </AnimatedSection>
    <AnimatedSection animation="fade-in-up">
      <GallerySection />
    </AnimatedSection>
    <AnimatedSection animation="fade-in-left">
      <SitesSection />
    </AnimatedSection>
    <AnimatedSection animation="fade-in-right">
      <FAQSection />
    </AnimatedSection>
    <AnimatedSection animation="fade-in-up">
      <ContactSection />
    </AnimatedSection>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
