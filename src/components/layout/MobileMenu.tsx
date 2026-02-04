import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Briefcase, ClipboardList, Info, Phone, User, Download } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Briefcase, label: "Services", path: "/services" },
  { icon: ClipboardList, label: "Orders", path: "/orders" },
  { icon: Info, label: "About", path: "/about" },
  { icon: Phone, label: "Contact", path: "/contact" },
  { icon: User, label: "Profile", path: "/profile" },
];

interface MobileMenuProps {
  onDownload?: () => void;
}

const MobileMenu = ({ onDownload }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative z-50 bg-card/90 border-border shadow-card"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay & Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[80vw] max-w-72 bg-card border-r border-border shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <BrandLogo size="sm" showText linkToHome onClick={() => setIsOpen(false)} />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="bg-card/90 border-border"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <nav className="p-4 space-y-1 bg-card">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer CTA */}
              <div className="p-4 border-t border-border bg-card space-y-3">
                <Button variant="outline" className="w-full gap-2" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  Download App
                </Button>
                <Button
                  onClick={() => handleNavigate("/services")}
                  className="w-full btn-gold-glow bg-gold hover:bg-gold-light text-navy-900 font-semibold"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
