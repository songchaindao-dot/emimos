export type OrderStatus = "pending" | "in_progress" | "completed" | "failed";

export interface OrderTimelineItem {
  date: string;
  event: string;
  completed: boolean;
}

export interface OrderRecord {
  id: string;
  serviceName: string;
  orderDate: string;
  status: OrderStatus;
  paymentStatus: string;
  amount: number;
  description: string;
  files: string[];
  timeline: OrderTimelineItem[];
  customerName: string;
  phone: string;
  email: string;
  notes: string;
  reference: string;
}

export interface OrderFormPayload {
  fullName: string;
  phone: string;
  email: string;
  description: string;
  files: Array<{ name: string } | File>;
  notes: string;
}

const STORAGE_KEY = "emimos-orders";
const TEAM_EMAIL = "emilymoseni22@gmail.com";
const CURRENT_ORDER_USER_KEY = "emimos-current-order-user";

export interface CurrentOrderUser {
  fullName: string;
  phone: string;
  email: string;
}

const completedTimeline = (placedAt: string): OrderTimelineItem[] => [
  { date: placedAt, event: "Order placed", completed: true },
  { date: placedAt, event: "Request confirmed", completed: true },
  { date: placedAt, event: "Work started", completed: true },
  { date: placedAt, event: "Review and updates", completed: true },
  { date: placedAt, event: "Final delivery", completed: true },
];

const seedOrders: OrderRecord[] = [
  {
    id: "ord-001",
    serviceName: "Website Development",
    orderDate: "January 28, 2025",
    status: "completed",
    paymentStatus: "Paid",
    amount: 500,
    description:
      "Modern e-commerce website with product catalog, shopping cart, and payment integration.",
    files: ["requirements.pdf", "logo.png"],
    customerName: "Demo Client",
    phone: "+260 97 000 0001",
    email: "client1@example.com",
    notes: "",
    reference: "EMM-WEB-2025",
    timeline: [
      { date: "Jan 28", event: "Order placed", completed: true },
      { date: "Jan 29", event: "Request confirmed", completed: true },
      { date: "Jan 30", event: "Work started", completed: true },
      { date: "Feb 5", event: "First draft review", completed: true },
      { date: "Feb 14", event: "Final delivery", completed: true },
    ],
  },
  {
    id: "ord-002",
    serviceName: "Branding & Visual Identity",
    orderDate: "January 25, 2025",
    status: "completed",
    paymentStatus: "Paid",
    amount: 500,
    description:
      "Complete brand identity package including logo, color palette, and brand guidelines.",
    files: ["brand-brief.docx"],
    customerName: "Demo Client",
    phone: "+260 97 000 0002",
    email: "client2@example.com",
    notes: "",
    reference: "EMM-BRAND-2025",
    timeline: [
      { date: "Jan 25", event: "Order placed", completed: true },
      { date: "Jan 26", event: "Request confirmed", completed: true },
      { date: "Jan 27", event: "Design started", completed: true },
      { date: "Jan 29", event: "Concept review", completed: true },
      { date: "Feb 1", event: "Final delivery", completed: true },
    ],
  },
  {
    id: "ord-003",
    serviceName: "CV & Career Branding",
    orderDate: "January 15, 2025",
    status: "completed",
    paymentStatus: "Paid",
    amount: 500,
    description: "Professional CV, cover letter, and LinkedIn profile optimization.",
    files: ["old-cv.pdf"],
    customerName: "Demo Client",
    phone: "+260 97 000 0003",
    email: "client3@example.com",
    notes: "",
    reference: "EMM-CV-2025",
    timeline: [
      { date: "Jan 15", event: "Order placed", completed: true },
      { date: "Jan 15", event: "Request confirmed", completed: true },
      { date: "Jan 16", event: "Review started", completed: true },
      { date: "Jan 18", event: "First draft sent", completed: true },
      { date: "Jan 20", event: "Final delivery", completed: true },
    ],
  },
  {
    id: "ord-004",
    serviceName: "Professional Writing & Editing",
    orderDate: "January 10, 2025",
    status: "completed",
    paymentStatus: "Paid",
    amount: 500,
    description: "Editing and polishing for business and professional documents.",
    files: ["draft.docx"],
    customerName: "Demo Client",
    phone: "+260 97 000 0004",
    email: "client4@example.com",
    notes: "",
    reference: "EMM-WRITE-2025",
    timeline: [
      { date: "Jan 10", event: "Order placed", completed: true },
      { date: "Jan 10", event: "Request confirmed", completed: true },
      { date: "Jan 11", event: "Editing started", completed: true },
      { date: "Jan 12", event: "Draft returned", completed: true },
      { date: "Jan 13", event: "Final delivery", completed: true },
    ],
  },
  {
    id: "ord-005",
    serviceName: "Social Media Management",
    orderDate: "December 20, 2024",
    status: "completed",
    paymentStatus: "Paid",
    amount: 500,
    description: "Monthly social content planning and account management.",
    files: [],
    customerName: "Demo Client",
    phone: "+260 97 000 0005",
    email: "client5@example.com",
    notes: "",
    reference: "EMM-SOCIAL-2024",
    timeline: completedTimeline("Dec 20"),
  },
];

const formatFullDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

const formatShortDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

const getUserMatcher = ({
  email,
  phone,
}: {
  email?: string;
  phone?: string;
}) => ({
  email: (email ?? "").trim().toLowerCase(),
  phone: normalizePhone(phone ?? ""),
});

