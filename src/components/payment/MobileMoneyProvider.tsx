import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface MobileMoneyProviderProps {
  name: string;
  logo: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

const MobileMoneyProvider = ({
  name,
  logo,
  color,
  selected,
  onClick,
}: MobileMoneyProviderProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
        selected
          ? `border-gold bg-gradient-to-b from-card to-gold/5`
          : "border-border bg-card hover:border-gold/30"
      }`}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
        style={{ backgroundColor: color }}
      >
        {logo}
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-gold"
        >
          <Check size={14} className="text-navy-900" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default MobileMoneyProvider;
