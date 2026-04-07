import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { getOrderById, getTeamEmail, updateOrderStatus } from "@/lib/orders";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState(() => getOrderById(id || ""));

  const fallbackOrder = useMemo(() => getOrderById("ord-001"), []);
  const currentOrder = order ?? fallbackOrder;

  const statusConfig = {
    pending: { icon: Clock, label: "Pending", className: "bg-amber-100 text-amber-700" },
    in_progress: { icon: Loader2, label: "In Progress", className: "bg-blue-100 text-blue-700" },
    completed: { icon: CheckCircle, label: "Completed", className: "bg-green-100 text-green-700" },
    failed: { icon: AlertCircle, label: "Failed", className: "bg-red-100 text-red-700" },
  };

  if (!currentOrder) {
    return null;
  }

  const config = statusConfig[currentOrder.status];
  const StatusIcon = config.icon;
  const nextAction =
    currentOrder.status === "pending"
      ? { label: "Confirm As In Progress", status: "in_progress" as const }
      : currentOrder.status === "in_progress"
        ? { label: "Mark As Completed", status: "completed" as const }
        : null;

  const handleStatusUpdate = () => {
    if (!id || !nextAction) return;
    const updatedOrder = updateOrderStatus(id, nextAction.status);
    if (updatedOrder) {
      setOrder(updatedOrder);
    }
  };

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-top"
        >
          <div className="flex items-center gap-4 px-4 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Order Details
            </h1>
          </div>
        </motion.header>

        <div className="px-4 py-6 pb-32">
          {/* Service Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-4 rounded-2xl shadow-card border border-border mb-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-heading font-semibold text-foreground text-lg">
                  {currentOrder.serviceName}
                </h2>
                <p className="text-sm text-muted-foreground">{currentOrder.orderDate}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.className}`}>
                <StatusIcon size={14} className={currentOrder.status === "in_progress" ? "animate-spin" : ""} />
                {config.label}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{currentOrder.description}</p>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>Reference: <span className="font-medium text-foreground">{currentOrder.reference}</span></p>
              <p>Customer: <span className="font-medium text-foreground">{currentOrder.customerName}</span></p>
              <p>Email: <span className="font-medium text-foreground">{currentOrder.email}</span></p>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card p-4 rounded-2xl shadow-card border border-border mb-4"
          >
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Order Summary
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle size={20} className="text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground capitalize">
                  {currentOrder.status.replace("_", " ")}
                </p>
                <p className="text-sm text-muted-foreground">{currentOrder.paymentStatus}</p>
              </div>
            </div>
          </motion.div>

          {nextAction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card p-4 rounded-2xl shadow-card border border-border mb-4"
            >
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Order Workflow
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                New requests are saved as pending until you confirm them, then move them to in progress and completed.
              </p>
              <Button onClick={handleStatusUpdate} className="w-full rounded-xl bg-gold hover:bg-gold-dark text-navy-900">
                {nextAction.label}
              </Button>
            </motion.div>
          )}

          {/* Files Submitted */}
          {currentOrder.files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-4 rounded-2xl shadow-card border border-border mb-4"
            >
              <h3 className="font-heading font-semibold text-foreground mb-3">
                Files Submitted
              </h3>
              <div className="space-y-2">
                {currentOrder.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-muted p-3 rounded-xl"
                  >
                    <FileText size={18} className="text-primary" />
                    <span className="text-sm text-foreground">{file}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-4 rounded-2xl shadow-card border border-border"
          >
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Timeline
            </h3>
            <div className="space-y-4">
              {currentOrder.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.completed ? "bg-gold" : "bg-muted"
                      }`}
                    />
                    {index < currentOrder.timeline.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 mt-1 ${
                          item.completed ? "bg-gold/30" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <p
                      className={`font-medium ${
                        item.completed ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Support Button */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom"
        >
          <Button
            onClick={() => navigate("/contact")}
            variant="outline"
            className="w-full py-6 rounded-xl font-semibold"
          >
            <MessageCircle size={20} className="mr-2" />
            Contact Support ({getTeamEmail()})
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default OrderDetail;
