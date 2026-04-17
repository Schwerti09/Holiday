import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, User, Building2, Network, Shield, ExternalLink } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Impressum | DeineZeitEureZeit – Affiliate-Shop"
        description="Impressum von DeineZeitEureZeit. Betreiber: Rolf Schwertfechter, Dornum. Affiliate-Partner von Verwoehnwochenende.de. Kontaktdaten und rechtliche Hinweise."
        pageType="legal"
        canonicalPath="/impressum"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Impressum", url: "/impressum" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8" data-testid="text-impressum-title">
            Impressum
          </h1>

          <div className="space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  Hinweis: Affiliate-Partnershop
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">„DeineZeitEureZeit"</strong> ist ein unabhängiger 
                    Affiliate-Partnershop. Wir präsentieren Ihnen ausgewählte Kurzreisen, Wellness-Angebote 
                    und Premium-Lifestyle-Produkte unseres Partners{" "}
                    <a href="https://www.verwoehnwochenende.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                      Verwoehnwochenende.de
                    </a>.
                  </p>
                  <p>
                    Bei einem Kauf über unsere Links werden Sie direkt zum Angebot bei Verwoehnwochenende.de 
                    weitergeleitet. Wir erhalten für die Vermittlung eine Provision. <strong className="text-foreground">
                    Der Preis für Sie bleibt dabei unverändert.</strong>
                  </p>
                  <p>
                    Die Abwicklung von Bestellungen, Zahlungen, Versand und Kundenservice erfolgt 
                    ausschließlich durch Verwoehnwochenende.de. Für Fragen zu Ihrer Bestellung wenden 
                    Sie sich bitte direkt an den Partner.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Betreiber dieser Website (Affiliate-Partner)
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-medium text-foreground text-lg">Rolf Schwertfechter</p>
                  <p>Einzelunternehmer</p>
                  <div className="mt-4 space-y-1">
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-primary" />
                      <span>Karklandsweg 1, 26553 Dornum, Deutschland</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href="mailto:rps-vertrieb@t-online.de" className="text-primary hover:underline" data-testid="link-impressum-email">
                        rps-vertrieb@t-online.de
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Unser Partner: Verwoehnwochenende.de
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="space-y-2">
                    <p className="font-medium text-foreground text-lg">Verwoehnwochenende.de</p>
                    <p>Seilbahn 10</p>
                    <p>47829 Krefeld-Uerdingen</p>
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-foreground font-medium">Inhaberin:</span> Dipl. Geographin Ariane Struck</p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2">
                      <span className="text-foreground font-medium">Telefon:</span> +49 (0)2065 / 4999116
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-foreground font-medium">Fax:</span> +49 (0)2065 / 94 230
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-foreground font-medium">E-Mail:</span>{" "}
                      <a href="mailto:service@verwoehnwochenende.de" className="text-primary hover:underline">
                        service@verwoehnwochenende.de
                      </a>
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p><span className="text-foreground font-medium">USt-IdNr.:</span> DE221828771</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm">
                      <span className="text-foreground font-medium">Technische Betreuung:</span>{" "}
                      Alexander Boos (SDG GmbH), Fabian Schatz
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  Affiliate-Netzwerk: ADCELL
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die Partnerschaft zwischen „DeineZeitEureZeit" und Verwoehnwochenende.de wird 
                    über das Affiliate-Netzwerk ADCELL abgewickelt.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Firstlead GmbH</p>
                    <p>Rosenfelder Str. 15-16</p>
                    <p>10315 Berlin, Deutschland</p>
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-foreground font-medium">Geschäftsführer:</span> Marcus Seidel, Gregor Janik</p>
                    <p><span className="text-foreground font-medium">USt-IdNr.:</span> DE219507810</p>
                    <p><span className="text-foreground font-medium">Handelsregister:</span> Amtsgericht Berlin, HRB 83223</p>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-border">
                    <p className="flex items-center gap-2">
                      <span className="text-foreground font-medium">Hotline Publisher:</span> +49 (0)30 - 609 83 61-0
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-foreground font-medium">E-Mail:</span>{" "}
                      <a href="mailto:service@adcell.de" className="text-primary hover:underline">
                        service@adcell.de
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-foreground font-medium">Datenschutz:</span>{" "}
                      <a href="mailto:datenschutz@adcell.de" className="text-primary hover:underline">
                        datenschutz@adcell.de
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Haftungshinweis
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die 
                    Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich 
                    deren Betreiber verantwortlich.
                  </p>
                  <p>
                    Die Preisangaben auf dieser Website sind ohne Gewähr und können von den 
                    tatsächlichen Preisen bei Verwoehnwochenende.de abweichen. Bitte prüfen Sie 
                    den aktuellen Preis vor der Buchung direkt beim Anbieter.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Copyright-Hinweis
                </h2>
                <p className="text-muted-foreground">
                  Die Produktbilder und -beschreibungen stammen von Verwoehnwochenende.de und 
                  werden mit Genehmigung verwendet. Alle Rechte an den Inhalten verbleiben beim 
                  jeweiligen Rechteinhaber.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Hinweis zur EU-Streitbeilegung
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Die EU-Kommission hat eine Internetseite zur Online-Streitbeilegung zwischen 
                    Unternehmern und Verbrauchern (OS-Plattform) eingerichtet, die Sie unter{" "}
                    <a 
                      href="http://ec.europa.eu/consumers/odr/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      ec.europa.eu/consumers/odr
                      <ExternalLink className="h-3 w-3" />
                    </a>{" "}
                    erreichen.
                  </p>
                  <p>
                    Da wir lediglich Affiliate-Partner sind und keine direkten Kaufverträge mit 
                    Ihnen abschließen, sind wir nicht zur Teilnahme an einem Streitbeilegungsverfahren 
                    vor einer Verbraucherschlichtungsstelle verpflichtet. Bei Streitigkeiten wenden 
                    Sie sich bitte direkt an Verwoehnwochenende.de.
                  </p>
                  <p className="text-sm italic">
                    Hinweis: Verwoehnwochenende.de ist weder bereit noch verpflichtet, an 
                    Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
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
