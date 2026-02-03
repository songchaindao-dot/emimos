import { motion } from "framer-motion";
import { ChevronRight, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
  id: string;
  serviceName: string;
  orderDate: string;
  status: "pending" | "processing" | "completed" | "failed";
  index: number;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    className: "bg-amber-100 text-amber-700",
  },
  processing: {
    icon: Loader2,
    label: "Processing",
    className: "bg-blue-100 text-blue-700",
  },
  completed: {
    icon: CheckCircle,
    label: "Completed",
    className: "bg-green-100 text-green-700",
  },
  failed: {
    icon: AlertCircle,
    label: "Failed",
    className: "bg-red-100 text-red-700",
  },
};

const OrderCard = ({ id, serviceName, orderDate, status, index }: OrderCardProps) => {
  const navigate = useNavigate();
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/orders/${id}`)}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card border border-border hover:border-gold/30 transition-all text-left"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-foreground">
          {serviceName}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          {orderDate}
        </p>
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.className}`}>
        <StatusIcon size={14} className={status === "processing" ? "animate-spin" : ""} />
        {config.label}
      </div>
      <ChevronRight size={20} className="text-muted-foreground shrink-0" />
    </motion.button>
  );
};

export default OrderCard;
