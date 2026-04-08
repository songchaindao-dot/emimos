import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Expand,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  EMI_DIAGNOSIS_KEY,
  EMI_FIRST_CHAT_AT_KEY,
  EMI_HINT_KEY,
  EMI_MEMORY_TTL_MS,
  EMI_STORAGE_KEY,
  createEmiMessage,
  createUserMessage,
  diagnosisQuestions,
  emiServices,
  findServiceFromText,
  generateDiagnosis,
  getRouteFollowUp,
  initialEmiMessages,
  suggestGoalReply,
  type DiagnosisDraft,
  type EmiAction,
  type EmiMessage,
  type EmiMode,
} from "@/lib/emi";
import { downloadDiagnosisPdf } from "@/lib/diagnosis-pdf";
import { trackEvent } from "@/lib/analytics";

interface PendingRouteFollowUp {
  path: string;
  match: "exact" | "prefix";
  followUp: string;
}

interface StoredEmiState {
  messages: EmiMessage[];
  diagnosisUsed: boolean;
}

interface EmiMemoryContext {
  goal?: string;
  selectedService?: string;
  currentStep?: string;
}

const defaultDraft = (): DiagnosisDraft => ({
  businessName: "",
  industry: "",
  stage: "",
  challenge: "",
  goal: "",
  audience: "",
  location: "",
  budget: "",
});

const parseStoredState = (): StoredEmiState => {
  if (typeof window === "undefined") {
    return { messages: initialEmiMessages(), diagnosisUsed: false };
  }

  try {
    const raw = localStorage.getItem(EMI_STORAGE_KEY);
    const diagnosisUsed = localStorage.getItem(EMI_DIAGNOSIS_KEY) === "true";
    if (!raw) {
      return { messages: initialEmiMessages(), diagnosisUsed };
    }

    const parsed = JSON.parse(raw) as Partial<StoredEmiState>;
    return {
      messages:
        parsed.messages && parsed.messages.length > 0
          ? parsed.messages
          : initialEmiMessages(),
      diagnosisUsed,
    };
  } catch {
    return { messages: initialEmiMessages(), diagnosisUsed: false };
  }
};

const routeMatch = (pathname: string, pending: PendingRouteFollowUp) =>
  pending.match === "prefix"
    ? pathname.startsWith(pending.path)
    : pathname === pending.path;

const getPathOnly = (path: string) => path.split("?")[0];

