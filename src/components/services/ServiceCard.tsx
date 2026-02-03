import { motion } from "framer-motion";
import { LucideIcon, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  index: number;
}

const ServiceCard = ({ id, icon: Icon, title, description, price, index }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/services/${id}`)}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card border border-border hover:border-gold/30 hover:shadow-gold/10 transition-all text-left"
    >
      <div className="p-3 bg-primary/10 rounded-xl shrink-0">
        <Icon size={24} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-foreground truncate">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {description}
        </p>
        <p className="text-xs text-gold font-medium mt-1">{price}</p>
      </div>
      <ChevronRight size={20} className="text-muted-foreground shrink-0" />
    </motion.button>
  );
};

export default ServiceCard;
