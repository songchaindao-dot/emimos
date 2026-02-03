import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Palette, FileText, Volume2, Calendar, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const heroCards = [
  {
    id: "branding",
    icon: Palette,
    title: "Branding & Design",
    description: "Craft your unique visual identity with logos, brand guidelines, and marketing materials.",
    gradient: "from-navy-600 to-navy-800",
  },
  {
    id: "writing",
    icon: FileText,
    title: "Writing & Documents",
    description: "Professional writing, editing, and document services for business excellence.",
    gradient: "from-navy-700 to-navy-900",
  },
  {
    id: "audio-visual",
    icon: Volume2,
    title: "Audio & Visual Ads",
    description: "Captivating audio and visual content that makes your brand unforgettable.",
    gradient: "from-navy-600 to-navy-700",
  },
  {
    id: "events",
    icon: Calendar,
    title: "Event Planning",
    description: "End-to-end event coordination for memorable corporate and private occasions.",
    gradient: "from-navy-700 to-navy-800",
  },
  {
    id: "development",
    icon: Code,
    title: "Web & App Development",
    description: "Custom digital solutions that power your business growth online.",
    gradient: "from-navy-600 to-navy-900",
  },
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroCards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroCards.length) % heroCards.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroCards.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl mx-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative bg-gradient-to-br ${heroCards[currentIndex].gradient} p-6 min-h-[200px] flex flex-col justify-between`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gold/20 rounded-xl">
                  {(() => {
                    const IconComponent = heroCards[currentIndex].icon;
                    return <IconComponent size={24} className="text-gold" />;
                  })()}
                </div>
                <h3 className="text-xl font-heading font-bold text-primary-foreground">
                  {heroCards[currentIndex].title}
                </h3>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
                {heroCards[currentIndex].description}
              </p>
            </div>

            <Button
              onClick={() => navigate(`/services/${heroCards[currentIndex].id}`)}
              className="relative z-10 w-fit bg-gold hover:bg-gold-dark text-navy-900 font-semibold rounded-xl shadow-gold"
            >
              Order Now
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-1 top-1/2 -translate-y-1/2 p-2 bg-card/90 rounded-full shadow-card backdrop-blur-sm"
      >
        <ChevronLeft size={18} className="text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-card/90 rounded-full shadow-card backdrop-blur-sm"
      >
        <ChevronRight size={18} className="text-foreground" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {heroCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-gold"
                : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
