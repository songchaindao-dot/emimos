import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import OrderCard from "@/components/orders/OrderCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const mockOrders = {
  active: [
    {
      id: "ord-001",
      serviceName: "Website Development",
      orderDate: "Jan 28, 2025",
      status: "processing" as const,
    },
    {
      id: "ord-002",
      serviceName: "Branding & Visual Identity",
      orderDate: "Jan 25, 2025",
      status: "pending" as const,
    },
  ],
  completed: [
    {
      id: "ord-003",
      serviceName: "CV & Career Branding",
      orderDate: "Jan 15, 2025",
      status: "completed" as const,
    },
    {
      id: "ord-004",
      serviceName: "Professional Writing & Editing",
      orderDate: "Jan 10, 2025",
      status: "completed" as const,
    },
    {
      id: "ord-005",
      serviceName: "Social Media Management",
      orderDate: "Dec 20, 2024",
      status: "failed" as const,
    },
  ],
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState("active");

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted rounded-xl p-1 h-12">
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

          <TabsContent value="active" className="mt-4">
            {mockOrders.active.length > 0 ? (
              <div className="space-y-3">
                {mockOrders.active.map((order, index) => (
                  <OrderCard key={order.id} {...order} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState message="No active orders" />
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            {mockOrders.completed.length > 0 ? (
              <div className="space-y-3">
                {mockOrders.completed.map((order, index) => (
                  <OrderCard key={order.id} {...order} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState message="No completed orders" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-16"
  >
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl">📦</span>
    </div>
    <p className="text-muted-foreground">{message}</p>
  </motion.div>
);

export default Orders;
