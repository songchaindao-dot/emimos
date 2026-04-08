export type EmiMode = "closed" | "side" | "full";

export type EmiAction =
  | {
      label: string;
      type: "message";
      value: string;
    }
  | {
      label: string;
      type: "navigate";
      path: string;
      followUp?: string;
      match?: "exact" | "prefix";
    }
  | {
      label: string;
      type: "link";
      url: string;
    }
  | {
      label: string;
      type: "order";
      serviceId: string;
    };

export interface EmiMessage {
  id: string;
  role: "emi" | "user";
  content: string;
  actions?: EmiAction[];
}

export interface DiagnosisDraft {
  businessName: string;
  industry: string;
  stage: string;
  challenge: string;
  goal: string;
  audience: string;
  location: string;
  budget: string;
}

export interface EmiService {
  id: string;
  title: string;
  route: string;
  orderRoute: string;
  summary: string;
  keywords: string[];
}

export interface EmiDiagnosisResult {
  overview: string;
  quickWins: string[];
  watchouts: string[];
  recommendedService: EmiService;
  researchLinks: Array<{ label: string; url: string }>;
}

export const EMI_STORAGE_KEY = "emimos-emi-chat";
export const EMI_DIAGNOSIS_KEY = "emimos-emi-free-diagnosis-used";
export const EMI_HINT_KEY = "emimos-emi-hint-dismissed";

export const emiServices: EmiService[] = [
  {
    id: "branding",
    title: "Branding & Visual Identity",
    route: "/services/branding",
    orderRoute: "/order?service=branding",
    summary: "Sharpens how your business looks, sounds, and is remembered.",
    keywords: ["brand", "branding", "identity", "logo", "visual", "positioning", "trust"],
  },
  {
    id: "writing",
    title: "Professional Writing & Editing",
    route: "/services/writing",
    orderRoute: "/order?service=writing",
    summary: "Improves your messaging, documents, and marketing copy.",
    keywords: ["copy", "writing", "content", "proposal", "brochure", "editing", "proofread"],
  },
  {
    id: "cv-career",
    title: "CV & Career Branding",
    route: "/services/cv-career",
    orderRoute: "/order?service=cv-career",
    summary: "Helps professionals stand out with stronger career materials.",
    keywords: ["cv", "resume", "career", "linkedin", "job", "cover letter"],
  },
  {
    id: "audio-visual",
    title: "Audio & Visual Advertising",
    route: "/services/audio-visual",
    orderRoute: "/order?service=audio-visual",
    summary: "Creates high-impact media for campaigns, launches, and promotions.",
    keywords: ["video", "radio", "advert", "advertising", "motion", "campaign", "promo"],
  },
  {
    id: "social-media",
    title: "Social Media Management",
    route: "/services/social-media",
    orderRoute: "/order?service=social-media",
    summary: "Builds visibility and engagement through consistent social content.",
    keywords: ["social", "instagram", "facebook", "tiktok", "posting", "engagement", "visibility"],
  },
  {
    id: "events",
    title: "Event Planning & Coordination",
    route: "/services/events",
    orderRoute: "/order?service=events",
    summary: "Supports corporate and branded events from planning to execution.",
    keywords: ["event", "conference", "launch", "coordination", "activation", "planning"],
  },
  {
    id: "website",
    title: "Website Development",
    route: "/services/website",
    orderRoute: "/order?service=website",
    summary: "Builds a stronger online home for your brand, sales, and enquiries.",
    keywords: ["website", "site", "landing page", "web", "ecommerce", "portal", "online"],
  },
  {
    id: "app",
    title: "App Development",
    route: "/services/app",
    orderRoute: "/order?service=app",
    summary: "Turns ideas into mobile product experiences for Android and iPhone.",
    keywords: ["app", "mobile app", "android", "ios", "software", "product"],
  },
  {
    id: "hosting",
    title: "Domain, Email & Hosting",
    route: "/services/hosting",
    orderRoute: "/order?service=hosting",
    summary: "Sets up reliable domains, email, and hosting for credibility online.",
    keywords: ["domain", "email", "hosting", "server", "business email", "ssl"],
  },
];

