import { motion } from "framer-motion";
import { LucideIcon, Check } from "lucide-react";

interface PaymentMethodCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const PaymentMethodCard = ({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: PaymentMethodCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
        selected
          ? "bg-primary/5 border-gold shadow-gold/20"
          : "bg-card border-border hover:border-gold/30"
      }`}
    >
      <div className={`p-3 rounded-xl ${selected ? "bg-gold/20" : "bg-muted"}`}>
        <Icon size={24} className={selected ? "text-gold" : "text-muted-foreground"} />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-heading font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 bg-gold rounded-full flex items-center justify-center"
        >
          <Check size={14} className="text-navy-900" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default PaymentMethodCard;
