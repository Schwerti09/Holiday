import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertCircle, ShoppingCart, CreditCard, Truck, RotateCcw, Scale, ExternalLink } from "lucide-react";

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="AGB – Allgemeine Geschäftsbedingungen | DeineZeitEureZeit"
        description="Nutzungsbedingungen für den Affiliate-Shop DeineZeitEureZeit. Hinweise zur Affiliate-Partnerschaft mit Verwoehnwochenende.de und ADCELL."
        pageType="legal"
        canonicalPath="/agb"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "AGB", url: "/agb" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-agb-title">
                  Allgemeine Geschäftsbedingungen
                </h1>
                <p className="text-muted-foreground">Hinweise zur Nutzung unseres Affiliate-Shops</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Wichtiger Hinweis
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">„DeineZeitEureZeit"</strong> ist ein 
                    Affiliate-Partnershop und <strong className="text-foreground">kein eigenständiger Online-Shop</strong>. 
                    Wir verkaufen keine Produkte direkt und schließen keine Kaufverträge mit Ihnen ab.
                  </p>
                  <p>
                    Alle auf dieser Website präsentierten Angebote stammen von unserem Partner{" "}
                    <a href="https://www.verwoehnwochenende.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                      Verwoehnwochenende.de
                    </a>. 
                    Bei Buchung oder Kauf gelten ausschließlich die AGB von Verwoehnwochenende.de.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  § 1 Geltungsbereich
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Diese Nutzungsbedingungen gelten für die Nutzung der Website „DeineZeitEureZeit" 
                    (nachfolgend „Website"), betrieben von Rolf Schwertfechter, Karklandsweg 1, 26553 Dornum.
                  </p>
                  <p>
                    Mit der Nutzung dieser Website erklären Sie sich mit diesen Bedingungen einverstanden.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  § 2 Leistungsbeschreibung
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Diese Website bietet:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Präsentation von Kurzreisen, Wellness-Angeboten und Lifestyle-Produkten</li>
                    <li>Weiterleitung zu Verwoehnwochenende.de per Affiliate-Links</li>
                    <li>Merklisten- und Vergleichsfunktionen (lokal im Browser)</li>
                    <li>Newsletter-Service mit Angebots-Highlights</li>
                  </ul>
                  <p className="mt-4">
                    <strong className="text-foreground">Wir bieten NICHT:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Direkten Verkauf von Produkten oder Reisen</li>
                    <li>Buchungsabwicklung oder Zahlungsabwicklung</li>
                    <li>Kundenservice für Bestellungen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  § 3 Affiliate-Partnerschaft
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Wir sind Affiliate-Partner von Verwoehnwochenende.de im ADCELL Netzwerk. 
                    Das bedeutet:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Bei Klick auf ein Produkt werden Sie zu Verwoehnwochenende.de weitergeleitet</li>
                    <li>Wir erhalten für erfolgreiche Vermittlungen eine Provision</li>
                    <li>Der Preis für Sie bleibt unverändert</li>
                    <li>Der Kaufvertrag kommt ausschließlich mit Verwoehnwochenende.de zustande</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  § 4 Preise und Zahlung
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Die auf dieser Website angezeigten Preise werden von Verwoehnwochenende.de 
                    bereitgestellt und können sich jederzeit ändern.
                  </p>
                  <p>
                    <strong className="text-foreground">Wichtig:</strong> Die angezeigten Preise sind 
                    Richtwerte. Den verbindlichen Endpreis sehen Sie erst auf der Website von 
                    Verwoehnwochenende.de vor Abschluss der Buchung.
                  </p>
                  <p>
                    Alle Zahlungsmodalitäten werden direkt mit Verwoehnwochenende.de abgewickelt.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  § 5 Lieferung und Reiseleistungen
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Alle Informationen zu Lieferung, Versand und Reiseleistungen entnehmen Sie bitte 
                    den Angaben auf Verwoehnwochenende.de.
                  </p>
                  <p>
                    Für Fragen zu Ihrer Buchung oder Bestellung wenden Sie sich bitte direkt an:
                  </p>
                  <div className="p-4 bg-secondary/30 rounded-lg mt-2">
                    <p className="font-medium text-foreground">Verwoehnwochenende.de</p>
                    <p>Telefon: +49 (0)2065 / 4999116</p>
                    <p>E-Mail: service@verwoehnwochenende.de</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  § 6 Widerruf und Stornierung
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Da wir keine Verträge mit Ihnen abschließen, besteht gegenüber uns kein 
                    Widerrufsrecht.
                  </p>
                  <p>
                    Für Widerruf, Stornierung oder Umbuchung Ihrer bei Verwoehnwochenende.de 
                    getätigten Buchung gelten die dortigen Bedingungen. Bitte beachten Sie die{" "}
                    <a href="https://www.verwoehnwochenende.de/agb" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      AGB von Verwoehnwochenende.de
                    </a>.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  § 7 Haftungsausschluss
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Wir bemühen uns um Aktualität und Richtigkeit der Informationen auf dieser Website, 
                    übernehmen jedoch keine Gewähr für:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Richtigkeit, Vollständigkeit oder Aktualität der Preise und Verfügbarkeiten</li>
                    <li>Inhalte auf verlinkten externen Websites</li>
                    <li>Leistungen, die von Verwoehnwochenende.de erbracht werden</li>
                  </ul>
                  <p className="mt-4">
                    Für den Inhalt der verlinkten Seiten ist ausschließlich deren Betreiber verantwortlich.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  § 8 Urheberrecht
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Die Produktbilder und -beschreibungen auf dieser Website stammen von 
                    Verwoehnwochenende.de und werden im Rahmen der Affiliate-Partnerschaft verwendet.
                  </p>
                  <p>
                    Alle Rechte an den Inhalten verbleiben beim jeweiligen Rechteinhaber.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  § 9 Schlussbestimmungen
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Es gilt deutsches Recht. Sollten einzelne Bestimmungen dieser Nutzungsbedingungen 
                    unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                  </p>
                  <p className="text-sm italic mt-4">
                    Stand: Dezember 2024
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  AGB unseres Partners
                </h2>
                <p className="text-muted-foreground mb-4">
                  Für alle Buchungen und Käufe gelten die AGB von Verwoehnwochenende.de:
                </p>
                <a 
                  href="https://www.verwoehnwochenende.de/agb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  AGB von Verwoehnwochenende.de lesen
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
