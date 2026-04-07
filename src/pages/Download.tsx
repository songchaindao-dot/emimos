import { useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download as DownloadIcon, Apple, MonitorSmartphone, Smartphone } from "lucide-react";
import { isAndroid, isIOS } from "@/lib/utils";

const DownloadPage = () => {
  const platform = useMemo(() => {
    if (isIOS()) return "ios";
    if (isAndroid()) return "android";
    return "desktop";
  }, []);

  return (
    <AppLayout>
      <div className="safe-top px-4 py-6 max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-heading font-bold">Download EmiMos</h1>
        <p className="text-muted-foreground">
          Install EmiMos on your phone or computer. The recommended option is adding the web app to your home screen or desktop.
        </p>

        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MonitorSmartphone className="h-5 w-5" />
              Install EmiMos App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>On Android or desktop, tap your browser install prompt when it appears.</li>
              <li>On Chrome desktop or Android, you can also use the browser menu and choose Install app.</li>
              <li>On iPhone or iPad, open this site in Safari, tap Share, then choose Add to Home Screen.</li>
              <li>After installing, launch EmiMos from your apps list or home screen.</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              Detected platform: <span className="font-medium text-foreground capitalize">{platform}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              iOS (Install Guide)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              iPhone and iPad do not install `.ipa` files directly from the browser. EmiMos works on Apple devices as a home screen web app:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Open this site in Safari on your iPhone.</li>
              <li>Tap the Share icon, then tap Add to Home Screen.</li>
              <li>Launch EmiMos from your Home Screen like an app.</li>
            </ol>
            <p className="text-sm">
              Safari is required for this install flow on Apple devices.
            </p>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Advanced Android APK
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Only use the APK if you specifically want the packaged Android file. The recommended install method is the web app prompt above.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <a href="/downloads/emimos-app.apk" download>
                <DownloadIcon className="h-4 w-4" />
                Download Android APK
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DownloadPage;
