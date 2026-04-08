import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Link2, Sparkles } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import ImageHero from "@/components/ui/ImageHero";
import PremiumCTA from "@/components/ui/PremiumCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import image5 from "@/assets/image 5.jpg";

type BusinessStage = "operating" | "idea";

interface ShoesFormData {
  stage: BusinessStage | "";
  businessName: string;
  idea: string;
  objective: string;
  challenge: string;
  audience: string;
  socialLinks: string;
}

interface Recommendation {
  serviceId: string;
  serviceTitle: string;
  reason: string;
}

const initialData: ShoesFormData = {
  stage: "",
  businessName: "",
  idea: "",
  objective: "",
  challenge: "",
  audience: "",
  socialLinks: "",
};

const questionFlow = [
  { key: "stage", label: "Is your business operating or just an idea?" },
  { key: "businessName", label: "What is your business name (or proposed name)?" },
  { key: "idea", label: "What are you building or trying to sell?" },
  { key: "objective", label: "What is your #1 objective in the next 90 days?" },
  { key: "challenge", label: "What is your biggest challenge right now?" },
  { key: "audience", label: "Who exactly are you trying to attract?" },
  { key: "socialLinks", label: "Add your social/business links (one per line)." },
] as const;

const encodeSearch = (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`;

const parseLinks = (socialLinks: string) =>
  socialLinks
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const containsAny = (value: string, words: string[]) => words.some((word) => value.includes(word));

const buildRecommendations = (data: ShoesFormData): Recommendation[] => {
  const text = `${data.idea} ${data.objective} ${data.challenge} ${data.audience}`.toLowerCase();
  const recommendations: Recommendation[] = [];

  if (data.stage === "idea" || containsAny(text, ["brand", "identity", "trust", "position"])) {
    recommendations.push({
      serviceId: "branding",
      serviceTitle: "Branding & Visual Identity",
      reason: "Your next leverage point is stronger brand clarity and trust positioning.",
    });
  }

  if (containsAny(text, ["social", "engagement", "awareness", "followers", "content"])) {
    recommendations.push({
      serviceId: "social-media",
      serviceTitle: "Social Media Management",
      reason: "Your growth target depends on consistent visibility and audience engagement.",
    });
  }

  if (containsAny(text, ["website", "online", "conversion", "enquiries", "leads"])) {
    recommendations.push({
      serviceId: "website",
      serviceTitle: "Website Development",
      reason: "You need a stronger conversion-ready online home to turn interest into enquiries.",
    });
  }

  if (containsAny(text, ["proposal", "copy", "writing", "message", "pitch"])) {
    recommendations.push({
      serviceId: "writing",
      serviceTitle: "Professional Writing & Editing",
      reason: "Sharper messaging will help your audience immediately understand your value.",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      serviceId: "branding",
      serviceTitle: "Branding & Visual Identity",
      reason: "Start with positioning and brand clarity, then scale outward into channels and conversion.",
    });
  }

  return recommendations.slice(0, 3);
};

const StepIntoYourShoes = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ShoesFormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questionFlow[step];
  const links = useMemo(() => parseLinks(form.socialLinks), [form.socialLinks]);
  const recommendations = useMemo(() => buildRecommendations(form), [form]);

  const ifIWereYou = useMemo(() => {
    const stageLine =
      form.stage === "operating"
        ? "Your business is already operating, so I would prioritize conversion efficiency and message clarity immediately."
        : "You are in idea stage, so I would first validate demand and build a premium-ready brand foundation.";

    const linkSignals = links.length
      ? `From your links, I would audit how your profile positioning, visual consistency, and call-to-action are performing before scaling spend.`
      : "Since you did not add links, I would begin with a fast visibility and positioning baseline review.";

    return [
      stageLine,
      `With your objective focused on "${form.objective || "growth"}", I would simplify your offer to one clear promise for ${form.audience || "your core audience"}.`,
      `For your current challenge (${form.challenge || "market traction"}), I would execute quick wins first, then lock in a 30-day implementation plan.`,
      linkSignals,
    ];
  }, [form, links]);

  const researchLinks = useMemo(() => {
    if (!links.length) return [];
    return links.slice(0, 4).map((link) => ({
      label: `Signal scan: ${link.replace(/^https?:\/\//, "").slice(0, 38)}`,
      url: encodeSearch(`${form.businessName} brand audit ${link}`),
    }));
  }, [links, form.businessName]);

  const canContinue = (() => {
    const key = currentQuestion.key;
    if (key === "stage") return form.stage !== "";
    return Boolean((form[key as keyof ShoesFormData] as string).trim());
  })();

  const handleNext = () => {
    if (step < questionFlow.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }
    setSubmitted(true);
    setOpen(false);
  };

  const reset = () => {
    setForm(initialData);
    setStep(0);
    setSubmitted(false);
  };

  return (
    <AppLayout>
      <div className="safe-top px-4 pt-4 pb-4">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          <ImageHero
            imageSrc={image5}
            imageAlt="Step into your shoes"
            title="Let Us Step Into Your Shoes"
            subtitle="Answer a smart questionnaire and get a realistic If-I-Were-You action plan in a practical business tone."
            minHeightClass="min-h-[300px]"
            actions={
              <Button className="bg-gold hover:bg-gold-dark text-navy-900 font-semibold" onClick={() => setOpen(true)}>
                Start Smart Questionnaire
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            }
          />
        </motion.section>

        {!submitted ? (
          <div className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-5 shadow-card">
            <h2 className="text-h3 text-foreground">How It Works</h2>
            <ul className="mt-3 space-y-2 text-small text-muted-foreground">
              <li>1. You answer strategic business questions.</li>
              <li>2. We analyze your stage, challenge, goals, and link signals.</li>
              <li>3. You receive an “If I Were You” next-step judgement with service-aligned actions.</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-5 shadow-card">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <h2 className="text-h2 text-foreground">If I Were You</h2>
              </div>
              <p className="text-small text-muted-foreground mt-1">
                Business: {form.businessName || "Your Business"} | Stage: {form.stage || "Not selected"}
              </p>
              <div className="mt-4 space-y-3">
                {ifIWereYou.map((line, index) => (
                  <p key={`line-${index}`} className="text-body text-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {researchLinks.length > 0 && (
              <div className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-5 shadow-card">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <h3 className="text-h3 text-foreground">Link-Based Signal Searches</h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {researchLinks.map((item) => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-3 py-1 text-small text-foreground hover:bg-muted"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-5 shadow-card">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-h3 text-foreground">Recommended Next Services</h3>
              </div>
              <div className="mt-4 space-y-3">
                {recommendations.map((item) => (
                  <div key={item.serviceId} className="rounded-xl border border-border bg-background/70 p-4">
                    <p className="font-heading font-semibold text-foreground">{item.serviceTitle}</p>
                    <p className="text-small text-muted-foreground mt-1">{item.reason}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button asChild className="bg-gold hover:bg-gold-dark text-navy-900">
                        <Link to={`/order?service=${item.serviceId}`}>Order This Service</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to={`/services/${item.serviceId}`}>View Service Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setOpen(true)} className="bg-gold hover:bg-gold-dark text-navy-900">
                Refine My Inputs
              </Button>
              <Button variant="outline" onClick={reset}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>

      <PremiumCTA
        title="Ready To Execute This Plan?"
        subtitle="Move from strategy to action with the right EMIMOS service in one click."
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Smart Questionnaire</DialogTitle>
            <DialogDescription>
              Question {step + 1} of {questionFlow.length}: {currentQuestion.label}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {currentQuestion.key === "stage" && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={form.stage === "operating" ? "default" : "outline"}
                  onClick={() => setForm((prev) => ({ ...prev, stage: "operating" }))}
                >
                  Operating
                </Button>
                <Button
                  variant={form.stage === "idea" ? "default" : "outline"}
                  onClick={() => setForm((prev) => ({ ...prev, stage: "idea" }))}
                >
                  Idea Stage
                </Button>
              </div>
            )}

            {currentQuestion.key !== "stage" && currentQuestion.key !== "socialLinks" && (
              <Input
                value={form[currentQuestion.key as keyof ShoesFormData] as string}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    [currentQuestion.key]: event.target.value,
                  }))
                }
                placeholder="Type your answer..."
              />
            )}

            {currentQuestion.key === "socialLinks" && (
              <Textarea
                value={form.socialLinks}
                onChange={(event) => setForm((prev) => ({ ...prev, socialLinks: event.target.value }))}
                placeholder={"https://instagram.com/yourbrand\nhttps://facebook.com/yourbrand"}
                className="min-h-[120px]"
              />
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canContinue}>
              {step === questionFlow.length - 1 ? "Generate My Plan" : "Next"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default StepIntoYourShoes;