const EmiAssistant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const messageViewportRef = useRef<HTMLDivElement | null>(null);
  const lastNonEmiPathRef = useRef("/");
  const pendingModeAfterRouteRef = useRef<EmiMode | null>(null);
  const lastSectorPromptRef = useRef<string | null>(null);

  const storedState = useMemo(() => parseStoredState(), []);

  const [mode, setMode] = useState<EmiMode>(
    location.pathname === "/emi" ? "full" : "closed",
  );
  const [messages, setMessages] = useState<EmiMessage[]>(storedState.messages);
  const [draftInput, setDraftInput] = useState("");
  const [diagnosisUsed, setDiagnosisUsed] = useState(storedState.diagnosisUsed);
  const [showHint, setShowHint] = useState(
    typeof window !== "undefined" &&
      location.pathname !== "/emi" &&
      localStorage.getItem(EMI_HINT_KEY) !== "true",
  );
  const [diagnosisStep, setDiagnosisStep] = useState<number | null>(null);
  const [diagnosisDraft, setDiagnosisDraft] = useState<DiagnosisDraft>(defaultDraft());
  const [pendingRoute, setPendingRoute] = useState<PendingRouteFollowUp | null>(null);
  const [isEmiTyping, setIsEmiTyping] = useState(false);
  const [memoryContext, setMemoryContext] = useState<EmiMemoryContext>({});
  const [lastDiagnosisSnapshot, setLastDiagnosisSnapshot] = useState<{
    businessName: string;
    overview: string;
    quickWins: string[];
    watchouts: string[];
    threeStepPlan: string[];
  } | null>(null);

  const visibleMode = location.pathname === "/emi" ? "full" : mode;

  useEffect(() => {
    if (location.pathname !== "/emi") {
      lastNonEmiPathRef.current = `${location.pathname}${location.search}`;
      if (pendingModeAfterRouteRef.current) {
        setMode(pendingModeAfterRouteRef.current);
        pendingModeAfterRouteRef.current = null;
      }
    } else {
      setMode("full");
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const firstChatAt = localStorage.getItem(EMI_FIRST_CHAT_AT_KEY);
    if (!firstChatAt) return;

    const age = Date.now() - Number(firstChatAt);
    if (Number.isFinite(age) && age > EMI_MEMORY_TTL_MS) {
      setMessages(initialEmiMessages());
      setDiagnosisUsed(false);
      setDiagnosisStep(null);
      setDiagnosisDraft(defaultDraft());
      setMemoryContext({});
      setLastDiagnosisSnapshot(null);
      localStorage.removeItem(EMI_STORAGE_KEY);
      localStorage.removeItem(EMI_DIAGNOSIS_KEY);
      localStorage.removeItem(EMI_FIRST_CHAT_AT_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      EMI_STORAGE_KEY,
      JSON.stringify({
        messages: messages.slice(-40),
        diagnosisUsed,
      }),
    );
    localStorage.setItem(EMI_DIAGNOSIS_KEY, diagnosisUsed ? "true" : "false");
  }, [messages, diagnosisUsed]);

  useEffect(() => {
    if (diagnosisStep !== null) {
      setMemoryContext((current) => ({ ...current, currentStep: "Diagnosis in progress" }));
    }
  }, [diagnosisStep]);

  useEffect(() => {
    if (!messageViewportRef.current) return;
    messageViewportRef.current.scrollTop = messageViewportRef.current.scrollHeight;
  }, [messages, visibleMode]);

  useEffect(() => {
    if (!pendingRoute) return;

    if (routeMatch(location.pathname, pendingRoute)) {
      setMessages((current) => [
        ...current,
        createEmiMessage(pendingRoute.followUp, [
          { label: "Help me choose next", type: "message", value: "Help me choose what to do next here" },
          { label: "Start an order", type: "navigate", path: "/services", followUp: getRouteFollowUp("/services"), match: "prefix" },
        ]),
      ]);
      setPendingRoute(null);
      setMode(isMobile ? "full" : "side");
    }
  }, [isMobile, location.pathname, pendingRoute]);

  useEffect(() => {
    if (location.pathname !== "/emi") return;

    const searchParams = new URLSearchParams(location.search);
    const sector = searchParams.get("sector")?.trim();
    if (!sector) return;
    if (lastSectorPromptRef.current === location.search) return;
    lastSectorPromptRef.current = location.search;

    const lowerSector = sector.toLowerCase();
    const article = /^[aeiou]/.test(lowerSector) ? "an" : "a";
    const userIntro =
      lowerSector === "ngos"
        ? "Hi, I am an NGO."
        : `Hi, I am ${article} ${sector}.`;

    const warmSectorLine =
      lowerSector === "corporate"
        ? "Great to meet you. Corporate teams often need clear timelines, governance-ready communication, and measurable outcomes."
        : lowerSector === "smes"
          ? "Great to meet you. SMEs usually benefit from focused, budget-aware moves that create visible momentum quickly."
          : lowerSector === "retail"
            ? "Great to meet you. Retail teams often need stronger offer messaging, better visibility, and conversion-focused execution."
            : lowerSector === "ngos"
              ? "Great to meet you. NGOs often need trust-led storytelling, donor-friendly communication, and clear impact visibility."
              : lowerSector === "events"
                ? "Great to meet you. Event teams usually need fast campaign execution, strong visuals, and on-time delivery."
                : "Great to meet you. Professional service teams often need premium positioning, authority-building content, and reliable lead flow.";

    const emiReply = `${warmSectorLine} Share a little more detail about your current goal, audience, and biggest challenge, and I will map your best next step.`;

    setMessages((current) => [
      ...current,
      createUserMessage(userIntro),
      createEmiMessage(emiReply, [
        { label: "Share my goal", type: "message", value: "My goal is to get more quality enquiries this quarter." },
        { label: "Find the right service", type: "message", value: "Help me choose the right service for my sector." },
      ]),
    ]);
  }, [location.pathname, location.search]);

  const pushMessage = (message: EmiMessage) => {
    setMessages((current) => [...current, message]);
  };

  const pushEmi = (content: string, actions?: EmiAction[]) => {
    pushMessage(createEmiMessage(content, actions));
  };

  const openAssistant = () => {
    if (location.pathname === "/emi") {
      setMode("full");
      return;
    }

    setMode(isMobile ? "full" : "side");
    setShowHint(false);
    localStorage.setItem(EMI_HINT_KEY, "true");
    trackEvent("emi_opened");
  };

  const dismissHint = () => {
    setShowHint(false);
    localStorage.setItem(EMI_HINT_KEY, "true");
  };

  const closeAssistant = () => {
    if (location.pathname === "/emi") {
      pendingModeAfterRouteRef.current = "closed";
      navigate(lastNonEmiPathRef.current || "/", { replace: true });
      return;
    }

    setMode("closed");
  };

  const openFullScreen = () => {
    setMode("full");
    if (location.pathname !== "/emi") {
      navigate("/emi");
    }
  };

  const dockAssistant = () => {
    if (location.pathname === "/emi") {
      pendingModeAfterRouteRef.current = "side";
      navigate(lastNonEmiPathRef.current || "/", { replace: true });
      return;
    }

    setMode("side");
  };

  const startDiagnosis = () => {
    if (diagnosisUsed) {
      pushEmi(
        "You have already used your complimentary diagnosis. I can still help you narrow the best next step, or I can guide you to book a consultancy so we can go deeper together.",
        [
          {
            label: "Book consultancy",
            type: "navigate",
            path: "/contact",
            followUp: getRouteFollowUp("/contact"),
            match: "prefix",
          },
          {
            label: "Browse services",
            type: "navigate",
            path: "/services",
            followUp: getRouteFollowUp("/services"),
            match: "prefix",
          },
        ],
      );
      return;
    }

    setDiagnosisDraft(defaultDraft());
    setDiagnosisStep(0);
    setMemoryContext((current) => ({ ...current, currentStep: "Diagnosis" }));
    const firstQuestion = diagnosisQuestions[0];
    pushEmi(
      "Wonderful. I’ll keep this focused and practical. Let’s start with the basics.",
    );
    pushEmi(firstQuestion.question);
  };

  const handleDiagnosisAnswer = (input: string) => {
    if (diagnosisStep === null) return;

    const question = diagnosisQuestions[diagnosisStep];
    const nextDraft = {
      ...diagnosisDraft,
      [question.key]: input.trim(),
    };
    setDiagnosisDraft(nextDraft);

    const nextIndex = diagnosisStep + 1;
    if (nextIndex < diagnosisQuestions.length) {
      setDiagnosisStep(nextIndex);
      pushEmi(diagnosisQuestions[nextIndex].question);
      return;
    }

    setDiagnosisStep(null);
    setDiagnosisUsed(true);
    const result = generateDiagnosis(nextDraft);
    setMemoryContext((current) => ({
      ...current,
      goal: nextDraft.goal,
      selectedService: result.recommendedService.title,
      currentStep: "Diagnosis completed",
    }));
    setLastDiagnosisSnapshot({
      businessName: nextDraft.businessName,
      overview: result.overview,
      quickWins: result.quickWins,
      watchouts: result.watchouts,
      threeStepPlan: result.threeStepPlan,
    });
    trackEvent("emi_diagnosis_completed", {
      business: nextDraft.businessName,
      service: result.recommendedService.id,
    });

    pushEmi(result.overview);
    pushEmi(
      `Here is your focused first-pass diagnosis for ${nextDraft.businessName}:`,
    );
    pushEmi(
      [
        "Priority quick wins:",
        ...result.quickWins.map((item, index) => `${index + 1}. ${item}`),
        "",
        "Things to watch:",
        ...result.watchouts.map((item, index) => `${index + 1}. ${item}`),
        "",
        `The strongest next fit from EMIMOS looks like ${result.recommendedService.title}.`,
      ].join("\n"),
      [
        {
          label: `View ${result.recommendedService.title}`,
          type: "navigate",
          path: result.recommendedService.route,
          followUp: getRouteFollowUp(result.recommendedService.route),
          match: "prefix",
        },
        {
          label: "Start order",
          type: "order",
          serviceId: result.recommendedService.id,
        },
        {
          label: "Book consultancy",
          type: "navigate",
          path: "/contact",
          followUp: getRouteFollowUp("/contact"),
          match: "prefix",
        },
      ],
    );

    pushEmi(
      "I’ve also prepared a few smart research angles you can open if you want a little more context before you decide.",
      result.researchLinks.map((link) => ({
        label: link.label,
        type: "link",
        url: link.url,
      })),
    );

    pushEmi(
      [
        "Here is your plan in 3 clear steps:",
        ...result.threeStepPlan.map((step, index) => `${index + 1}. ${step}`),
      ].join("\n"),
      [
        { label: "Download Diagnosis PDF", type: "download_diagnosis" },
        {
          label: "Prepare my order brief",
          type: "message",
          value: `Prepare my order brief for ${result.recommendedService.title}`,
        },
      ],
    );

    pushEmi(
      "Would you like me to prepare your order brief now so you can submit faster?",
      [
        {
          label: "Yes, prepare brief",
          type: "message",
          value: `Prepare my order brief for ${result.recommendedService.title}`,
        },
        { label: "Start order now", type: "order", serviceId: result.recommendedService.id },
      ],
    );
  };

  const handleAction = (action: EmiAction) => {
    if (action.type === "message") {
      pushMessage(createUserMessage(action.label));
      processUserInput(action.value);
      return;
    }

    if (action.type === "navigate") {
      pushMessage(createUserMessage(action.label));
      setPendingRoute({
        path: getPathOnly(action.path),
        followUp: action.followUp ?? getRouteFollowUp(action.path),
        match: action.match ?? "exact",
      });
      navigate(action.path);
      if (location.pathname !== "/emi") {
        setMode(isMobile ? "full" : "side");
      }
      return;
    }

    if (action.type === "link") {
      pushMessage(createUserMessage(action.label));
      window.open(action.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (action.type === "download_diagnosis") {
      pushMessage(createUserMessage(action.label));
      if (!lastDiagnosisSnapshot) {
        pushEmi("I do not have a diagnosis report yet. Run your complimentary diagnosis first.");
        return;
      }
      downloadDiagnosisPdf("EMIMOS Business Diagnosis", [
        { heading: "Business", lines: [lastDiagnosisSnapshot.businessName] },
        { heading: "Overview", lines: [lastDiagnosisSnapshot.overview] },
        { heading: "Quick Wins", lines: lastDiagnosisSnapshot.quickWins },
        { heading: "Watchouts", lines: lastDiagnosisSnapshot.watchouts },
        { heading: "3-Step Plan", lines: lastDiagnosisSnapshot.threeStepPlan },
      ]);
      trackEvent("emi_diagnosis_pdf_downloaded");
      pushEmi("Your diagnosis PDF has been prepared and downloaded.");
      return;
    }

    pushMessage(createUserMessage(action.label));
    navigate(`/order?service=${action.serviceId}`);
    setPendingRoute({
      path: "/order",
      followUp:
        "You’re in the order flow now. Keep your answers clear and practical, and I’ll still be here if you want help choosing what to include.",
      match: "prefix",
    });
    setMode(isMobile ? "full" : "side");
  };

  const processUserInput = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (diagnosisStep !== null) {
      handleDiagnosisAnswer(trimmed);
      return;
    }

    const normalized = trimmed.toLowerCase();

    if (
      normalized.includes("prepare my order brief") ||
      normalized.includes("order brief")
    ) {
      const selectedService = memoryContext.selectedService ?? "the recommended service";
      pushEmi(
        `Perfect. Here is your brief draft:\n1. Goal: ${memoryContext.goal ?? "Growth and visibility"}\n2. Service: ${selectedService}\n3. Priority: Quick, measurable outcomes\n4. Delivery preference: Professional and conversion-focused.\n\nI can take you straight to order submission now.`,
        [
          { label: "Start order now", type: "navigate", path: "/services", followUp: getRouteFollowUp("/services"), match: "prefix" },
          { label: "Book consultancy", type: "navigate", path: "/contact", followUp: getRouteFollowUp("/contact"), match: "prefix" },
        ],
      );
      return;
    }

    if (
      normalized.includes("diagnosis") ||
      normalized.includes("diagnose") ||
      normalized.includes("audit") ||
      normalized.includes("assess my business")
    ) {
      startDiagnosis();
      return;
    }

    if (
      normalized.includes("guide me") ||
      normalized.includes("guide me around") ||
      normalized.includes("show me around") ||
      normalized.includes("how do i use this app")
    ) {
      pushEmi(
        "Absolutely. I can guide you step by step. Most people start by checking Services, Orders, or Contact depending on what they need right now.",
        [
          {
            label: "Open Services",
            type: "navigate",
            path: "/services",
            followUp: getRouteFollowUp("/services"),
            match: "prefix",
          },
          {
            label: "Open Orders",
            type: "navigate",
            path: "/orders?tab=mine",
            followUp: getRouteFollowUp("/orders"),
            match: "prefix",
          },
          {
            label: "Open Contact",
            type: "navigate",
            path: "/contact",
            followUp: getRouteFollowUp("/contact"),
            match: "prefix",
          },
        ],
      );
      return;
    }

    if (
      normalized.includes("help me choose") ||
      normalized.includes("find the right service") ||
      normalized.includes("what do you recommend")
    ) {
      pushEmi(
        "Of course. Tell me what outcome matters most right now: more visibility, stronger branding, more enquiries, a better website, or support with documents and content.",
        [
          { label: "More visibility", type: "message", value: "I want more visibility for my business" },
          { label: "Better website", type: "message", value: "I need a better website for my business" },
          { label: "Stronger branding", type: "message", value: "I need stronger branding for my business" },
        ],
      );
      return;
    }

    if (
      normalized.includes("order") ||
      normalized.includes("track") ||
      normalized.includes("status")
    ) {
      pushEmi(
        "I can take you straight to your orders so you can track progress or place a fresh request when you are ready.",
        [
          {
            label: "Open My Orders",
            type: "navigate",
            path: "/orders?tab=mine",
            followUp: getRouteFollowUp("/orders"),
            match: "prefix",
          },
          {
            label: "Place a new order",
            type: "navigate",
            path: "/services",
            followUp: getRouteFollowUp("/services"),
            match: "prefix",
          },
        ],
      );
      return;
    }

    if (
      normalized.includes("home") ||
      normalized.includes("go home")
    ) {
      pushEmi(
        "Certainly. I can take you back home, and I’ll stay nearby if you want help again.",
        [
          {
            label: "Return Home",
            type: "navigate",
            path: "/",
            followUp: "Welcome back home. If you want, I can help you compare services or prepare your next order from here.",
            match: "exact",
          },
        ],
      );
      return;
    }

    if (
      normalized.includes("service") ||
      normalized.includes("price") ||
      normalized.includes("pricing") ||
      normalized.includes("cost")
    ) {
      pushEmi(
        "Of course. I can help you compare services, or I can take you to the full list and narrow it down with you there.",
        [
          {
            label: "Open Services",
            type: "navigate",
            path: "/services",
            followUp: getRouteFollowUp("/services"),
            match: "prefix",
          },
          { label: "Help me choose", type: "message", value: "Help me choose the right service" },
        ],
      );
      return;
    }

    if (
      normalized.includes("contact") ||
      normalized.includes("consult") ||
      normalized.includes("call") ||
      normalized.includes("talk to someone")
    ) {
      pushEmi(
        "Absolutely. If you want a more tailored discussion, the contact page is the best place to start.",
        [
          {
            label: "Open Contact",
            type: "navigate",
            path: "/contact",
            followUp: getRouteFollowUp("/contact"),
            match: "prefix",
          },
          { label: "Find the right service first", type: "message", value: "Help me find the right service" },
        ],
      );
      return;
    }

    if (
      normalized.includes("download") ||
      normalized.includes("install") ||
      normalized.includes("app")
    ) {
      pushEmi(
        "I can guide you through installing EmiMos on your device, and I’ll stay with you if you run into anything along the way.",
        [
          {
            label: "Open install page",
            type: "navigate",
            path: "/download",
            followUp: getRouteFollowUp("/download"),
            match: "prefix",
          },
        ],
      );
      return;
    }

    if (
      normalized.includes("about") ||
      normalized.includes("team") ||
      normalized.includes("who are you")
    ) {
      pushEmi(
        "I’d love to show you more about EMIMOS. Once you’re there, I can help connect what you learn to the most relevant service.",
        [
          {
            label: "Open About",
            type: "navigate",
            path: "/about",
            followUp: getRouteFollowUp("/about"),
            match: "prefix",
          },
        ],
      );
      return;
    }

    const matchedService = findServiceFromText(normalized);
    if (matchedService) {
      setMemoryContext((current) => ({
        ...current,
        selectedService: matchedService.title,
        currentStep: "Service match",
      }));
      pushEmi(
        `${matchedService.title} sounds like the closest fit for what you described. ${matchedService.summary}`,
        [
          {
            label: "View service",
            type: "navigate",
            path: matchedService.route,
            followUp: getRouteFollowUp(matchedService.route),
            match: "prefix",
          },
          { label: "Start order", type: "order", serviceId: matchedService.id },
          { label: "Give me my free diagnosis", type: "message", value: "I want a free business diagnosis" },
        ],
      );
      return;
    }

    const goalReply = suggestGoalReply(normalized);
    if (goalReply.service) {
      pushEmi(goalReply.message, [
        {
          label: `See ${goalReply.service.title}`,
          type: "navigate",
          path: goalReply.service.route,
          followUp: getRouteFollowUp(goalReply.service.route),
          match: "prefix",
        },
        { label: "Start order", type: "order", serviceId: goalReply.service.id },
        { label: "Get my free diagnosis", type: "message", value: "I want a free business diagnosis" },
      ]);
      return;
    }

    pushEmi(
      `${goalReply.message} If you like, I can either give you a complimentary diagnosis or guide you to the most useful page next.`,
      [
        { label: "Get my free diagnosis", type: "message", value: "I want a free business diagnosis" },
        {
          label: "Take me to Services",
          type: "navigate",
          path: "/services",
          followUp: getRouteFollowUp("/services"),
          match: "prefix",
        },
        {
          label: "Guide me around the app",
          type: "message",
          value: "Guide me around the app",
        },
      ],
    );
  };

  const sendCurrentInput = () => {
    const text = draftInput.trim();
    if (!text) return;
    if (!localStorage.getItem(EMI_FIRST_CHAT_AT_KEY)) {
      localStorage.setItem(EMI_FIRST_CHAT_AT_KEY, Date.now().toString());
    }
    trackEvent("emi_message_sent");
    pushMessage(createUserMessage(text));
    setDraftInput("");
    setIsEmiTyping(true);
    setTimeout(() => {
      setIsEmiTyping(false);
      processUserInput(text);
    }, 520);
  };

  const currentDiagnosisPrompt =
    diagnosisStep !== null ? diagnosisQuestions[diagnosisStep] : null;

  const assistantTitle =
    diagnosisStep !== null ? "Emi | Diagnosis" : "Emi from EMIMOS";
  const isCompactMode = visibleMode === "side";
  const hasUserSentMessage = messages.some((message) => message.role === "user");
  const showOneTimeGuidance = !isCompactMode && !hasUserSentMessage;

  return (
    <>
      <AnimatePresence>
        {visibleMode === "closed" && showHint && location.pathname !== "/emi" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed z-[70] right-4 bottom-40 sm:bottom-24 max-w-[260px]"
          >
            <div className="relative rounded-2xl bg-card border border-border shadow-card px-4 py-3 pr-10 text-left">
              <button
                type="button"
                onClick={dismissHint}
                aria-label="Dismiss Emi hint"
                className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
              <button
                type="button"
                onClick={openAssistant}
                className="block w-full text-left"
              >
                <p className="text-sm font-semibold text-foreground">
                  Chat with Emi and find what you need
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Warm guidance, one free business diagnosis, and smart next steps.
                </p>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {location.pathname !== "/emi" && visibleMode === "closed" && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={openAssistant}
          className="fixed z-[70] right-3 bottom-[calc(5.6rem+env(safe-area-inset-bottom))] sm:right-4 sm:bottom-5 rounded-full bg-gold text-navy-900 shadow-gold h-11 px-3 sm:px-4 flex items-center gap-2 font-semibold text-sm"
          aria-label="Open Emi chat"
        >
          <MessageCircle size={18} />
          <span className="hidden md:inline">Chat with Emi</span>
        </motion.button>
      )}

      <AnimatePresence>
        {visibleMode !== "closed" && (
          <motion.aside
            initial={{
              opacity: 0,
              x: visibleMode === "side" ? 32 : 0,
              y: visibleMode === "full" ? 12 : 0,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: visibleMode === "side" ? 32 : 0, y: 12 }}
            transition={{ duration: 0.22 }}
            className={
              visibleMode === "full"
                ? "fixed inset-0 z-[80] bg-background/95 backdrop-blur-sm"
                : "fixed z-[80] right-3 bottom-[calc(5.6rem+env(safe-area-inset-bottom))] w-[min(88vw,340px)] h-[56vh] max-h-[460px] sm:right-4 sm:bottom-6 sm:w-[360px] sm:h-[68vh] sm:max-h-[560px]"
            }
          >
            <div
              className={`h-full border border-border bg-card shadow-2xl flex flex-col overflow-hidden ${
                visibleMode === "full" ? "rounded-none sm:rounded-3xl" : "rounded-3xl"
              }`}
            >
              <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-navy-700 to-navy-800 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <Sparkles size={20} className="text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold truncate">{assistantTitle}</p>
                      {showOneTimeGuidance && (
                        <p className="text-xs text-white/75">
                          Friendly, helpful, and focused on getting you to the right next step.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="[&>button]:bg-white [&>button]:border-white/15 [&>button]:text-navy-900 [&_span]:text-navy-900">
                      <ThemeToggle />
                    </div>
                    {visibleMode === "full" ? (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={dockAssistant}
                        className="text-white hover:bg-white/10 hover:text-white"
                      >
                        <Minimize2 size={18} />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={openFullScreen}
                        className="text-white hover:bg-white/10 hover:text-white"
                      >
                        <Expand size={18} />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={closeAssistant}
                      className="text-white hover:bg-white/10 hover:text-white"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
                {showOneTimeGuidance && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                      {diagnosisUsed ? "Complimentary diagnosis used" : "1 complimentary diagnosis available"}
                    </span>
                    <button
                      onClick={() => {
                        setMessages(initialEmiMessages());
                        setDiagnosisStep(null);
                        setDiagnosisDraft(defaultDraft());
                      }}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
                    >
                      Reset conversation
                    </button>
                  </div>
                )}
                {visibleMode === "full" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {memoryContext.goal && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                        Goal: {memoryContext.goal}
                      </span>
                    )}
                    {memoryContext.selectedService && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                        Service: {memoryContext.selectedService}
                      </span>
                    )}
                    {memoryContext.currentStep && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                        Step: {memoryContext.currentStep}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div
                ref={messageViewportRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain scroll-smooth px-4 py-4 bg-background"
              >
                <div className="space-y-4 max-w-3xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm ${
                          message.role === "user"
                            ? "bg-gold text-navy-900"
                            : "bg-card border border-border text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.content}
                        </p>
                        {!isCompactMode && message.actions && message.actions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.actions.map((action) => (
                              <button
                                key={`${message.id}-${action.label}`}
                                onClick={() => handleAction(action)}
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                                  message.role === "user"
                                    ? "bg-navy-900/10 hover:bg-navy-900/15"
                                    : "bg-muted hover:bg-muted/80 text-foreground"
                                }`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEmiTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[88%] rounded-2xl px-4 py-3 shadow-sm bg-card border border-border text-foreground">
                        <p className="text-sm text-muted-foreground">Emi is typing...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-border bg-card px-4 py-4">
                {showOneTimeGuidance && (
                  <div className="mb-3 rounded-2xl border border-border bg-muted/40 px-3 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
                      <Compass size={16} className="text-primary" />
                      {diagnosisStep !== null
                        ? "Complimentary business diagnosis in progress"
                        : "Chat with Emi and find what you need"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {currentDiagnosisPrompt
                        ? currentDiagnosisPrompt.placeholder
                        : "Tell Emi what you want to achieve, what you need help with, or where you’d like guidance next."}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Input
                    value={draftInput}
                    onChange={(event) => setDraftInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        sendCurrentInput();
                      }
                    }}
                    placeholder={
                      currentDiagnosisPrompt?.placeholder ??
                      "Ask Emi anything about your business, services, or your next step"
                    }
                    className="h-12 rounded-2xl"
                  />
                  <Button
                    onClick={sendCurrentInput}
                    size="icon"
                    className="h-12 w-12 rounded-2xl bg-gold hover:bg-gold-dark text-navy-900 shrink-0"
                  >
                    <Send size={18} />
                  </Button>
                </div>

                {showOneTimeGuidance && diagnosisStep === null && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAction({ label: "Free diagnosis", type: "message", value: "I want a free business diagnosis" })}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      Free diagnosis
                    </button>
                    <button
                      onClick={() => handleAction({ label: "Find a service", type: "message", value: "Help me find the right service" })}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      Find a service
                    </button>
                    <button
                      onClick={() =>
                        handleAction({
                          label: "Take me to Services",
                          type: "navigate",
                          path: "/services",
                          followUp: getRouteFollowUp("/services"),
                          match: "prefix",
                        })
                      }
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      Browse services
                    </button>
                  </div>
                )}

                {showOneTimeGuidance && visibleMode !== "full" && !isMobile && (
                  <button
                    onClick={openFullScreen}
                    className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80"
                  >
                    Open full chat
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmiAssistant;
