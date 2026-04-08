import { Link } from "react-router-dom";
import { ArrowRight, MessageCircleHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumCTAProps {
  title: string;
  subtitle: string;
}

const PremiumCTA = ({ title, subtitle }: PremiumCTAProps) => {
  return (
    <section className="px-4 py-6">
      <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 shadow-card">
        <h3 className="text-h3 text-foreground">{title}</h3>
        <p className="text-body text-muted-foreground mt-2">{subtitle}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button asChild className="premium-action bg-gold hover:bg-gold-dark text-navy-900">
            <Link to="/contact">
              Book Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="premium-action">
            <Link to="/order?service=branding">Start Order</Link>
          </Button>
          <Button asChild variant="outline" className="premium-action">
            <Link to="/emi">
              <MessageCircleHeart className="mr-2 h-4 w-4" />
              Chat with Emi
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumCTA;
