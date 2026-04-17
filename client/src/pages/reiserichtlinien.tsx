import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Calendar, Clock, Users, FileCheck, AlertTriangle, Hotel, MapPin, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReiserichtlinienPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Reiserichtlinien | Buchung, Check-in & Stornierung"
        description="Wichtige Informationen für Ihre Kurzreise: Check-in/Check-out Zeiten, Inklusivleistungen, Stornierungsbedingungen und Anreise-Tipps."
        pageType="legal"
        canonicalPath="/reiserichtlinien"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Reiserichtlinien", url: "/reiserichtlinien" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Plane className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-reiserichtlinien-title">
                  Reiserichtlinien
                </h1>
                <p className="text-muted-foreground">Wichtige Informationen für Ihre Kurzreise</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Alle Reisen werden über unseren Partner{" "}
                  <strong className="text-foreground">Verwoehnwochenende.de</strong> gebucht und abgewickelt. 
                  Die folgenden Richtlinien geben Ihnen einen Überblick über wichtige Buchungsinformationen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Buchung & Reservierung
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">Online-Buchung</h3>
                      <p className="text-sm">
                        24/7 verfügbar auf Verwoehnwochenende.de. Sofortige Buchungsbestätigung per E-Mail.
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">Telefonische Buchung</h3>
                      <p className="text-sm">
                        Mo-Fr 9-18 Uhr unter +49 (0)2065 / 4999116
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Buchungen sind nach Bestätigung verbindlich</li>
                    <li>Änderungen je nach Verfügbarkeit möglich</li>
                    <li>Gutscheine können flexibel eingelöst werden</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Hotel className="h-5 w-5 text-primary" />
                  Check-in & Check-out
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        Check-in
                      </h3>
                      <p className="text-sm">
                        In der Regel ab <strong className="text-foreground">14:00 - 15:00 Uhr</strong>. 
                        Die genaue Zeit steht in Ihrer Buchungsbestätigung.
                      </p>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        Check-out
                      </h3>
                      <p className="text-sm">
                        In der Regel bis <strong className="text-foreground">10:00 - 11:00 Uhr</strong>. 
                        Late Check-out auf Anfrage gegen Aufpreis möglich.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Reisende & Belegung
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Standardbelegung: 2 Erwachsene pro Zimmer</li>
                    <li>Kinder: Altersangaben und Aufpreise variieren je nach Hotel</li>
                    <li>Zustellbetten: Auf Anfrage und gegen Aufpreis möglich</li>
                    <li>Haustiere: Bei ausgewählten Angeboten erlaubt (siehe Angebotsbeschreibung)</li>
                    <li>Barrierefreie Zimmer: Bei Bedarf direkt beim Hotel anfragen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Inklusivleistungen
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die im Preis enthaltenen Leistungen sind bei jedem Angebot aufgeführt. 
                    Typische Inklusivleistungen sind:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Übernachtung im gebuchten Zimmertyp",
                      "Frühstück oder Halbpension (je nach Angebot)",
                      "Nutzung des Wellnessbereichs",
                      "Parkplatz (je nach Hotel)",
                      "WLAN im Hotel",
                      "Spa-Anwendungen (bei Wellness-Paketen)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-secondary/30 rounded">
                        <FileCheck className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Stornierung & Umbuchung
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Stornierungsbedingungen variieren je nach Angebot und Hotel:
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">Kostenlose Stornierung</h3>
                      <p className="text-sm">
                        Viele Angebote bieten kostenlose Stornierung bis 24-48 Stunden vor Anreise.
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">Gutscheine</h3>
                      <p className="text-sm">
                        Hotelgutscheine sind in der Regel 3 Jahre gültig und können umgebucht werden.
                      </p>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">Hinweis</h3>
                      <p className="text-sm">
                        Die genauen Stornierungsbedingungen finden Sie in der jeweiligen Angebotsbeschreibung 
                        und Ihrer Buchungsbestätigung.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Anreise
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Die Anreise erfolgt eigenständig. In der Angebotsbeschreibung finden Sie:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Genaue Hoteladresse</li>
                    <li>Parkmöglichkeiten</li>
                    <li>Öffentliche Verkehrsanbindung</li>
                    <li>Entfernung zu Bahnhöfen und Flughäfen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Fragen zu Ihrer Reise?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="text-muted-foreground">
                    <p>Bei Fragen zu Buchung, Stornierung oder Ablauf:</p>
                    <p className="font-medium text-foreground mt-1">Verwoehnwochenende.de</p>
                    <p className="text-sm">Tel: +49 (0)2065 / 4999116</p>
                  </div>
                  <Button asChild>
                    <a 
                      href="https://www.verwoehnwochenende.de/reiserichtlinien" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      Alle Reiserichtlinien
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
