import { useEffect, useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { isAndroid, isIOS } from "@/lib/utils";

export const useDownloadPrompt = () => {
  const [shouldPrompt, setShouldPrompt] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("downloadPromptDismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShouldPrompt(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = useCallback(() => {
    setShouldPrompt(false);
    localStorage.setItem("downloadPromptDismissed", "true");
  }, []);

  const requestDownload = useCallback(() => {
    setShouldPrompt(false);
    localStorage.setItem("downloadPromptDismissed", "true");
    const confirm = window.confirm("Allow EmiMos to download the app to your device?");
    if (!confirm) return;

    if (isAndroid()) {
      const link = document.createElement("a");
      link.href = "/downloads/emimos-app.apk";
      link.download = "emimos-app.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Downloading", description: "EmiMos Android app is downloading." });
    } else if (isIOS()) {
      const link = document.createElement("a");
      link.href = "/downloads/emimos-app.ipa";
      link.download = "emimos-app.ipa";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Downloading",
        description: "EmiMos iOS package is downloading. Follow the Download page for setup.",
      });
      window.location.href = "/download";
    } else {
      const link = document.createElement("a");
      link.href = "/downloads/emimos-app.apk";
      link.download = "emimos-app.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Downloading",
        description: "Downloading Android APK. For iOS, see the Download page.",
      });
    }
  }, []);

  return { shouldPrompt, dismiss, requestDownload };
};
