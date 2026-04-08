import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Compass, Lightbulb, Rocket } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import ImageHero from "@/components/ui/ImageHero";
import PremiumCTA from "@/components/ui/PremiumCTA";
import { Button } from "@/components/ui/button";
import image4 from "@/assets/image 4.jpg";
import poster1 from "@/assets/photo_2026-04-07_17-20-57.jpg";
import poster2 from "@/assets/photo_2026-04-07_17-21-06.jpg";
import poster3 from "@/assets/photo_2026-04-07_17-21-16.jpg";

const scenarioCards = [
  {
    icon: Compass,
    title: "Clarity Stage",
    text: "You stop guessing and start with one offer your market can clearly understand and trust.",
  },
  {
    icon: Lightbulb,
    title: "Positioning Stage",
    text: "Your message, visuals, and online presence begin to look like a premium brand people remember.",
  },
  {
    icon: BarChart3,
    title: "Conversion Stage",
    text: "Enquiries become more consistent because your value and next step are now obvious.",
  },
  {
    icon: Rocket,
    title: "Scale Stage",
    text: "You scale with better systems and stronger execution instead of random effort.",
  },
];

const GrowthPlaybook = () => {
  return (
    <AppLayout>
      <div className="safe-top px-4 pt-4">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          <ImageHero
            imageSrc={image4}
            imageAlt="Growth strategy"
            title="Map My Next Growth Move"
            subtitle="Imagine your business 6 months from now with clearer positioning, stronger trust, and better conversion. This page turns that fantasy into an actionable path."
            minHeightClass="min-h-[320px]"
            actions={
              <>
                <Button asChild className="bg-gold hover:bg-gold-dark text-navy-900 font-semibold">
                  <Link to="/step-into-your-shoes">
                    Step Into My Shoes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="border border-white/50 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/services">Browse Services</Link>
                </Button>
              </>
            }
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="mb-6"
        >
          <h2 className="text-h2 text-foreground mb-3">Your Realistic Growth Fantasy</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {scenarioCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.05, duration: 0.2 }}
                className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-4 shadow-card"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-h3 text-foreground mt-3">{item.title}</h3>
                <p className="text-small text-muted-foreground mt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="mb-8"
        >
          <h2 className="text-h3 text-foreground mb-3">What This Looks Like In Real Campaigns</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[poster1, poster2, poster3].map((image, index) => (
              <img
                key={`growth-sample-${index}`}
                src={image}
                alt="EMIMOS campaign sample"
                loading="lazy"
                className="w-full h-52 object-cover rounded-2xl border border-border shadow-card"
              />
            ))}
          </div>
        </motion.section>
      </div>

      <PremiumCTA
        title="Ready To Turn Vision Into Results?"
        subtitle="Use the smart planner next and get a tailored “If I Were You” strategy linked to the right service."
      />
    </AppLayout>
  );
};

export default GrowthPlaybook;
