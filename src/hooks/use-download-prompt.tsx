import { useEffect, useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { isAndroid, isIOS, isStandalone } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export const useDownloadPrompt = () => {
  const [shouldPrompt, setShouldPrompt] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  const setDismissed = useCallback(() => {
    try {
      localStorage.setItem("downloadPromptDismissed", "true");
    } catch {
      // Ignore storage failures and keep install flow available.
    }
  }, []);

  useEffect(() => {
    if (isStandalone()) {
      setShouldPrompt(false);
      return;
    }

    let dismissed: string | null = null;
    try {
      dismissed = localStorage.getItem("downloadPromptDismissed");
    } catch {
      dismissed = null;
    }

    if (!dismissed) {
      const timer = setTimeout(() => setShouldPrompt(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setShouldPrompt(false);
      setIsInstalling(false);
      setDismissed();
      toast({
        title: "Installed successfully",
        description: "EmiMos is now available from your home screen or apps list.",
      });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [setDismissed]);

  const dismiss = useCallback(() => {
    setShouldPrompt(false);
    setDismissed();
  }, [setDismissed]);

  const requestDownload = useCallback(async () => {
    if (isInstalling) return;

    setShouldPrompt(false);
    setDismissed();

    try {
      if (isStandalone()) {
        toast({
          title: "Already installed",
          description: "EmiMos is already available from your home screen or apps list.",
        });
        return;
      }

      if (installPrompt) {
        setIsInstalling(true);
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setInstallPrompt(null);
          toast({
            title: "Install started",
            description: "EmiMos is being added to your device.",
          });
        } else {
          setIsInstalling(false);
          toast({
            title: "Install canceled",
            description: "You can install EmiMos again anytime.",
          });
        }
        return;
      }

      if (isIOS()) {
        toast({
          title: "Add to Home Screen",
          description: "On iPhone/iPad, open Safari, tap Share, then choose Add to Home Screen.",
        });
        window.location.href = "/download";
        return;
      }

      toast({
        title: isAndroid() ? "Install unavailable here" : "Install guidance",
        description: isAndroid()
          ? "Use your browser menu and tap Install app, or continue with the guide."
          : "Open the install guide to add EmiMos to your device.",
      });
      window.location.href = "/download";
    } catch (error) {
      setIsInstalling(false);
      toast({
        title: "Install unavailable",
        description: "Could not start the app install. Opening the install guide instead.",
      });
      window.location.href = "/download";
    }
  }, [installPrompt, isInstalling, setDismissed]);

  return { shouldPrompt, dismiss, requestDownload, isInstalling };
};
