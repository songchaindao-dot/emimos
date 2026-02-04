import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import SplashScreen from "@/components/SplashScreen";
import HeroSlider from "@/components/home/HeroSlider";
import QuickActions from "@/components/home/QuickActions";
import emimosLogo from "@/assets/emimos-logo.png";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

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
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pt-4 pb-6"
        >
          <div className="flex items-center gap-3">
            <img 
              src={emimosLogo} 
              alt="EMIMOS Services" 
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-heading font-bold text-foreground">
                EMIMOS
              </span>
              <span className="text-xs text-primary font-medium">Services</span>
            </div>
          </div>
        </motion.header>

        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 mb-6"
        >
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Welcome to EMIMOS Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Everything your brand needs, in one place.
          </p>
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

        {/* Featured Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 mt-8"
        >
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Why Choose EMIMOS?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🎯", title: "Expert Team", desc: "Seasoned professionals" },
              { icon: "⚡", title: "Fast Delivery", desc: "Quick turnaround" },
              { icon: "💎", title: "Premium Quality", desc: "Excellence guaranteed" },
              { icon: "🤝", title: "24/7 Support", desc: "Always available" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-card p-4 rounded-2xl shadow-card border border-border"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
};

export default Index;
