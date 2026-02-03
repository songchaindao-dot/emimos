import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import ServiceCard from "@/components/services/ServiceCard";
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
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Our Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Premium solutions for your business
          </p>
        </motion.header>

        {/* Services Grid */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Services;
