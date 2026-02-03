import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Home, ClipboardList, RefreshCw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const PaymentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, serviceName, reference } = location.state || {
    success: false,
    serviceName: "Service",
    reference: "N/A",
  };

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
            success ? "bg-success/10" : "bg-destructive/10"
          }`}
        >
          {success ? (
            <CheckCircle size={48} className="text-success" />
          ) : (
            <XCircle size={48} className="text-destructive" />
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-2xl font-heading font-bold ${
            success ? "text-success" : "text-destructive"
          }`}
        >
          {success ? "Payment Successful" : "Payment Failed"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center mt-2 mb-8"
        >
          {success
            ? "Your order has been placed successfully!"
            : "There was an issue processing your payment."}
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm bg-card p-6 rounded-2xl shadow-card border border-border mb-8"
        >
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-foreground">{serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium text-gold">K500.00</span>
            </div>
            {success && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-mono text-sm text-foreground">
                  {reference}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm space-y-3"
        >
          {success ? (
            <>
              <Button
                onClick={() => navigate("/orders")}
                className="w-full py-6 bg-gold hover:bg-gold-dark text-navy-900 font-semibold rounded-xl shadow-gold"
              >
                <ClipboardList size={20} className="mr-2" />
                View Order
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full py-6 rounded-xl"
              >
                <Home size={20} className="mr-2" />
                Back to Home
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate(-1)}
                className="w-full py-6 bg-gold hover:bg-gold-dark text-navy-900 font-semibold rounded-xl shadow-gold"
              >
                <RefreshCw size={20} className="mr-2" />
                Retry Payment
              </Button>
              <Button
                onClick={() => navigate("/contact")}
                variant="outline"
                className="w-full py-6 rounded-xl"
              >
                <Headphones size={20} className="mr-2" />
                Contact Support
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default PaymentResult;
