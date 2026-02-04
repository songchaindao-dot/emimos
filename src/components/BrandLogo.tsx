import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import emimosLogo from "@/assets/emimos-logo.png";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  linkToHome?: boolean;
  onClick?: () => void;
}

const BrandLogo = ({ size = "md", showText = false, linkToHome = true, onClick }: BrandLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const content = (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img 
        src={emimosLogo} 
        alt="EMIMOS Services" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-sm font-heading font-bold text-foreground leading-tight">
            EMIMOS
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            Services
          </span>
        </div>
      )}
    </motion.div>
  );

  if (linkToHome) {
    return (
      <Link to="/" aria-label="Return to Home" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
