import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import OrderCard from "@/components/orders/OrderCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getCurrentOrderUser, getOrders, getOrdersForCurrentUser, type OrderRecord } from "@/lib/orders";

const Orders = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "mine");
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    const syncOrders = () => {
      setOrders(getOrders());
    };

    syncOrders();
    window.addEventListener("focus", syncOrders);
    window.addEventListener("storage", syncOrders);

    return () => {
      window.removeEventListener("focus", syncOrders);
      window.removeEventListener("storage", syncOrders);
    };
  }, []);

  const groupedOrders = useMemo(
    () => ({
      mine: getOrdersForCurrentUser(orders),
      active: orders.filter((order) => order.status === "pending" || order.status === "in_progress"),
      completed: orders.filter((order) => order.status === "completed" || order.status === "failed"),
    }),
    [orders],
  );

  const currentUser = useMemo(() => getCurrentOrderUser(), [orders]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", value);
      return next;
    });
  };

  return (
    <AppLayout>
      <div className="safe-top px-4 pt-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-heading font-bold text-foreground">
            My Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your service orders
          </p>
        </motion.header>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted rounded-xl p-1 h-12">
            <TabsTrigger
              value="mine"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium"
            >
              My Orders
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium"
            >
              Active Orders
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mine" className="mt-4">
            {groupedOrders.mine.length > 0 ? (
              <div className="space-y-3">
                {groupedOrders.mine.map((order, index) => (
                  <OrderCard key={order.id} {...order} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                message={
                  currentUser
                    ? "Your tracked orders will appear here automatically."
                    : "Place your first order and this tab will track it for you."
                }
                buttonLabel="Order Now"
                onClick={() => navigate("/services")}
              />
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            {groupedOrders.active.length > 0 ? (
              <div className="space-y-3">
                {groupedOrders.active.map((order, index) => (
                  <OrderCard key={order.id} {...order} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                message="No active orders right now."
                buttonLabel="Order Now"
                onClick={() => navigate("/services")}
              />
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            {groupedOrders.completed.length > 0 ? (
              <div className="space-y-3">
                {groupedOrders.completed.map((order, index) => (
                  <OrderCard key={order.id} {...order} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                message="No completed orders yet."
                buttonLabel="Order Now"
                onClick={() => navigate("/services")}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const EmptyState = ({
  message,
  buttonLabel,
  onClick,
}: {
  message: string;
  buttonLabel: string;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-16"
  >
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl">📦</span>
    </div>
    <p className="text-muted-foreground text-center max-w-xs">{message}</p>
    <Button onClick={onClick} className="mt-4 rounded-xl bg-gold hover:bg-gold-dark text-navy-900">
      {buttonLabel}
    </Button>
  </motion.div>
);

export default Orders;
