import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const servicesData: Record<string, {
  title: string;
  description: string;
  benefits: string[];
  timeline: string;
  price: string;
  requiresUpload: boolean;
}> = {
  branding: {
    title: "Branding & Visual Identity",
    description: "Create a powerful, cohesive brand identity that sets you apart. Our expert designers craft logos, color palettes, typography systems, and comprehensive brand guidelines that communicate your values and resonate with your audience.",
    benefits: [
      "Custom logo design with multiple concepts",
      "Complete brand style guide",
      "Color palette and typography system",
      "Business card and letterhead designs",
      "Social media profile assets",
      "Brand usage guidelines document",
    ],
    timeline: "7-14 business days",
    price: "From K500",
    requiresUpload: false,
  },
  writing: {
    title: "Professional Writing & Editing",
    description: "Elevate your content with our professional writing and editing services. From compelling copy to polished documents, we ensure your message is clear, engaging, and error-free.",
    benefits: [
      "SEO-optimized content writing",
      "Professional copyediting and proofreading",
      "Blog posts and articles",
      "Website copy and landing pages",
      "Marketing materials and brochures",
      "Unlimited revisions until satisfied",
    ],
    timeline: "3-7 business days",
    price: "From K250",
    requiresUpload: true,
  },
  "cv-career": {
    title: "CV & Career Branding",
    description: "Stand out in the job market with a professionally crafted CV and personal branding. We help you present your experience and skills in the most compelling way.",
    benefits: [
      "ATS-optimized CV design",
      "Tailored cover letter template",
      "LinkedIn profile optimization",
      "Personal brand statement",
      "Interview preparation tips",
      "30-day support for revisions",
    ],
    timeline: "3-5 business days",
    price: "From K150",
    requiresUpload: true,
  },
  "audio-visual": {
    title: "Audio & Visual Advertising",
    description: "Capture attention with stunning audio and visual content. From radio jingles to video advertisements, we create memorable media that drives engagement and conversions.",
    benefits: [
      "Professional voice-over recording",
      "Custom music and jingles",
      "Video production and editing",
      "Motion graphics and animations",
      "Social media video content",
      "Commercial broadcast ready",
    ],
    timeline: "10-21 business days",
    price: "Upon Consultation",
    requiresUpload: false,
  },
  "social-media": {
    title: "Social Media Management",
    description: "Build a strong online presence with our comprehensive social media management. We handle everything from content creation to community engagement, helping you grow your audience organically.",
    benefits: [
      "Content calendar planning",
      "Daily posting and scheduling",
      "Community management",
      "Analytics and reporting",
      "Influencer outreach",
      "Paid advertising management",
    ],
    timeline: "Ongoing monthly service",
    price: "From K800/month",
    requiresUpload: false,
  },
  events: {
    title: "Event Planning & Coordination",
    description: "Create unforgettable experiences with our end-to-end event planning services. From intimate gatherings to large corporate conferences, we handle every detail.",
    benefits: [
      "Venue selection and booking",
      "Vendor coordination",
      "Event design and theming",
      "Guest management",
      "On-site coordination",
      "Post-event reporting",
    ],
    timeline: "Depends on event scope",
    price: "Upon Consultation",
    requiresUpload: false,
  },
  website: {
    title: "Website Development",
    description: "Get a stunning, high-performance website that converts visitors into customers. Our developers build responsive, SEO-friendly websites tailored to your business needs.",
    benefits: [
      "Custom responsive design",
      "SEO optimization",
      "Content management system",
      "E-commerce integration",
      "Analytics setup",
      "6 months hosting included",
    ],
    timeline: "14-30 business days",
    price: "From K2,000",
    requiresUpload: false,
  },
  app: {
    title: "App Development",
    description: "Transform your ideas into powerful mobile applications. We develop native and cross-platform apps for iOS and Android that deliver exceptional user experiences.",
    benefits: [
      "Cross-platform development",
      "UI/UX design included",
      "Backend integration",
      "App store submission",
      "3 months maintenance",
      "Analytics dashboard",
    ],
    timeline: "30-60 business days",
    price: "From K5,000",
    requiresUpload: false,
  },
  hosting: {
    title: "Domain, Email & Hosting",
    description: "Establish your online presence with professional domain registration, business email setup, and reliable web hosting services.",
    benefits: [
      "Domain registration (1 year)",
      "Professional email setup",
      "SSL certificate included",
      "99.9% uptime guarantee",
      "Daily backups",
      "24/7 technical support",
    ],
    timeline: "1-2 business days",
    price: "From K200/year",
    requiresUpload: false,
  },
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = servicesData[id || ""] || servicesData.branding;

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-top"
        >
          <div className="flex items-center gap-4 px-4 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <h1 className="text-lg font-heading font-semibold text-foreground truncate">
              {service.title}
            </h1>
          </div>
        </motion.header>

        {/* Content */}
        <div className="px-4 py-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-6 mb-6"
          >
            <h2 className="text-xl font-heading font-bold text-primary-foreground mb-2">
              {service.title}
            </h2>
            <div className="flex items-center gap-2 text-gold text-lg font-semibold">
              {service.price}
            </div>
          </motion.div>

          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h3 className="font-heading font-semibold text-foreground mb-2">
              About This Service
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </motion.section>

          {/* Accordion Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="benefits" className="border-none">
                <AccordionTrigger className="bg-card rounded-xl px-4 py-3 hover:no-underline shadow-card">
                  <span className="font-heading font-semibold">What You Get</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-3">
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 bg-gold/20 rounded-full mt-0.5">
                          <Check size={12} className="text-gold" />
                        </div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timeline" className="border-none">
                <AccordionTrigger className="bg-card rounded-xl px-4 py-3 hover:no-underline shadow-card">
                  <span className="font-heading font-semibold">Estimated Timeline</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-3">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-gold" />
                    <span className="text-muted-foreground">{service.timeline}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {service.requiresUpload && (
                <AccordionItem value="upload" className="border-none">
                  <AccordionTrigger className="bg-card rounded-xl px-4 py-3 hover:no-underline shadow-card">
                    <span className="font-heading font-semibold">File Upload</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-3">
                    <div className="flex items-center gap-3">
                      <Upload size={18} className="text-gold" />
                      <span className="text-muted-foreground">
                        You can upload relevant documents during the order process
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </motion.div>
        </div>

        {/* Sticky CTA */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom"
        >
          <Button
            onClick={() => navigate(`/order?service=${id}`)}
            className="w-full py-6 text-lg font-heading font-semibold bg-gold hover:bg-gold-dark text-navy-900 rounded-xl shadow-gold"
          >
            Proceed to Order
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ServiceDetail;
