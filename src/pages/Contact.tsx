import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import ImageHero from "@/components/ui/ImageHero";
import PremiumCTA from "@/components/ui/PremiumCTA";
import emilyPhoto from "@/assets/emily-moseni.png";
import { IMAGE_FOCAL } from "@/lib/visuals";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "+260 977 759 867",
      action: () => window.open("tel:+260977759867"),
      color: "bg-success/10 text-success",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Chat with us directly",
      action: () =>
        window.open(
          "https://wa.me/260977759867?text=Hello, I need assistance with EMIMOS Services.",
          "_blank"
        ),
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      subtitle: "Send us an email directly",
      action: () => window.open("mailto:emilymoseni22@gmail.com"),
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <AppLayout>
      <div className="safe-top px-4 pt-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <ImageHero
            imageSrc={emilyPhoto}
            imageAlt="Contact EMIMOS"
            title="Contact & Support"
            subtitle="Our support team is ready to help you move forward quickly and clearly."
            minHeightClass="min-h-[250px]"
            imagePositionClass={IMAGE_FOCAL.heroPrimary}
            actions={
              <>
                <Button asChild className="bg-gold hover:bg-gold-dark text-navy-900 font-semibold">
                  <Link to="/emi">Ask Emi</Link>
                </Button>
                <Button
                  onClick={() => window.open("tel:+260977759867")}
                  variant="secondary"
                  className="bg-white text-navy-900 hover:bg-white/90 border border-white/80"
                >
                  Call Us
                </Button>
              </>
            }
          />
        </motion.div>

        {/* Contact Methods */}
        <div className="space-y-3 mb-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Button
                onClick={method.action}
                variant="outline"
                className="w-full h-auto p-4 rounded-2xl border-border hover:border-gold/30 justify-start"
              >
                <div className={`p-3 rounded-xl ${method.color} mr-4`}>
                  <method.icon size={22} />
                </div>
                <div className="text-left">
                  <p className="font-heading font-semibold text-foreground">
                    {method.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl shadow-card border border-border p-4 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gold/10 rounded-xl">
              <Clock size={18} className="text-gold" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">
              Business Hours
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monday - Friday</span>
              <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Saturday</span>
              <span className="font-medium text-foreground">9:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sunday</span>
              <span className="font-medium text-foreground">Closed</span>
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl shadow-card border border-border p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <MapPin size={18} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">
              Our Location
            </h3>
          </div>
          <p className="text-muted-foreground text-sm">
            EMIMOS Services<br />
            Cairo Road, Lusaka<br />
            Zambia
          </p>
        </motion.div>
      </div>
      <PremiumCTA
        title="Need A Fast Strategic Response?"
        subtitle="Book consultancy, start an order, or let Emi guide your next move."
      />
    </AppLayout>
  );
};

export default Contact;