const encodeSearch = (query: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(query)}`;

export const createEmiMessage = (
  content: string,
  actions?: EmiAction[],
): EmiMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role: "emi",
  content,
  actions,
});

export const createUserMessage = (content: string): EmiMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role: "user",
  content,
});

export const initialEmiMessages = (): EmiMessage[] => [
  createEmiMessage(
    "Hello, I’m Emi from EMIMOS. I’m here to help you find the right service, understand where to start, or give you one complimentary business diagnosis. What would you like to achieve today?",
    [
      { label: "Get my free diagnosis", type: "message", value: "I want a free business diagnosis" },
      { label: "Find the right service", type: "message", value: "Help me find the right service" },
      { label: "Track my orders", type: "navigate", path: "/orders?tab=mine", followUp: "Lovely, you’re on your Orders page now. I can help you understand statuses or guide you back to the right service if you need another request.", match: "prefix" },
    ],
  ),
];

export const diagnosisQuestions: Array<{
  key: keyof DiagnosisDraft;
  question: string;
  placeholder: string;
}> = [
  {
    key: "businessName",
    question: "What is the name of your business, brand, or idea?",
    placeholder: "Business name",
  },
  {
    key: "industry",
    question: "What kind of business are you running or planning to build?",
    placeholder: "Industry",
  },
  {
    key: "stage",
    question: "Which stage best describes you right now: idea stage, early business, growing business, or established?",
    placeholder: "Business stage",
  },
  {
    key: "goal",
    question: "What are you most hoping to achieve in the next few months?",
    placeholder: "Primary goal",
  },
  {
    key: "challenge",
    question: "What is your biggest challenge at the moment?",
    placeholder: "Main challenge",
  },
  {
    key: "audience",
    question: "Who are you trying to reach or sell to?",
    placeholder: "Target audience",
  },
  {
    key: "location",
    question: "Which location or market are you focusing on?",
    placeholder: "Location or market",
  },
  {
    key: "budget",
    question: "What kind of budget or capacity do you currently have for improving the business?",
    placeholder: "Budget or capacity",
  },
];

export const findServiceFromText = (text: string) => {
  const normalized = text.toLowerCase();
  return (
    emiServices.find((service) =>
      service.keywords.some((keyword) => normalized.includes(keyword)),
    ) ?? null
  );
};

export const getRouteFollowUp = (path: string) => {
  if (path.startsWith("/services")) {
    return "Great to see you in Services. I can help you narrow this down to the fastest fit for your goal.";
  }

  if (path.startsWith("/orders")) {
    return "Great to see you in Orders. This is where you can follow progress, open details, and keep track of what comes next.";
  }

  if (path.startsWith("/contact")) {
    return "Perfect, you’re on Contact now. A short, clear message about your goal will help our team respond faster.";
  }

  if (path.startsWith("/about")) {
    return "You’re on the About page now. If you want, I can still help you connect what you learn here to the right service.";
  }

  if (path.startsWith("/download")) {
    return "You’re on the app install page now. If you get stuck, I can guide you through the next step for your device.";
  }

  return "Lovely, you’re in the right place now. I can keep guiding you from here.";
};

export const suggestGoalReply = (input: string) => {
  const normalized = input.toLowerCase();
  const matchedService = findServiceFromText(normalized);

  if (matchedService) {
    return {
      message: `That sounds like a good fit for ${matchedService.title}. It usually helps when you want to move faster with ${matchedService.summary.toLowerCase()}`,
      service: matchedService,
    };
  }

  if (
    normalized.includes("sales") ||
    normalized.includes("customers") ||
    normalized.includes("leads") ||
    normalized.includes("growth")
  ) {
    return {
      message:
        "If growth is the priority, I’d usually start by tightening your message, your visibility, or your digital conversion path first.",
      service: findServiceFromText("branding website social"),
    };
  }

  if (
    normalized.includes("online") ||
    normalized.includes("website") ||
    normalized.includes("digital")
  ) {
    return {
      message:
        "If you want a stronger online presence, I’d usually look at your website, your business email setup, and how clearly the offer is presented.",
      service: findServiceFromText("website"),
    };
  }

  return {
    message:
      "I can help with that. The best next step is usually to clarify whether your immediate need is visibility, credibility, sales support, or delivery.",
    service: null,
  };
};

export const generateDiagnosis = (draft: DiagnosisDraft): EmiDiagnosisResult => {
  const combinedText = `${draft.goal} ${draft.challenge} ${draft.industry}`;
  const recommendedService =
    findServiceFromText(combinedText) ?? findServiceFromText("branding website") ?? emiServices[0];

  const stage = draft.stage.toLowerCase();
  const challenge = draft.challenge.toLowerCase();

  const stagePriority =
    stage.includes("idea")
      ? "validate demand and sharpen your first offer"
      : stage.includes("early")
        ? "build trust quickly and create a consistent market presence"
        : stage.includes("growing")
          ? "improve conversion, structure, and visibility at the same time"
          : "tighten performance and position for the next level of growth";

  const overview = `${draft.businessName} looks like a ${draft.stage} ${draft.industry} business focused on ${draft.goal}. From your description, the clearest priority now is to ${stagePriority}. The biggest pressure point appears to be ${draft.challenge}, which means your next moves should stay focused, visible, and easy to act on.`;

  const quickWins = [
    `Clarify one sharp offer for ${draft.audience} and use the same message across every touchpoint.`,
    challenge.includes("visibility") || challenge.includes("social")
      ? "Create a 2-week content plan with one signature message, one proof point, and one clear call to action."
      : challenge.includes("sales") || challenge.includes("customers")
        ? "Tighten the path from interest to enquiry with one clear next step and stronger trust signals."
        : "Document one practical weekly improvement rhythm so progress becomes visible and consistent.",
    `Strengthen your digital presence in ${draft.location} so people can quickly understand what you do and why they should trust you.`,
  ];

  const watchouts = [
    "Trying to improve too many channels at once before one clear offer is working.",
    "Speaking too broadly instead of making the value obvious for the audience you most want to win first.",
    "Letting enquiries arrive without a simple, consistent follow-up path.",
  ];

  const researchLinks = [
    {
      label: "Market positioning ideas",
      url: encodeSearch(
        `${draft.industry} business positioning strategies for ${draft.stage} businesses in ${draft.location}`,
      ),
    },
    {
      label: "Challenge-specific research",
      url: encodeSearch(
        `how to solve ${draft.challenge} for ${draft.industry} businesses targeting ${draft.audience}`,
      ),
    },
    {
      label: "Growth playbook examples",
      url: encodeSearch(
        `${draft.goal} strategy examples for ${draft.industry} businesses with ${draft.budget} budget`,
      ),
    },
  ];

  return {
    overview,
    quickWins,
    watchouts,
    recommendedService,
    researchLinks,
  };
};
