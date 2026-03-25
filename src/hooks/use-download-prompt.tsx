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

  const triggerDownload = useCallback(async (url: string, filename: string) => {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) {
      throw new Error(`Failed to download ${filename}`);
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const requestDownload = useCallback(async () => {
    setShouldPrompt(false);
    localStorage.setItem("downloadPromptDismissed", "true");
    const confirmed = window.confirm("Allow EmiMos to download the app to your device?");
    if (!confirmed) return;

    try {
      if (isAndroid()) {
        await triggerDownload("/downloads/emimos-app.apk", "emimos-app.apk");
        toast({ title: "Downloading", description: "EmiMos Android app is downloading." });
        return;
      }

      if (isIOS()) {
        await triggerDownload("/downloads/emimos-app.ipa", "emimos-app.ipa");
        toast({
          title: "Downloading",
          description: "EmiMos iOS package is downloading. Follow the Download page for setup.",
        });
        window.location.href = "/download";
        return;
      }

      await triggerDownload("/downloads/emimos-app.apk", "emimos-app.apk");
      toast({
        title: "Downloading",
        description: "Downloading Android APK. For iOS, see the Download page.",
      });
    } catch (error) {
      toast({
        title: "Download unavailable",
        description: "Could not start app download. Opening the download page instead.",
      });
      window.location.href = "/download";
    }
  }, [triggerDownload]);

  return { shouldPrompt, dismiss, requestDownload };
};
