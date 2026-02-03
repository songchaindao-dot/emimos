import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  submessage?: string;
}

const LoadingSpinner = ({
  message = "Loading...",
  submessage,
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-muted rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.3 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-gold rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-foreground font-medium"
      >
        {message}
      </motion.p>
      {submessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-sm text-muted-foreground text-center px-8"
        >
          {submessage}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
