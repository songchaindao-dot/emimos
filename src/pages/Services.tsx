import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import ServiceCard from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import ImageHero from "@/components/ui/ImageHero";
import PremiumCTA from "@/components/ui/PremiumCTA";
import SectionDivider from "@/components/ui/SectionDivider";
import {
  Palette,
  FileText,
  FileCheck,
  Volume2,
  Share2,
  Calendar,
  Globe,
  Smartphone,
  Server,
} from "lucide-react";
import image4 from "@/assets/image 4.jpg";
import emimosLogo from "@/assets/emimos-logo.png";
import { IMAGE_FOCAL } from "@/lib/visuals";

const services = [
  {
    id: "branding",
    icon: Palette,
    title: "Branding & Visual Identity",
    description: "Logos, brand guidelines, and visual assets",
    price: "From K500",
  },
  {
    id: "writing",
    icon: FileText,
    title: "Professional Writing & Editing",
    description: "Content creation, copywriting, and editing",
    price: "From K250",
  },
  {
    id: "cv-career",
    icon: FileCheck,
    title: "CV & Career Branding",
    description: "Professional CVs, cover letters, LinkedIn",
    price: "From K150",
  },
  {
    id: "audio-visual",
    icon: Volume2,
    title: "Audio & Visual Advertising",
    description: "Radio jingles, video ads, motion graphics",
    price: "Upon Consultation",
  },
  {
    id: "social-media",
    icon: Share2,
    title: "Social Media Management",
    description: "Content strategy, posting, engagement",
    price: "From K800/mo",
  },
  {
    id: "events",
    icon: Calendar,
    title: "Event Planning & Coordination",
    description: "Corporate events, launches, conferences",
    price: "Upon Consultation",
  },
  {
    id: "website",
    icon: Globe,
    title: "Website Development",
    description: "Custom websites, e-commerce, portals",
    price: "From K2,000",
  },
  {
    id: "app",
    icon: Smartphone,
    title: "App Development",
    description: "Mobile apps for iOS and Android",
    price: "From K5,000",
  },
  {
    id: "hosting",
    icon: Server,
    title: "Domain, Email & Hosting",
    description: "Domain registration, hosting, email setup",
    price: "From K200/yr",
  },
];

const Services = () => {
  return (
    <AppLayout>
      <div className="safe-top px-4 pt-4">
        {/* Hero Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <ImageHero
            imageSrc={image4}
            imageAlt="EMIMOS services"
            title="Our Services"
            subtitle="Premium business solutions, clearly packaged and ready for execution."
            imagePositionClass={IMAGE_FOCAL.heroPrimary}
            badge={
              <div className="flex items-center gap-2">
                <img src={emimosLogo} alt="EMIMOS" className="w-9 h-9 rounded-lg bg-white/90 p-1" />
                <span className="text-white/90 text-sm font-medium">Service Catalogue</span>
              </div>
            }
            actions={
              <>
                <Button asChild className="bg-gold hover:bg-gold-dark text-navy-900 font-semibold">
                  <Link to="/order?service=branding">Start Order</Link>
                </Button>
                <Button asChild variant="ghost" className="border border-white/50 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/emi">Ask Emi</Link>
                </Button>
              </>
            }
          />
        </motion.header>

        {/* Services Grid */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
        <SectionDivider />
        <div className="pb-3">
          <h2 className="text-h3 text-foreground mb-3">Package Tiers</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { tier: "Starter", text: "For focused essentials and quick launch needs." },
              { tier: "Growth", text: "For scaling brands with multi-channel delivery." },
              { tier: "Premium", text: "For high-touch strategic support and execution." },
            ].map((item) => (
              <div key={item.tier} className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-card">
                <p className="text-h3 text-foreground">{item.tier}</p>
                <p className="text-small text-muted-foreground mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PremiumCTA
        title="Need Help Choosing?"
        subtitle="Use Emi for guided service matching, then submit your order with confidence."
      />
    </AppLayout>
  );
};

export default Services;
