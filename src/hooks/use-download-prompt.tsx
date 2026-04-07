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

  useEffect(() => {
    const dismissed = localStorage.getItem("downloadPromptDismissed");
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

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const dismiss = useCallback(() => {
    setShouldPrompt(false);
    localStorage.setItem("downloadPromptDismissed", "true");
  }, []);

  const requestDownload = useCallback(async () => {
    setShouldPrompt(false);
    localStorage.setItem("downloadPromptDismissed", "true");
    const confirmed = window.confirm("Install EmiMos on this device?");
    if (!confirmed) return;

    try {
      if (isStandalone()) {
        toast({
          title: "Already installed",
          description: "EmiMos is already available from your home screen or apps list.",
        });
        return;
      }

      if (installPrompt) {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setInstallPrompt(null);
          toast({
            title: "Install started",
            description: "EmiMos is being added to your device.",
          });
        } else {
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
          description: "Open Safari, tap Share, then choose Add to Home Screen.",
        });
        window.location.href = "/download";
        return;
      }

      toast({
        title: isAndroid() ? "Install unavailable here" : "Install guidance",
        description: "Open the install guide to add EmiMos to your device.",
      });
      window.location.href = "/download";
    } catch (error) {
      toast({
        title: "Install unavailable",
        description: "Could not start the app install. Opening the install guide instead.",
      });
      window.location.href = "/download";
    }
  }, [installPrompt]);

  return { shouldPrompt, dismiss, requestDownload };
};
