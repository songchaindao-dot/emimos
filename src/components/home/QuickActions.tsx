import { motion } from "framer-motion";
import { ShoppingBag, ClipboardList, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: ShoppingBag,
    label: "Order a Service",
    path: "/services",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: ClipboardList,
    label: "View My Orders",
    path: "/orders",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Headphones,
    label: "Contact Support",
    path: "/contact",
    color: "bg-success/10 text-success",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(action.path)}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-card border border-border hover:border-gold/30 transition-all"
          >
            <div className={`p-3 rounded-xl ${action.color}`}>
              <action.icon size={22} />
            </div>
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
