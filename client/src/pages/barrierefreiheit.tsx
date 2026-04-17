import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Accessibility, Check, Mail, Phone, Monitor, Keyboard, Eye, Volume2 } from "lucide-react";

export default function BarrierefreiheitPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Barrierefreiheit | Digitale Zugänglichkeit | DeineZeitEureZeit"
        description="Unsere Barrierefreiheitserklärung: Tastaturnavigation, Screenreader-Kompatibilität, responsive Design. Tipps für barrierefreie Unterkünfte."
        pageType="legal"
        canonicalPath="/barrierefreiheit"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Barrierefreiheit", url: "/barrierefreiheit" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Accessibility className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-barrierefreiheit-title">
                  Barrierefreiheitserklärung
                </h1>
                <p className="text-muted-foreground">Unser Engagement für digitale Zugänglichkeit</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Unser Ziel
                </h2>
                <p className="text-muted-foreground">
                  Wir sind bestrebt, unsere Website für alle Menschen zugänglich zu gestalten – 
                  unabhängig von körperlichen, sensorischen oder kognitiven Einschränkungen. 
                  Barrierefreiheit ist für uns ein fortlaufender Prozess, den wir kontinuierlich 
                  verbessern.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Maßnahmen für Barrierefreiheit
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Monitor className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-foreground">Responsives Design</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Optimale Darstellung auf allen Geräten und Bildschirmgrößen.
                    </p>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Keyboard className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-foreground">Tastaturnavigation</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Alle Funktionen sind per Tastatur erreichbar.
                    </p>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-foreground">Kontraste</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ausreichende Farbkontraste für gute Lesbarkeit.
                    </p>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Volume2 className="h-5 w-5 text-primary" />
                      <h3 className="font-medium text-foreground">Screenreader</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Kompatibilität mit gängigen Screenreadern.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Technische Umsetzung
                </h2>
                <div className="space-y-3">
                  {[
                    "Semantisch korrektes HTML5",
                    "ARIA-Attribute für verbesserte Zugänglichkeit",
                    "Alternativtexte für Bilder",
                    "Skalierbare Schriftgrößen",
                    "Fokus-Indikatoren für interaktive Elemente",
                    "Überspringen von Navigationselementen möglich",
                    "Keine zeitkritischen Inhalte",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Tipps zur Nutzung
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Schriftgröße anpassen</h3>
                    <p className="text-sm">
                      Nutzen Sie <kbd className="px-2 py-1 bg-background rounded text-xs">Strg</kbd> + 
                      <kbd className="px-2 py-1 bg-background rounded text-xs ml-1">+</kbd> zum Vergrößern oder 
                      <kbd className="px-2 py-1 bg-background rounded text-xs ml-1">Strg</kbd> + 
                      <kbd className="px-2 py-1 bg-background rounded text-xs ml-1">-</kbd> zum Verkleinern.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Hoher Kontrast</h3>
                    <p className="text-sm">
                      Viele Betriebssysteme bieten einen Hochkontrastmodus. Unsere Website 
                      unterstützt diese Systemeinstellung.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Barrierefreie Unterkünfte
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Viele der bei Verwoehnwochenende.de angebotenen Hotels verfügen über 
                    barrierefreie Zimmer und Einrichtungen. Achten Sie bei der Buchung auf:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Stufenloser Zugang</li>
                    <li>Rollstuhlgerechte Zimmer</li>
                    <li>Barrierefreie Bäder</li>
                    <li>Aufzüge</li>
                  </ul>
                  <p className="mt-4">
                    Bei speziellen Anforderungen empfehlen wir, direkt Kontakt mit dem Hotel 
                    oder Verwoehnwochenende.de aufzunehmen.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Feedback & Verbesserungsvorschläge
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Haben Sie Schwierigkeiten bei der Nutzung unserer Website oder 
                    Verbesserungsvorschläge zur Barrierefreiheit? Wir freuen uns über 
                    Ihre Rückmeldung!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href="mailto:rps-vertrieb@t-online.de" className="text-primary hover:underline">
                        rps-vertrieb@t-online.de
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Rechtliche Grundlage
                </h2>
                <p className="text-muted-foreground text-sm">
                  Diese Barrierefreiheitserklärung orientiert sich an den Web Content Accessibility 
                  Guidelines (WCAG) 2.1 und der EU-Richtlinie 2016/2102. Wir arbeiten kontinuierlich 
                  daran, die Konformität zu verbessern.
                </p>
                <p className="text-muted-foreground text-sm mt-4">
                  Stand: Dezember 2024
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
