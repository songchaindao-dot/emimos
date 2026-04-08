import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import StepIndicator from "@/components/ui/StepIndicator";
import { buildOrderEmailUrl, createOrder, getCurrentOrderUser } from "@/lib/orders";
import { trackEvent } from "@/lib/analytics";

const steps = ["Customer Info", "Order Details", "Summary"];

const serviceNames: Record<string, string> = {
  branding: "Branding & Visual Identity",
  writing: "Professional Writing & Editing",
  "cv-career": "CV & Career Branding",
  "audio-visual": "Audio & Visual Advertising",
  "social-media": "Social Media Management",
  events: "Event Planning & Coordination",
  website: "Website Development",
  app: "App Development",
  hosting: "Domain, Email & Hosting",
};

const OrderForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service") || "branding";
  const serviceName = serviceNames[serviceId] || "Service";
  const savedUser = getCurrentOrderUser();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: savedUser?.fullName ?? "",
    phone: savedUser?.phone ?? "",
    email: savedUser?.email ?? "",
    description: "",
    files: [] as File[],
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.fullName && formData.phone && formData.email;
    }
    if (currentStep === 1) {
      return formData.description;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const reference = `EMM-${Date.now().toString(36).toUpperCase()}`;
      const createdOrder = createOrder({
        serviceName,
        formData,
        reference,
      });
      trackEvent("order_submitted", {
        serviceId,
        orderId: createdOrder.id,
      });

      const emailUrl = buildOrderEmailUrl(createdOrder);
      navigate("/order-placed", {
        state: {
          serviceId,
          serviceName,
          orderId: createdOrder.id,
          reference: createdOrder.reference,
          orderStatus: createdOrder.status,
          emailNotification: "prepared",
        },
      });

      setTimeout(() => {
        window.location.href = emailUrl;
      }, 120);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
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
              onClick={handleBack}
              className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Order Form
            </h1>
          </div>
        </motion.header>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <div className="px-4 pb-32">
          <AnimatePresence mode="wait">
            {/* Step 1: Customer Info */}
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-card p-4 rounded-2xl shadow-card border border-border">
                  <h2 className="font-heading font-semibold text-foreground mb-4">
                    Your Information
                  </h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="rounded-xl h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+260 97 XXX XXXX"
                        className="rounded-xl h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="rounded-xl h-12"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Order Details */}
            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-card p-4 rounded-2xl shadow-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-semibold text-foreground">
                      Order Details
                    </h2>
                    <span className="text-sm text-gold font-medium">
                      {serviceName}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description / Instructions
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Tell us what you need..."
                        className="rounded-xl min-h-[150px] resize-none"
                      />
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                      <Label>Attach Files (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-gold/50 transition-colors">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <Upload size={24} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Tap to upload files
                          </span>
                        </label>
                      </div>

                      {/* File List */}
                      {formData.files.length > 0 && (
                        <div className="space-y-2 mt-3">
                          {formData.files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 bg-muted p-3 rounded-xl"
                            >
                              <FileText size={18} className="text-primary" />
                              <span className="flex-1 text-sm truncate">
                                {file.name}
                              </span>
                              <button
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-destructive/10 rounded-full"
                              >
                                <X size={16} className="text-destructive" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Summary */}
            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-card p-4 rounded-2xl shadow-card border border-border">
                  <h2 className="font-heading font-semibold text-foreground mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-medium text-foreground">
                        {serviceName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Customer</span>
                      <span className="font-medium text-foreground">
                        {formData.fullName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium text-foreground">
                        {formData.phone}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium text-foreground">
                        {formData.email}
                      </span>
                    </div>

                    <div className="py-2">
                      <span className="text-muted-foreground block mb-1">
                        Description
                      </span>
                      <p className="text-sm text-foreground">
                        {formData.description}
                      </p>
                    </div>

                    {formData.files.length > 0 && (
                      <div className="py-2">
                        <span className="text-muted-foreground block mb-2">
                          Attached Files ({formData.files.length})
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {formData.files.map((file, index) => (
                            <span
                              key={index}
                              className="text-xs bg-muted px-2 py-1 rounded-lg"
                            >
                              {file.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Editable Notes */}
                <div className="bg-card p-4 rounded-2xl shadow-card border border-border">
                  <Label htmlFor="notes" className="mb-2 block">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional information..."
                    className="rounded-xl min-h-[80px] resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky CTA */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom"
        >
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full py-6 text-lg font-heading font-semibold bg-gold hover:bg-gold-dark text-navy-900 rounded-xl shadow-gold disabled:opacity-50 disabled:shadow-none"
          >
            {currentStep === steps.length - 1 ? "Place Order" : "Continue"}
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default OrderForm;
