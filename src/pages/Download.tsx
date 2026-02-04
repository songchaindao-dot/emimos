import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download as DownloadIcon, Apple, Smartphone } from "lucide-react";

const DownloadPage = () => {
  return (
    <AppLayout>
      <div className="safe-top px-4 py-6 max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-heading font-bold">Download EmiMos</h1>
        <p className="text-muted-foreground">
          Install EmiMos on your device. Choose your platform below and follow the steps.
        </p>

        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Android (APK)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Tap the button below to download the APK file.</li>
              <li>When prompted, allow downloads from your browser.</li>
              <li>Open the APK from your Downloads and tap Install.</li>
              <li>If blocked, enable "Install unknown apps" for your browser.</li>
            </ol>
            <Button asChild className="gap-2">
              <a href="/downloads/emimos-app.apk" download>
                <DownloadIcon className="h-4 w-4" />
                Download Android APK
              </a>
            </Button>
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
              iOS apps require distribution via TestFlight or the App Store. You can run EmiMos as a
              PWA:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Open this site in Safari on your iPhone.</li>
              <li>Tap the Share icon, then “Add to Home Screen”.</li>
              <li>Launch EmiMos from your Home Screen like an app.</li>
            </ol>
            <p className="text-sm">
              For TestFlight/App Store distribution, contact support to receive an invite link.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <a href="/downloads/emimos-app.ipa" download>
                <DownloadIcon className="h-4 w-4" />
                Download iOS Package
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DownloadPage;
