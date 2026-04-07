import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, Home, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    serviceName,
    orderId,
    reference,
    orderStatus,
    emailNotification,
  } = location.state || {
    serviceName: "Service",
    orderId: undefined,
    reference: "N/A",
    orderStatus: "pending",
    emailNotification: "unavailable",
  };

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-background px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-card shadow-card overflow-hidden"
          >
            <div className="bg-gradient-to-br from-success/15 via-gold/10 to-background px-6 pt-8 pb-6 text-center border-b border-border">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 bg-success/10 ring-8 ring-success/5"
              >
                <CheckCircle size={48} className="text-success" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success mb-4"
              >
                <Sparkles size={16} />
                Request received
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-heading font-bold text-foreground"
              >
                Order Placed
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-center mt-3 max-w-sm mx-auto"
              >
                Your order has been submitted successfully. EMIMOS will contact you soon with the next steps.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="px-6 py-6"
            >
              <div className="rounded-2xl bg-muted/40 border border-border p-4 space-y-4 mb-5">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium text-foreground text-right">{serviceName}</span>
                </div>
                {orderId && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-mono text-sm text-foreground text-right">{orderId}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-sm text-foreground text-right">{reference}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-foreground capitalize">
                    {String(orderStatus).replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Email handoff</span>
                  <span className="font-medium text-foreground">
                    {emailNotification === "prepared" ? "Prepared" : "Unavailable"}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4 mb-6">
                <p className="text-sm font-medium text-foreground mb-2">What happens next</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. EMIMOS reviews your request details.</p>
                  <p>2. We contact you soon using your saved phone number or email.</p>
                  <p>3. Your order stays visible in My Orders while we update its progress.</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="space-y-3"
              >
                <Button
                  onClick={() => navigate(orderId ? `/orders/${orderId}` : "/orders?tab=mine")}
                  className="w-full py-6 bg-gold hover:bg-gold-dark text-navy-900 font-semibold rounded-xl shadow-gold"
                >
                  <ClipboardList size={20} className="mr-2" />
                  Return to Orders
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="w-full py-6 rounded-xl font-semibold"
                >
                  <Home size={20} className="mr-2" />
                  Return to Home
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OrderPlaced;
