import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const mockOrderDetails: Record<string, {
  serviceName: string;
  orderDate: string;
  status: "pending" | "processing" | "completed" | "failed";
  paymentStatus: string;
  description: string;
  files: string[];
  timeline: { date: string; event: string; completed: boolean }[];
}> = {
  "ord-001": {
    serviceName: "Website Development",
    orderDate: "January 28, 2025",
    status: "processing",
    paymentStatus: "Paid",
    description: "Modern e-commerce website with product catalog, shopping cart, and payment integration.",
    files: ["requirements.pdf", "logo.png"],
    timeline: [
      { date: "Jan 28", event: "Order placed", completed: true },
      { date: "Jan 29", event: "Payment confirmed", completed: true },
      { date: "Jan 30", event: "Development started", completed: true },
      { date: "Feb 5", event: "First draft review", completed: false },
      { date: "Feb 14", event: "Final delivery", completed: false },
    ],
  },
  "ord-002": {
    serviceName: "Branding & Visual Identity",
    orderDate: "January 25, 2025",
    status: "pending",
    paymentStatus: "Paid",
    description: "Complete brand identity package including logo, color palette, and brand guidelines.",
    files: ["brand-brief.docx"],
    timeline: [
      { date: "Jan 25", event: "Order placed", completed: true },
      { date: "Jan 26", event: "Payment confirmed", completed: true },
      { date: "Pending", event: "Design started", completed: false },
      { date: "Pending", event: "Concept review", completed: false },
      { date: "Pending", event: "Final delivery", completed: false },
    ],
  },
  "ord-003": {
    serviceName: "CV & Career Branding",
    orderDate: "January 15, 2025",
    status: "completed",
    paymentStatus: "Paid",
    description: "Professional CV, cover letter, and LinkedIn profile optimization.",
    files: ["old-cv.pdf"],
    timeline: [
      { date: "Jan 15", event: "Order placed", completed: true },
      { date: "Jan 15", event: "Payment confirmed", completed: true },
      { date: "Jan 16", event: "Review started", completed: true },
      { date: "Jan 18", event: "First draft sent", completed: true },
      { date: "Jan 20", event: "Final delivery", completed: true },
    ],
  },
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = mockOrderDetails[id || ""] || mockOrderDetails["ord-001"];

  const statusConfig = {
    pending: { icon: Clock, label: "Pending", className: "bg-amber-100 text-amber-700" },
    processing: { icon: Clock, label: "Processing", className: "bg-blue-100 text-blue-700" },
    completed: { icon: CheckCircle, label: "Completed", className: "bg-green-100 text-green-700" },
    failed: { icon: AlertCircle, label: "Failed", className: "bg-red-100 text-red-700" },
  };

  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

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
                  {order.serviceName}
                </h2>
                <p className="text-sm text-muted-foreground">{order.orderDate}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.className}`}>
                <StatusIcon size={14} />
                {config.label}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{order.description}</p>
          </motion.div>

          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card p-4 rounded-2xl shadow-card border border-border mb-4"
          >
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Payment Status
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle size={20} className="text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">{order.paymentStatus}</p>
                <p className="text-sm text-muted-foreground">K500.00</p>
              </div>
            </div>
          </motion.div>

          {/* Files Submitted */}
          {order.files.length > 0 && (
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
                {order.files.map((file, index) => (
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
              {order.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.completed ? "bg-gold" : "bg-muted"
                      }`}
                    />
                    {index < order.timeline.length - 1 && (
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
            Contact Support
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default OrderDetail;
