import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "hsl(43, 85%, 55%)"
                    : isActive
                    ? "hsl(220, 60%, 18%)"
                    : "hsl(220, 20%, 88%)",
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted || isActive ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </motion.div>
              <span
                className={`text-xs mt-2 font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted
                      ? "hsl(43, 85%, 55%)"
                      : "hsl(220, 20%, 88%)",
                  }}
                  className="h-1 w-12 rounded-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
