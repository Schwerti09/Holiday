import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Umbrella, AlertTriangle, Check, X, Phone, ExternalLink, HeartPulse, Luggage, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReiseversicherungPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Reiseversicherung | Reiserücktritt & Reiseabbruch absichern"
        description="Reiseversicherung für Ihre Kurzreise: Reiserücktrittsversicherung, Reiseabbruchversicherung, Gepäckversicherung. Was ist versichert? Tipps und Empfehlungen."
        pageType="legal"
        canonicalPath="/reiseversicherung"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Reiseversicherung", url: "/reiseversicherung" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-versicherung-title">
                  Reiseversicherung
                </h1>
                <p className="text-muted-foreground">Schutz für Ihre Kurzreise</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-6">
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Empfehlung
                </h2>
                <p className="text-muted-foreground">
                  Auch bei Kurzreisen kann Unvorhergesehenes passieren. Wir empfehlen den Abschluss 
                  einer Reiserücktritts- und/oder Reiseabbruchversicherung, um im Ernstfall 
                  finanziell abgesichert zu sein.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Umbrella className="h-5 w-5 text-primary" />
                  Wichtige Versicherungsarten
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Reiserücktrittsversicherung</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Erstattet Stornierungskosten, wenn Sie Ihre Reise vor Antritt absagen müssen.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 bg-green-500/10 text-green-700 rounded">Krankheit</span>
                          <span className="text-xs px-2 py-1 bg-green-500/10 text-green-700 rounded">Unfall</span>
                          <span className="text-xs px-2 py-1 bg-green-500/10 text-green-700 rounded">Todesfall in Familie</span>
                          <span className="text-xs px-2 py-1 bg-green-500/10 text-green-700 rounded">Arbeitsplatzverlust</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <HeartPulse className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Reiseabbruchversicherung</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Übernimmt Kosten, wenn Sie Ihre Reise vorzeitig beenden müssen.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-700 rounded">Nicht genutzte Leistungen</span>
                          <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-700 rounded">Rückreisekosten</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Luggage className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Reisegepäckversicherung</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Schützt bei Verlust, Beschädigung oder Diebstahl Ihres Gepäcks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Was ist versichert?
                  </h2>
                  <ul className="space-y-2">
                    {[
                      "Unerwartete schwere Erkrankung",
                      "Unfallbedingte Verletzungen",
                      "Schwangerschaft",
                      "Todesfall naher Angehöriger",
                      "Schaden am Eigentum (z.B. Brand)",
                      "Unerwartete Kündigung",
                      "Nicht bestandene Prüfungen",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    Was ist NICHT versichert?
                  </h2>
                  <ul className="space-y-2">
                    {[
                      "Bereits bekannte Erkrankungen",
                      "Keine Lust / Meinungsänderung",
                      "Finanzielle Gründe",
                      "Vorhersehbare Ereignisse",
                      "Krieg / Terrorismus (je nach Tarif)",
                      "Vorsätzlich herbeigeführte Ereignisse",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <X className="h-4 w-4 text-red-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Versicherung bei Verwoehnwochenende.de
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Bei der Buchung auf Verwoehnwochenende.de können Sie optional eine 
                    Reiserücktrittsversicherung hinzubuchen. Die Konditionen werden Ihnen 
                    im Buchungsprozess angezeigt.
                  </p>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Tipp für Kurzreisen</h3>
                    <p className="text-sm">
                      Bei Kurzreisen innerhalb Deutschlands sind die Risiken oft überschaubar. 
                      Prüfen Sie, ob Ihre bestehende Kreditkarte oder Mitgliedschaft (z.B. ADAC) 
                      bereits einen Reiseschutz beinhaltet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Versicherung abschließen
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <p className="text-muted-foreground">
                    Informieren Sie sich bei Verwoehnwochenende.de über die verfügbaren 
                    Versicherungsoptionen für Ihre Reise.
                  </p>
                  <Button asChild>
                    <a 
                      href="https://www.verwoehnwochenende.de/reiseversicherung" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      Mehr erfahren
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
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
