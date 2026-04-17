import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Server, Cookie, Mail, Users, Database, ExternalLink } from "lucide-react";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Datenschutzerklärung | DeineZeitEureZeit"
        description="Datenschutzerklärung gemäß DSGVO. Informationen zur Datenverarbeitung, Cookies, Affiliate-Tracking und Ihren Rechten auf lass-dich-verwoehnen.de."
        pageType="legal"
        canonicalPath="/datenschutz"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Datenschutz", url: "/datenschutz" },
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
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-datenschutz-title">
                  Datenschutzerklärung
                </h1>
                <p className="text-muted-foreground">Stand: Dezember 2024</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Wichtiger Hinweis: Affiliate-Partnershop
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">„DeineZeitEureZeit"</strong> ist ein Affiliate-Partnershop. 
                    Wir vermitteln Angebote unseres Partners{" "}
                    <a href="https://www.verwoehnwochenende.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                      Verwoehnwochenende.de
                    </a>{" "}
                    über das ADCELL Affiliate-Netzwerk.
                  </p>
                  <p>
                    Bei Klick auf ein Angebot werden Sie zu Verwoehnwochenende.de weitergeleitet. 
                    Die dortige Datenverarbeitung unterliegt der{" "}
                    <a href="https://www.verwoehnwochenende.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Datenschutzerklärung von Verwoehnwochenende.de
                    </a>.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  1. Verantwortliche Stellen
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium text-foreground mb-2">Betreiber dieser Website:</p>
                    <p>Rolf Schwertfechter</p>
                    <p>Karklandsweg 1, 26553 Dornum</p>
                    <p>E-Mail: <a href="mailto:rps-vertrieb@t-online.de" className="text-primary hover:underline">rps-vertrieb@t-online.de</a></p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium text-foreground mb-2">Unser Partner (Produktanbieter):</p>
                    <p>Verwoehnwochenende.de - Inhaberin: Dipl. Geographin Ariane Struck</p>
                    <p>Seilbahn 10, 47829 Krefeld-Uerdingen</p>
                    <p>E-Mail: <a href="mailto:service@verwoehnwochenende.de" className="text-primary hover:underline">service@verwoehnwochenende.de</a></p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-medium text-foreground mb-2">Affiliate-Netzwerk:</p>
                    <p>Firstlead GmbH (ADCELL)</p>
                    <p>Rosenfelder Str. 15-16, 10315 Berlin</p>
                    <p>Datenschutz: <a href="mailto:datenschutz@adcell.de" className="text-primary hover:underline">datenschutz@adcell.de</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  2. Übersicht der Datenverarbeitung
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung 
                    informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten 
                    auf unserer Website.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <p className="font-medium text-foreground mb-2">Was wir erheben:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Technische Zugriffsdaten (IP, Browser)</li>
                        <li>Newsletter-Anmeldungen (E-Mail)</li>
                        <li>Lokale Merklisten-Daten</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <p className="font-medium text-foreground mb-2">Was wir NICHT erheben:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Zahlungsdaten</li>
                        <li>Buchungsdaten</li>
                        <li>Persönliche Reisedaten</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  3. Hosting und Server-Log-Dateien
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Diese Website wird bei einem externen Dienstleister gehostet. Bei jedem Zugriff 
                    werden automatisch folgende Daten in Server-Log-Dateien gespeichert:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Browsertyp und -version</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL (zuvor besuchte Seite)</li>
                    <li>IP-Adresse (anonymisiert)</li>
                    <li>Uhrzeit der Serveranfrage</li>
                  </ul>
                  <p className="text-sm italic">
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der 
                    technischen Bereitstellung der Website).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-primary" />
                  4. Cookies und Tracking
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="font-medium text-foreground mb-2">Technisch notwendige Cookies</p>
                    <p className="text-sm">
                      Wir verwenden nur technisch notwendige Cookies, die für die Grundfunktion 
                      der Website erforderlich sind. Diese speichern keine personenbezogenen Daten.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="font-medium text-foreground mb-2">Affiliate-Tracking (ADCELL)</p>
                    <p className="text-sm">
                      Bei Klick auf Produktlinks wird ein Affiliate-Cookie gesetzt, um die Vermittlung 
                      zu erfassen. Dies dient der Abrechnung zwischen den Partnern und hat keine 
                      Auswirkungen auf den Preis für Sie.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  5. Lokale Speicherung (LocalStorage)
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Für die Merkliste und den Produktvergleich nutzen wir den LocalStorage Ihres Browsers:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Diese Daten werden <strong className="text-foreground">nur lokal auf Ihrem Gerät</strong> gespeichert</li>
                    <li>Sie werden <strong className="text-foreground">nicht an uns oder Dritte übertragen</strong></li>
                    <li>Sie können diese Daten jederzeit durch Löschen der Browser-Daten entfernen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  6. Newsletter
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Wenn Sie unseren Newsletter abonnieren, speichern wir Ihre E-Mail-Adresse für 
                    den Versand. Die Anmeldung erfolgt im Double-Opt-In-Verfahren.
                  </p>
                  <p>
                    Sie können Ihre Einwilligung jederzeit widerrufen über den Abmeldelink im 
                    Newsletter oder per E-Mail an uns.
                  </p>
                  <p className="text-sm italic">
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  7. Externe Links und Affiliate-Partner
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Diese Website enthält Affiliate-Links zu Verwoehnwochenende.de. Bei Klick auf 
                    diese Links:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Werden Sie zur Website des Partners weitergeleitet</li>
                    <li>Wird ein Affiliate-Cookie gesetzt (ADCELL)</li>
                    <li>Gilt ab diesem Zeitpunkt die Datenschutzerklärung des Partners</li>
                  </ul>
                  <p className="mt-4">
                    <strong className="text-foreground">Links zu den Datenschutzerklärungen:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <a href="https://www.verwoehnwochenende.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Verwoehnwochenende.de Datenschutz
                      </a>
                    </li>
                    <li>
                      <a href="https://www.adcell.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        ADCELL Datenschutz
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  8. Ihre Rechte
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { title: "Auskunftsrecht", desc: "Welche Daten wir über Sie speichern" },
                      { title: "Berichtigungsrecht", desc: "Korrektur unrichtiger Daten" },
                      { title: "Löschungsrecht", desc: "Löschung Ihrer Daten verlangen" },
                      { title: "Einschränkungsrecht", desc: "Einschränkung der Verarbeitung" },
                      { title: "Widerspruchsrecht", desc: "Der Verarbeitung widersprechen" },
                      { title: "Datenübertragbarkeit", desc: "Daten in maschinenlesbarer Form" },
                    ].map((right, i) => (
                      <div key={i} className="p-3 bg-secondary/30 rounded-lg">
                        <p className="font-medium text-foreground text-sm">{right.title}</p>
                        <p className="text-xs">{right.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">
                    Für Anfragen kontaktieren Sie uns unter:{" "}
                    <a href="mailto:rps-vertrieb@t-online.de" className="text-primary hover:underline">
                      rps-vertrieb@t-online.de
                    </a>
                  </p>
                  <p>
                    Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  9. Aktualität dieser Datenschutzerklärung
                </h2>
                <p className="text-muted-foreground">
                  Diese Datenschutzerklärung ist aktuell gültig (Stand: Dezember 2024). 
                  Durch Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher 
                  Vorgaben kann eine Aktualisierung erforderlich werden.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
