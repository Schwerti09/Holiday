import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, AlertCircle, Phone, Mail, ExternalLink, Info, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WiderrufPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Widerrufsbelehrung | Stornierung bei Verwoehnwochenende.de"
        description="Informationen zum Widerrufsrecht bei Buchungen über Verwoehnwochenende.de. Muster-Widerrufsformular und Kontaktdaten für Stornierungen."
        pageType="legal"
        canonicalPath="/widerruf"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Widerrufsbelehrung", url: "/widerruf" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <RotateCcw className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-widerruf-title">
                  Widerrufsbelehrung
                </h1>
                <p className="text-muted-foreground">Informationen zu Ihrem Widerrufsrecht</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-6">
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Wichtiger Hinweis zu Affiliate-Shops
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">„DeineZeitEureZeit"</strong> ist ein 
                    Affiliate-Partnershop. Wir schließen keine Kaufverträge mit Ihnen ab und 
                    verkaufen keine Produkte direkt.
                  </p>
                  <p>
                    <strong className="text-foreground">Ein Widerrufsrecht gegenüber uns besteht daher nicht.</strong>
                  </p>
                  <p>
                    Wenn Sie eine Reise oder ein Produkt bei unserem Partner Verwoehnwochenende.de 
                    gebucht haben, gelten die dortigen Widerrufs- und Stornierungsbedingungen.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Widerrufsrecht bei Verwoehnwochenende.de
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Für Buchungen und Käufe bei unserem Partner Verwoehnwochenende.de gilt 
                    grundsätzlich ein Widerrufsrecht von 14 Tagen, sofern nicht Ausnahmen greifen.
                  </p>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Widerrufsfrist
                    </h3>
                    <p>
                      Die Widerrufsfrist beträgt <strong className="text-foreground">14 Tage</strong> ab 
                      dem Tag des Vertragsabschlusses (bei Reisen) oder ab dem Tag, an dem Sie die 
                      Ware erhalten haben (bei Produkten).
                    </p>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Ausnahmen vom Widerrufsrecht</h3>
                    <p className="text-sm mb-2">Das Widerrufsrecht gilt NICHT für:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Reiseleistungen, wenn ein bestimmtes Datum oder Zeitraum vorgesehen ist</li>
                      <li>Hotelübernachtungen und Beförderungsleistungen</li>
                      <li>Personalisierte oder nach Kundenspezifikation angefertigte Waren</li>
                      <li>Versiegelte Waren, die aus Hygienegründen nicht zur Rückgabe geeignet sind</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Muster-Widerrufsformular
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Falls Sie Ihren Vertrag mit Verwoehnwochenende.de widerrufen möchten, 
                    können Sie das folgende Muster verwenden:
                  </p>
                  
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border font-mono text-sm">
                    <p className="mb-4">An:</p>
                    <p>Verwoehnwochenende.de</p>
                    <p>Inhaberin: Ariane Struck</p>
                    <p>Seilbahn 10</p>
                    <p>47829 Krefeld-Uerdingen</p>
                    <p>E-Mail: service@verwoehnwochenende.de</p>
                    <p className="mt-4 mb-2">---</p>
                    <p className="mb-2">Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen 
                    Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der folgenden 
                    Dienstleistung (*):</p>
                    <p className="mb-2">Bestellt am (*) / erhalten am (*):</p>
                    <p className="mb-2">Name des/der Verbraucher(s):</p>
                    <p className="mb-2">Anschrift des/der Verbraucher(s):</p>
                    <p className="mb-2">Datum, Unterschrift</p>
                    <p className="text-xs mt-4">(*) Unzutreffendes streichen</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Stornierung von Reisen
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Für die Stornierung von Reisebuchungen gelten die Stornierungsbedingungen 
                    des jeweiligen Hotels bzw. Reiseanbieters. Diese können je nach Angebot variieren.
                  </p>
                  <p>
                    Bitte beachten Sie die Stornierungsbedingungen in Ihrer Buchungsbestätigung 
                    oder kontaktieren Sie Verwoehnwochenende.de direkt.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Kontakt für Widerruf und Stornierung
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Wenden Sie sich für alle Fragen zu Widerruf, Stornierung oder Umbuchung 
                    direkt an unseren Partner:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <p className="font-semibold text-foreground mb-2">Verwoehnwochenende.de</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          +49 (0)2065 / 4999116
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          service@verwoehnwochenende.de
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button asChild>
                        <a 
                          href="https://www.verwoehnwochenende.de/widerrufsbelehrung" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          Widerrufsbelehrung beim Partner
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