const buildTimeline = (status: OrderStatus, createdAt: Date): OrderTimelineItem[] => {
  const placedDate = formatShortDate(createdAt);

  return [
    { date: placedDate, event: "Order placed", completed: true },
    { date: placedDate, event: "Request confirmed", completed: true },
    {
      date: status === "pending" ? "Pending" : placedDate,
      event: "Work started",
      completed: status === "in_progress" || status === "completed",
    },
    {
      date: status === "completed" ? placedDate : "Pending",
      event: "Review and updates",
      completed: status === "completed",
    },
    {
      date: status === "completed" ? placedDate : "Pending",
      event: "Final delivery",
      completed: status === "completed",
    },
  ];
};

const normalizeStatus = (status: string): OrderStatus => {
  if (status === "processing") return "in_progress";
  if (status === "pending" || status === "in_progress" || status === "completed" || status === "failed") {
    return status;
  }
  return "pending";
};

const normalizeOrder = (order: Partial<OrderRecord>): OrderRecord => {
  const createdAt = new Date();
  const migratedOrder =
    order.id === "ord-005" && order.serviceName === "Social Media Management"
      ? {
          ...order,
          status: "completed" as const,
          paymentStatus: "Paid",
          timeline: completedTimeline("Dec 20"),
        }
      : order;
  const status = normalizeStatus(migratedOrder.status ?? "pending");

  return {
    id: migratedOrder.id ?? `ord-${Date.now().toString(36)}`,
    serviceName: migratedOrder.serviceName ?? "Service",
    orderDate: migratedOrder.orderDate ?? formatFullDate(createdAt),
    status,
    paymentStatus: migratedOrder.paymentStatus ?? "Paid",
    amount: migratedOrder.amount ?? 500,
    description: migratedOrder.description ?? "",
    files: migratedOrder.files ?? [],
    timeline: migratedOrder.timeline ?? buildTimeline(status, createdAt),
    customerName: migratedOrder.customerName ?? "",
    phone: migratedOrder.phone ?? "",
    email: migratedOrder.email ?? "",
    notes: migratedOrder.notes ?? "",
    reference: migratedOrder.reference ?? `EMM-${Date.now().toString(36).toUpperCase()}`,
  };
};

const persistOrders = (orders: OrderRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const getCurrentOrderUser = (): CurrentOrderUser | null => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(CURRENT_ORDER_USER_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<CurrentOrderUser>;
    if (!parsed.email && !parsed.phone) return null;

    return {
      fullName: parsed.fullName ?? "",
      phone: parsed.phone ?? "",
      email: parsed.email ?? "",
    };
  } catch {
    return null;
  }
};

export const setCurrentOrderUser = (user: CurrentOrderUser) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENT_ORDER_USER_KEY, JSON.stringify(user));
};

export const getOrders = (): OrderRecord[] => {
  if (typeof window === "undefined") return seedOrders;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    persistOrders(seedOrders);
    return seedOrders;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<OrderRecord>[];
    const normalized = parsed.map(normalizeOrder);
    persistOrders(normalized);
    return normalized;
  } catch {
    persistOrders(seedOrders);
    return seedOrders;
  }
};

export const getOrderById = (id: string) =>
  getOrders().find((order) => order.id === id);

export const getOrdersForCurrentUser = (orders = getOrders()) => {
  const currentUser = getCurrentOrderUser();
  if (!currentUser) return [];

  const matcher = getUserMatcher(currentUser);

  return orders.filter((order) => {
    const orderMatcher = getUserMatcher(order);
    return (
      (matcher.email && orderMatcher.email === matcher.email) ||
      (matcher.phone && orderMatcher.phone === matcher.phone)
    );
  });
};

export const createOrder = ({
  serviceName,
  formData,
  reference,
}: {
  serviceName: string;
  formData: OrderFormPayload;
  reference: string;
}) => {
  const now = new Date();
  const orders = getOrders();
  const id = `ord-${Date.now().toString(36)}`;
  const order: OrderRecord = {
    id,
    serviceName,
    orderDate: formatFullDate(now),
    status: "pending",
    paymentStatus: "Paid",
    amount: 500,
    description: formData.description,
    files: formData.files.map((file) => file.name),
    timeline: buildTimeline("pending", now),
    customerName: formData.fullName,
    phone: formData.phone,
    email: formData.email,
    notes: formData.notes,
    reference,
  };

  setCurrentOrderUser({
    fullName: formData.fullName,
    phone: formData.phone,
    email: formData.email,
  });

  const nextOrders = [order, ...orders];
  persistOrders(nextOrders);
  return order;
};

export const updateOrderStatus = (id: string, status: OrderStatus) => {
  const orders = getOrders();
  const nextOrders = orders.map((order) =>
    order.id === id
      ? {
          ...order,
          status,
          timeline: buildTimeline(status, new Date(order.orderDate)),
        }
      : order,
  );

  persistOrders(nextOrders);
  return nextOrders.find((order) => order.id === id);
};

export const buildOrderEmailUrl = (order: OrderRecord) => {
  const subject = encodeURIComponent(`New order request: ${order.serviceName} (${order.id})`);
  const body = encodeURIComponent(
    [
      "A new order request has been submitted.",
      "",
      `Order ID: ${order.id}`,
      `Reference: ${order.reference}`,
      `Service: ${order.serviceName}`,
      `Status: ${order.status}`,
      `Customer: ${order.customerName}`,
      `Phone: ${order.phone}`,
      `Email: ${order.email}`,
      `Amount: K${order.amount.toFixed(2)}`,
      "",
      "Description:",
      order.description || "N/A",
      "",
      "Notes:",
      order.notes || "N/A",
      "",
      `Files: ${order.files.length > 0 ? order.files.join(", ") : "No files attached"}`,
    ].join("\n"),
  );

  return `mailto:${TEAM_EMAIL}?subject=${subject}&body=${body}`;
};

export const getTeamEmail = () => TEAM_EMAIL;
