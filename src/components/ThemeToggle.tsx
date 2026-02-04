import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-full w-24 h-9" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="relative flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-full shadow-card hover:shadow-lg overflow-hidden"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: isDark ? 0.1 : 0,
          background: isDark
            ? "radial-gradient(circle at center, hsl(43 90% 55%) 0%, transparent 70%)"
            : "none",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Icon container */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              <Moon size={18} className="text-gold" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              <Sun size={18} className="text-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs font-medium text-foreground min-w-[32px]"
        >
          {isDark ? "Dark" : "Light"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
