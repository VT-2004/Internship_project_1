import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface Props {
  message: string;
}

export default function ErrorCard({ message }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 max-w-md mx-auto text-center"
    >
      <AlertTriangle className="h-10 w-10 text-destructive mx-auto mb-3" />
      <p className="text-foreground font-medium mb-1">Something went wrong</p>
      <p className="text-sm text-muted-foreground">{message}</p>
    </motion.div>
  );
}
