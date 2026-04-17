import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, MapPin, Calendar, Users, Sparkles, Hotel, Utensils, Star, ChevronDown, ChevronUp, Heart, Plane, Gem, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeroProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string | undefined) => void;
}

function FloatingParticle({ delay, duration, size, left, top }: { delay: number; duration: number; size: number; left: string; top: string }) {
  return (
    <div 
      className="absolute rounded-full bg-white/20 animate-float-particle pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

function GlowOrb({ color, size, left, top, delay }: { color: string; size: number; left: string; top: string; delay: number }) {
  return (
    <div 
      className="absolute rounded-full blur-3xl animate-pulse-slow pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: color,
        animationDelay: `${delay}s`,
        opacity: 0.4,
      }}
    />
  );
}

function TypewriterText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-blink">|</span>}
    </span>
  );
}

function CountUpNumber({ end, duration = 2000, suffix = "", delay = 0 }: { end: number; duration?: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOut));
      
      if (progress >= 1) clearInterval(interval);
    }, 16);
    
    return () => clearInterval(interval);
  }, [end, duration, started]);

  return <span>{count.toLocaleString('de-DE')}{suffix}</span>;
}

export function Hero({ onSearch, onCategoryChange }: HeroProps) {
  const [, setLocation] = useLocation();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reiseThema, setReiseThema] = useState("");
  const [verpflegung, setVerpflegung] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'destination' | 'region'>('destination');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim());
    }
    
    if (reiseThema === "reisen" || (!reiseThema && !searchTerm.trim())) {
      const url = params.toString() ? `/kategorie/reisen?${params}` : "/kategorie/reisen";
      setLocation(url);
    } else if (reiseThema) {
      const url = params.toString() ? `/kategorie/${reiseThema}?${params}` : `/kategorie/${reiseThema}`;
      setLocation(url);
    } else if (searchTerm.trim()) {
      setLocation(`/kategorie/reisen?${params}`);
    }
  };

  const particles = Array.from({ length: 30 }, (_, i) => ({
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
    size: 2 + Math.random() * 6,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden min-h-[650px] md:min-h-[750px] lg:min-h-[800px]" 
      data-testid="section-hero"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Video-like parallax background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop')`,
            transform: `scale(1.1) translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          }}
        />
        
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent mix-blend-overlay" />
        
        {/* Animated glow orbs */}
        <GlowOrb color="hsl(24, 95%, 53%)" size={400} left="-10%" top="20%" delay={0} />
        <GlowOrb color="hsl(24, 80%, 40%)" size={300} left="70%" top="60%" delay={2} />
        <GlowOrb color="hsl(30, 100%, 60%)" size={200} left="50%" top="10%" delay={4} />
        
        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite',
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32">
        
        {/* Floating badges */}
        <div className={`absolute top-8 right-8 md:top-16 md:right-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="glass rounded-2xl p-4 animate-float shadow-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">
                  <CountUpNumber end={9538} delay={800} suffix="+" />
                </div>
                <div className="text-xs text-white/70">Reiseangebote</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="max-w-4xl pt-8 md:pt-0">
          {/* Pre-headline badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Gem className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Premium Kurzreisen seit 2008</span>
          </div>
          
          {/* Main Headline with dramatic reveal */}
          <h1 
            className={`text-white mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-testid="text-hero-title"
          >
            <span className="block text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Unvergessliche
            </span>
            <span className="block text-5xl md:text-6xl lg:text-8xl font-black mt-2">
              <span className="bg-gradient-to-r from-primary via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Momente
              </span>
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-white/80 mt-4">
              warten auf Sie
            </span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className={`text-white/70 text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl leading-relaxed transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Entdecken Sie <span className="text-white font-semibold">handverlesene Hotels</span> für 
            Wellness, Romantik & Genuss. Ihr Traumurlaub beginnt hier.
          </p>

          {/* Stats row */}
          <div 
            className={`flex flex-wrap gap-6 md:gap-10 mb-10 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {[
              { icon: Hotel, value: 2500, suffix: "+", label: "Hotels" },
              { icon: Heart, value: 98, suffix: "%", label: "Zufriedenheit" },
              { icon: Plane, value: 50, suffix: "+", label: "Regionen" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-white text-xl md:text-2xl font-bold">
                    <CountUpNumber end={stat.value} delay={600 + i * 200} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Box - Premium Glass Design */}
          <div 
            className={`glass rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            data-testid="container-search-form"
          >
            {/* Search tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button 
                onClick={() => setActiveTab('destination')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'destination' 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`} 
                data-testid="tab-search"
              >
                <Search className="w-4 h-4" />
                <span>Fahrziel</span>
              </button>
              <button 
                onClick={() => setActiveTab('region')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'region' 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`} 
                data-testid="tab-region"
              >
                <MapPin className="w-4 h-4" />
                <span>Zielregion</span>
              </button>
            </div>

            {/* Search inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4">
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors z-10" />
                <Input
                  type="text"
                  placeholder={activeTab === 'destination' ? "Wo geht's hin?" : "Welche Region?"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                  data-testid="input-destination"
                />
              </div>

              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Anreisedatum"
                  className="pl-12 h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                  data-testid="input-date"
                />
              </div>

              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                <Select>
                  <SelectTrigger className="pl-12 h-14 bg-white/10 border-white/10 text-white focus:ring-2 focus:ring-primary/20 rounded-xl [&>span]:text-white/70" data-testid="select-guests">
                    <SelectValue placeholder="Personen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 Personen</SelectItem>
                    <SelectItem value="3">3 Personen</SelectItem>
                    <SelectItem value="4">4+ Personen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative group">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                <Select value={reiseThema} onValueChange={setReiseThema}>
                  <SelectTrigger className="pl-12 h-14 bg-white/10 border-white/10 text-white focus:ring-2 focus:ring-primary/20 rounded-xl [&>span]:text-white/70" data-testid="select-theme">
                    <SelectValue placeholder="Reisethema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reisen">Alle Reisen</SelectItem>
                    <SelectItem value="wellness">Wellness</SelectItem>
                    <SelectItem value="romantik">Romantik</SelectItem>
                    <SelectItem value="luxus">Luxus</SelectItem>
                    <SelectItem value="familie">Familie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSearch} 
                className="h-14 w-full sm:w-auto lg:min-w-[200px] text-base font-bold gap-2 bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_100%] animate-shimmer hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02] rounded-xl whitespace-nowrap px-6 flex-shrink-0"
                data-testid="button-search"
              >
                <Search className="w-5 h-5 flex-shrink-0" />
                Traumreise finden
              </Button>
            </div>

            {/* Advanced search toggle */}
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 mt-5 text-sm text-white/50 hover:text-white transition-colors"
              data-testid="button-advanced-search"
            >
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Detailsuche {showAdvanced ? 'schließen' : 'öffnen'}
            </button>

            {/* Advanced search fields */}
            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 pt-5 border-t border-white/10 animate-slide-up">
                <div className="relative">
                  <Hotel className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                  <Select>
                    <SelectTrigger className="pl-12 h-14 bg-white/10 border-white/10 text-white rounded-xl [&>span]:text-white/70" data-testid="select-hotel-features">
                      <SelectValue placeholder="Hotelausstattung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spa">Spa & Wellness</SelectItem>
                      <SelectItem value="pool">Pool</SelectItem>
                      <SelectItem value="sauna">Sauna</SelectItem>
                      <SelectItem value="fitness">Fitnesscenter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Hotel className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                  <Select>
                    <SelectTrigger className="pl-12 h-14 bg-white/10 border-white/10 text-white rounded-xl [&>span]:text-white/70" data-testid="select-room-features">
                      <SelectValue placeholder="Zimmerausstattung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balkon">Balkon</SelectItem>
                      <SelectItem value="whirlpool">Whirlpool</SelectItem>
                      <SelectItem value="kamin">Kamin</SelectItem>
                      <SelectItem value="minibar">Minibar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                  <Select value={verpflegung} onValueChange={setVerpflegung}>
                    <SelectTrigger className="pl-12 h-14 bg-white/10 border-white/10 text-white rounded-xl [&>span]:text-white/70" data-testid="select-meals">
                      <SelectValue placeholder="Verpflegung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fruehstueck">Frühstück</SelectItem>
                      <SelectItem value="halbpension">Halbpension</SelectItem>
                      <SelectItem value="vollpension">Vollpension</SelectItem>
                      <SelectItem value="allinclusive">All Inclusive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                  <Select>
                    <SelectTrigger className="pl-12 h-14 bg-white/10 border-white/10 text-white rounded-xl [&>span]:text-white/70" data-testid="select-stars">
                      <SelectValue placeholder="Hotelkategorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Sterne</SelectItem>
                      <SelectItem value="4">4 Sterne</SelectItem>
                      <SelectItem value="4s">4 Sterne Superior</SelectItem>
                      <SelectItem value="5">5 Sterne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Quick links / Popular themes */}
          <div 
            className={`flex flex-wrap gap-3 mt-8 transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-white/40 text-sm self-center mr-2">Beliebt:</span>
            {[
              { name: "Wellness", icon: "🧖" },
              { name: "Romantik", icon: "💕" },
              { name: "Silvester", icon: "🎆" },
              { name: "Städtetrips", icon: "🏙️" },
              { name: "Luxus", icon: "✨" },
            ].map((tag, i) => (
              <Link key={tag.name} href={`/kategorie/${tag.name.toLowerCase()}`}>
                <span 
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium glass text-white border border-white/10 hover:border-primary/50 hover:bg-primary/20 transition-all cursor-pointer hover:scale-105"
                  style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                >
                  <span className="text-base">{tag.icon}</span>
                  {tag.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
