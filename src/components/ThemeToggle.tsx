import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-full shadow-sm hover:shadow-md transition-all"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon size={18} className="text-gold" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Sun size={18} className="text-gold" />
      </motion.div>
      <span className="text-xs font-medium text-foreground ml-5">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
