import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showThemeToggle?: boolean;
}

const AppLayout = ({ children, showNav = true, showThemeToggle = true }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle - Fixed at top right */}
      {showThemeToggle && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-50"
        >
          <ThemeToggle />
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={showNav ? "pb-24" : ""}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {showNav && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;
