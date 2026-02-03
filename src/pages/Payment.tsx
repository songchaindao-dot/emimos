import { useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import PaymentMethodCard from "@/components/payment/PaymentMethodCard";
import MobileMoneyProvider from "@/components/payment/MobileMoneyProvider";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PaymentMethod = "card" | "mobile";
type MobileProvider = "airtel" | "mtn" | "zamtel";
type PaymentStatus = "idle" | "confirming" | "processing" | "success" | "failed";

const providers = [
  { id: "airtel" as MobileProvider, name: "Airtel Money", logo: "A", color: "#E40000" },
  { id: "mtn" as MobileProvider, name: "MTN MoMo", logo: "M", color: "#FFCC00" },
  { id: "zamtel" as MobileProvider, name: "Zamtel Kwacha", logo: "Z", color: "#00A651" },
];

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const serviceName = location.state?.serviceName || "Service";

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<MobileProvider | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  // Card payment state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const canProceed = () => {
    if (paymentMethod === "mobile") {
      return selectedProvider && mobileNumber.length >= 10;
    }
    if (paymentMethod === "card") {
      return cardNumber.length >= 16 && cardExpiry && cardCvv && cardName;
    }
    return false;
  };

  const handlePayNow = () => {
    if (paymentMethod === "mobile") {
      setShowConfirmDialog(true);
    } else {
      processPayment();
    }
  };

  const processPayment = () => {
    setShowConfirmDialog(false);
    setPaymentStatus("processing");

    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      setPaymentStatus(success ? "success" : "failed");

      setTimeout(() => {
        navigate("/payment-result", {
          state: {
            success,
            serviceName,
            reference: `EMM-${Date.now().toString(36).toUpperCase()}`,
          },
        });
      }, 1500);
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  if (paymentStatus === "processing") {
    return (
      <AppLayout showNav={false}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner
            message="Waiting for payment confirmation..."
            submessage={
              paymentMethod === "mobile"
                ? "Please complete the USSD prompt on your phone"
                : "Processing your card payment"
            }
          />
        </div>
      </AppLayout>
    );
  }

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
              Payment
            </h1>
          </div>
        </motion.header>

        <div className="px-4 py-6 pb-32">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-4 mb-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-primary-foreground/70 text-sm">Service</p>
                <p className="text-primary-foreground font-semibold">
                  {serviceName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-primary-foreground/70 text-sm">Amount</p>
                <p className="text-gold text-xl font-bold">K500.00</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3 mb-6"
          >
            <h2 className="font-heading font-semibold text-foreground">
              Select Payment Method
            </h2>

            <PaymentMethodCard
              icon={CreditCard}
              title="Credit / Debit Card"
              description="Visa, Mastercard, and more"
              selected={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
            />

            <PaymentMethodCard
              icon={Smartphone}
              title="Mobile Money"
              description="Airtel, MTN, Zamtel"
              selected={paymentMethod === "mobile"}
              onClick={() => setPaymentMethod("mobile")}
            />
          </motion.div>

          {/* Payment Details */}
          <AnimatePresence mode="wait">
            {paymentMethod === "mobile" && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <h3 className="font-heading font-semibold text-foreground">
                  Select Provider
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {providers.map((provider) => (
                    <MobileMoneyProvider
                      key={provider.id}
                      name={provider.name}
                      logo={provider.logo}
                      color={provider.color}
                      selected={selectedProvider === provider.id}
                      onClick={() => setSelectedProvider(provider.id)}
                    />
                  ))}
                </div>

                {selectedProvider && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="097X XXX XXXX"
                      className="rounded-xl h-12"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {paymentMethod === "card" && (
              <motion.div
                key="card"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card p-4 rounded-2xl shadow-card border border-border space-y-4"
              >
                <h3 className="font-heading font-semibold text-foreground">
                  Card Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="rounded-xl h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry</Label>
                    <Input
                      id="cardExpiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      placeholder="•••"
                      maxLength={4}
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* USSD Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading">Confirm Payment</DialogTitle>
              <DialogDescription className="text-left">
                You will receive a USSD prompt on{" "}
                <span className="font-semibold text-foreground">{mobileNumber}</span> to
                approve this payment of{" "}
                <span className="font-semibold text-gold">K500.00</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-800">
              <AlertCircle size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Please complete the USSD prompt on your phone within 60 seconds to
                confirm the payment.
              </p>
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={processPayment}
                className="bg-gold hover:bg-gold-dark text-navy-900 rounded-xl"
              >
                Pay Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sticky CTA */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom"
        >
          <Button
            onClick={handlePayNow}
            disabled={!canProceed()}
            className="w-full py-6 text-lg font-heading font-semibold bg-gold hover:bg-gold-dark text-navy-900 rounded-xl shadow-gold disabled:opacity-50 disabled:shadow-none"
          >
            Pay K500.00
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Payment;
