import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, LogOut, ChevronRight, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+260 97 123 4567",
    location: "Lusaka, Zambia",
  });

  const [editData, setEditData] = useState(profile);

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const menuItems = [
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Phone", value: profile.phone },
    { icon: MapPin, label: "Location", value: profile.location },
  ];

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
            Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account
          </p>
        </motion.header>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-gold" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-primary-foreground">
                {profile.name}
              </h2>
              <p className="text-primary-foreground/70 text-sm">
                Premium Member
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setEditData(profile);
              setIsEditing(true);
            }}
            variant="outline"
            className="w-full mt-4 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 rounded-xl"
          >
            <Edit3 size={16} className="mr-2" />
            Edit Profile
          </Button>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-card border border-border overflow-hidden mb-6"
        >
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center gap-4 p-4 ${
                index < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="p-2 bg-muted rounded-xl">
                <item.icon size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Order History Link */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => {}}
          className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card border border-border mb-6"
        >
          <div className="p-2 bg-gold/10 rounded-xl">
            <span className="text-lg">📦</span>
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-foreground">Order History</p>
            <p className="text-sm text-muted-foreground">View all your orders</p>
          </div>
          <ChevronRight size={20} className="text-muted-foreground" />
        </motion.button>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => setShowLogoutDialog(true)}
            variant="outline"
            className="w-full py-6 rounded-xl text-destructive border-destructive/20 hover:bg-destructive/5"
          >
            <LogOut size={18} className="mr-2" />
            Log Out
          </Button>
        </motion.div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading">Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editData.location}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="rounded-xl h-12"
                />
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gold hover:bg-gold-dark text-navy-900 rounded-xl"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Logout Confirmation Dialog */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading">Log Out</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowLogoutDialog(false)}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
              >
                Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Profile;
