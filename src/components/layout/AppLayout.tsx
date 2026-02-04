import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";
import MobileMenu from "./MobileMenu";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showThemeToggle?: boolean;
  showHeader?: boolean;
}

const AppLayout = ({ children, showNav = true, showThemeToggle = true, showHeader = true }: AppLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header with Logo, Hamburger Menu and Theme Toggle */}
      {showHeader && (
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/50"
        >
          {/* Left side: Hamburger (mobile) or Logo */}
          <div className="flex items-center gap-2">
            {isMobile && <MobileMenu />}
            {!isHomePage && !isMobile && (
              <BrandLogo size="sm" showText linkToHome />
            )}
            {isHomePage && !isMobile && <div className="w-10" />}
          </div>
          
          {/* Theme Toggle */}
          {showThemeToggle && <ThemeToggle />}
        </motion.header>
      )}
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${showNav ? "pb-24" : ""} ${showHeader ? "pt-16" : ""}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {showNav && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;
