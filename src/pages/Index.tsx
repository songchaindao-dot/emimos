import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MessageCircleHeart, Sparkles, UserCircle2, ClipboardList } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import SplashScreen from "@/components/SplashScreen";
import HeroSlider from "@/components/home/HeroSlider";
import QuickActions from "@/components/home/QuickActions";
import WorkShowcase from "@/components/home/WorkShowcase";
import { Button } from "@/components/ui/button";
import ImageHero from "@/components/ui/ImageHero";
import SectionDivider from "@/components/ui/SectionDivider";
import PremiumCTA from "@/components/ui/PremiumCTA";
import emimosLogo from "@/assets/emimos-logo.png";
import emilyPhoto from "@/assets/emily-moseni.png";
import ernestPhoto from "@/assets/ernest-moseni.png";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if splash was shown in this session
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <AppLayout>
      <div className="safe-top">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 pt-4 mb-6"
        >
          <ImageHero
            imageSrc={emilyPhoto}
            imageAlt="EMIMOS leadership"
            title="Welcome to EMIMOS Services"
            subtitle="Everything your brand needs, in one place. Strategy, design, technology, and delivery."
            minHeightClass="min-h-[300px]"
            badge={
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={emimosLogo}
                  alt="EMIMOS Services"
                  className="w-11 h-11 object-contain rounded-xl bg-white/90 p-1.5"
                />
                <div className="leading-tight">
                  <p className="text-white font-heading font-bold">EMIMOS Services</p>
                  <p className="text-white/80 text-xs">Professional Services. Done Right.</p>
                </div>
              </div>
            }
            actions={
              <>
                <Button asChild className="bg-gold hover:bg-gold-dark text-navy-900 font-semibold">
                  <Link to="/services">
                    Explore Services
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="border border-white/50 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/order?service=branding">Order Now</Link>
                </Button>
              </>
            }
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-4 mb-6"
        >
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gold/15 flex items-center justify-center shrink-0">
                <MessageCircleHeart className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-heading font-semibold text-foreground">
                  Chat with Emi and find what you need
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Emi can guide you around the app, help you choose the right service, and offer one complimentary business diagnosis.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button
                    asChild
                    className="bg-gold hover:bg-gold-dark text-navy-900 font-semibold"
                  >
                    <Link to="/emi">
                      Open Emi
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/services">Browse Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Hero Slider */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <HeroSlider />
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <QuickActions />
        </motion.section>

        {/* Guided Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 mt-8"
        >
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            High-Value Next Steps
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Sparkles,
                title: "Map My Next Growth Move",
                desc: "Step into a realistic growth path and see what your next strong move can look like.",
                path: "/growth-playbook",
              },
              {
                icon: MessageCircleHeart,
                title: "Get Free Diagnosis",
                desc: "Receive a quick business diagnosis and clear action path.",
                path: "/emi",
              },
              {
                icon: ClipboardList,
                title: "Let Us Step Into Your Shoes",
                desc: "Answer a smart questionnaire and get a tailored next-step plan.",
                path: "/step-into-your-shoes",
              },
              {
                icon: UserCircle2,
                title: "Manage Your Profile",
                desc: "Keep your details and order journey organized.",
                path: "/profile",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-card p-4 rounded-2xl shadow-card border border-border"
              >
                <Link to={item.path} className="block">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mt-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  <span className="inline-flex items-center text-xs font-medium text-primary mt-2">
                    Open
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider />
        <WorkShowcase />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="px-4 pb-2"
        >
          <h2 className="text-h3 text-foreground mb-3">What Fits You Best?</h2>
          <div className="flex flex-wrap gap-2">
            {["Corporate", "SMEs", "Retail", "NGOs", "Events", "Professional Services"].map((sector) => (
              <button
                key={sector}
                type="button"
                onClick={() => navigate(`/emi?sector=${encodeURIComponent(sector)}`)}
                className="rounded-full border border-[#1f4ea3]/70 bg-[#1f4ea3] px-3.5 py-1.5 text-small font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-[#1f4ea3] hover:shadow-gold active:scale-[0.98]"
              >
                {sector}
              </button>
            ))}
          </div>
        </motion.section>

        {/* About Us CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-4 mt-8 pb-4"
        >
          <ImageHero
            imageSrc={ernestPhoto}
            imageAlt="Learn more about EMIMOS"
            title="Want to know more about us?"
            subtitle="Meet the leadership and learn about our mission."
            minHeightClass="min-h-[220px]"
            actions={
              <Button
                asChild
                className="btn-gold-glow bg-gold hover:bg-gold-light text-navy-900 font-semibold"
              >
                <Link to="/about">
                  About EMIMOS
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            }
          />
        </motion.section>

        <PremiumCTA
          title="Ready To Move Faster?"
          subtitle="Book consultancy, start your order, or chat with Emi for guided next steps."
        />
      </div>
    </AppLayout>
  );
};

export default Index;
