/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { 
  AirVent, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Instagram, 
  Phone, 
  Menu, 
  X,
  ArrowRight,
  Wind,
  Wrench,
  Droplets,
  ShoppingCart,
  Building2,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOGO_URL = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDrb8H3XmSOO-R2cC-82rmF0JmReXS8g6iOLUAK9IHW1X6JRXcGsCxqKkUkYlujok5E-kTXflET6Ey5Kw1xymfIaivLos7gjUcl0iDLReGxxAcCTv5DdbJ9O09MnwnufjzuGogeh-PPAXyQg0SUalwZCtgocNe-dsLn2gkSj4bfY2RDz5A2m9zKMvQCPA/s320/climatiza%20logo%20fundo%20transparente%20textos%20em%20branco%20e%20azul%20claro.png";
const HERO_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIrKh3ZXMtKpQi9mnKPh580GHR0nR_kZ72U3rBSExhGLMHfj_pzxZzj06v2GApYXKL8P7Y7hFq1m6MBgN_mmjkNv4VYEQAjKpzBJZmgz3DxWVMJVOY-LU4kmVlmMHZDZmHFaS8CwFhyphenhyphenGk4L8md-vRJBzpAfrWry4Qs-4uzmkYCk_tQrBJu7608bydf00c/s16000/ar%20condicionado.png";
const ABOUT_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihMLFFP6RE-fP6En-9BOnQJG77vIrtdtHtqbp4k6hajEDqm8YCyn2J0PvdPBiDmT6gk9x9S7nHPndRw3XcUAUMeeV3nCv1RWgE4rRRE449R2mJeJM0JYUNIiVdWdaRlERwz7vBzShrQXnJqKPosyDNRXarVVWedM34c43mOx8-BWs1Z2meUllKscSA93g/s16000/sobre.png";
const WHATSAPP_LINK = "https://wa.me/5515998470610";
const INSTAGRAM_LINK = "https://www.instagram.com/climatizaconfortotermico";

export default function App() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const galleryImages = [
    "https://cdn1.pswex.com.br/wp-content/uploads/sites/51/2025/08/03004801/instalacao-de-ar-condiciona-em-salao-de-beleza-Climatiza-sorocaba-e-regiao.png",
    "https://cdn1.pswex.com.br/wp-content/uploads/sites/51/2025/08/03004758/instalacao-de-ar-condicionado-em-sorocaba-sp-casa-manutecao-instalacao-de-arcondicionado-sorocaba-sp-climatiza-empresas-pmoc-e1754412594892.jpeg",
    "https://cdn1.pswex.com.br/wp-content/uploads/sites/51/2025/08/03004800/Ar-condicionado-instalado-em-ambiente-interno-em-cima-de-uma-porta-Climatiza-sorocaba-e-regiao.png",
    "https://cdn1.pswex.com.br/wp-content/uploads/sites/51/2025/08/03004800/Instalacao-completa-de-ar-condicionado-fixado-em-parede-externa-Climatiza-sorocaba-e-regiao.png"
  ];

  useEffect(() => {
    // Sequential zoom animation for gallery
    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // GSAP animation for the active gallery image
    const activeImg = document.querySelector(`.gallery-img-${activeGalleryIndex}`);
    if (activeImg) {
      gsap.to(activeImg, {
        scale: 1.05,
        duration: 2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
      });

      // Scroll into view on mobile
      if (window.innerWidth < 640) {
        activeImg.parentElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeGalleryIndex]);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
      }
      if (e.key === 'ArrowRight' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  useEffect(() => {
    // Hero Entrance
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Scroll Reveal
      const sections = gsap.utils.toArray('.scroll-reveal');
      sections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        });
      });

      // Pulsing animation for authority items
      gsap.to('.auth-item', {
        scale: 1.08,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.3,
          from: 'start'
        }
      });

      // Header scroll effect
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          setIsScrolled(self.scroll() > 80);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.from('.mobile-menu-item', {
        x: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2
      });
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header 
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-5 px-4 sm:px-6 lg:px-8",
          isScrolled ? "bg-[#1e273a]/95 backdrop-blur-md py-3 shadow-lg border-b border-white/10" : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img 
              src={LOGO_URL} 
              alt="Climatiza Logo" 
              className={cn(
                "h-10 sm:h-12 w-auto object-contain transition-all duration-500",
                isScrolled && "brightness-0 invert"
              )}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Menu */}
          <div className={cn(
            "hidden md:flex items-center gap-8 text-sm font-bold transition-colors duration-500",
            "text-white"
          )}>
            <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
            <a href="#diferenciais" className="hover:text-primary transition-colors">Diferenciais</a>
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
          </div>

          {/* Desktop CTA */}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 items-center gap-2 animate-pulse-whatsapp"
          >
            <Phone className="animate-float-icon" size={16} />
            <span>Orçamento Grátis</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              "text-white"
            )}
          >
            {isMenuOpen ? <X className="animate-float-icon" size={28} /> : <Menu className="animate-float-icon" size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "mobile-menu fixed top-20 right-4 w-[240px] z-50 bg-[#1e273a]/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col p-6 border border-white/10 md:hidden transform translate-x-full opacity-0",
      )}>
        <nav className="flex flex-col gap-4">
          <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="mobile-menu-item text-lg font-medium text-white/90 hover:text-secondary transition-colors">Serviços</a>
          <a href="#diferenciais" onClick={() => setIsMenuOpen(false)} className="mobile-menu-item text-lg font-medium text-white/90 hover:text-secondary transition-colors">Diferenciais</a>
          <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="mobile-menu-item text-lg font-medium text-white/90 hover:text-secondary transition-colors">Sobre</a>
          <a href="#contato" onClick={() => setIsMenuOpen(false)} className="mobile-menu-item text-lg font-medium text-white/90 hover:text-secondary transition-colors">Contato</a>
        </nav>

        <div className="mt-6 pt-6 border-t border-white/10 mobile-menu-item">
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 text-sm animate-pulse-whatsapp"
          >
            <Phone className="animate-float-icon" size={18} />
            WhatsApp
          </a>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={HERO_IMAGE} 
              alt="Ar Condicionado Profissional" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl hero-content mt-16 sm:mt-20">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <AirVent className="animate-float-icon" size={14} />
                Especialistas em Conforto Térmico
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 text-balance">
                Climatização de <span className="text-secondary">Alta Performance</span> em Sorocaba
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed">
                Instalação, manutenção e higienização com garantia total de satisfação. Atendimento residencial e empresarial com plantão 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-primary/30 animate-pulse-whatsapp"
                >
                  Falar com Especialista
                  <ArrowRight className="animate-float-icon" size={20} />
                </a>
                <a 
                  href="#servicos"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  Nossos Serviços
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="py-8 sm:py-12 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center scroll-reveal auth-item">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">+4 Anos</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Experiência</div>
              </div>
              <div className="text-center scroll-reveal auth-item">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">24h</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Plantão</div>
              </div>
              <div className="text-center scroll-reveal auth-item">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Garantia</div>
              </div>
              <div className="text-center scroll-reveal auth-item">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">Sorocaba</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">e Região</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Soluções Completas em Climatização</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Oferecemos serviços especializados para garantir o melhor desempenho e a maior vida útil do seu ar-condicionado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  title: "Instalação Profissional",
                  desc: "Instalação técnica seguindo rigorosamente os padrões dos fabricantes para manter sua garantia.",
                  icon: <Wind className="text-secondary animate-float-icon" size={32} />,
                },
                {
                  title: "Manutenção Preventiva",
                  desc: "Check-up completo para evitar quebras inesperadas e garantir a eficiência energética.",
                  icon: <Wrench className="text-secondary animate-float-icon" size={32} />,
                },
                {
                  title: "Higienização Profunda",
                  desc: "Limpeza completa de filtros e serpentinas para eliminar fungos, bactérias e ácaros.",
                  icon: <Droplets className="text-secondary animate-float-icon" size={32} />,
                },
                {
                  title: "Venda com Instalação",
                  desc: "Consultoria para escolha do melhor aparelho e entrega do sistema pronto para uso.",
                  icon: <ShoppingCart className="text-secondary animate-float-icon" size={32} />,
                },
                {
                  title: "Infraestrutura",
                  desc: "Preparação de tubulações e drenagem em obras e reformas com acabamento impecável.",
                  icon: <Building2 className="text-secondary animate-float-icon" size={32} />,
                },
                {
                  title: "PMOC para Empresas",
                  desc: "Plano de Manutenção, Operação e Controle exigido por lei para ambientes comerciais.",
                  icon: <ShieldCheck className="text-secondary animate-float-icon" size={32} />,
                }
              ].map((service, idx) => (
                <div 
                  key={idx} 
                  className="group p-6 sm:p-8 rounded-2xl bg-[#0d1c34] transition-all duration-300 scroll-reveal"
                >
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                    <div className="mb-0 md:mb-6 p-3 bg-white/10 rounded-xl w-fit shadow-sm group-hover:scale-110 transition-transform shrink-0">
                      {service.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white md:mb-3">{service.title}</h3>
                  </div>
                  <p className="hidden md:block text-white/70 leading-relaxed mt-3">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials Bento Grid */}
        <section id="diferenciais" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Por que escolher a Climatiza?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Compromisso com a excelência e a satisfação total do cliente em cada detalhe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
              <div className="md:col-span-2 md:row-span-1 bg-primary rounded-3xl p-8 text-white flex flex-col justify-end relative overflow-hidden scroll-reveal">
                {/* Animated Clock Background */}
                <div className="absolute top-8 right-8 opacity-20 pointer-events-none">
                  <div className="relative w-32 h-32 border-4 border-white rounded-full">
                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
                    
                    {/* Hour hand wrapper */}
                    <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
                      <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-full"></div>
                    </div>
                    
                    {/* Minute hand wrapper */}
                    <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
                      <div className="absolute top-1/2 left-1/2 w-0.5 h-12 bg-white rounded-full -translate-x-1/2 -translate-y-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Plantão 24 Horas</h3>
                <p className="text-white/80 max-w-md">Sua emergência não tem hora para acontecer, e nós também não temos hora para te atender. Suporte total a qualquer momento.</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-center items-center text-center scroll-reveal">
                <ShieldCheck className="text-primary mb-4 animate-float-icon" size={48} />
                <h3 className="text-xl font-bold mb-2">Garantia Total</h3>
                <p className="text-slate-500 text-sm">Se não resolver seu problema, retornamos sem custos adicionais.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-center items-center text-center scroll-reveal">
                <CheckCircle2 className="text-primary mb-4 animate-float-icon" size={48} />
                <h3 className="text-xl font-bold mb-2">Experiência Comprovada</h3>
                <p className="text-slate-500 text-sm">Mais de 4 anos de atuação no mercado de Sorocaba com centenas de clientes satisfeitos.</p>
              </div>

              <div className="md:col-span-2 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center gap-8 scroll-reveal">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Facilidade no Pagamento</h3>
                  <p className="text-slate-400 mb-6">Aceitamos as principais bandeiras de cartão e PIX para sua comodidade.</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {['Mastercard', 'Amex', 'Hipercard', 'Elo', 'PIX'].map((card) => (
                      <div key={card} className="bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-white/90 shadow-sm whitespace-nowrap">
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
                <CreditCard className="text-primary opacity-50 animate-float-icon" size={80} />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="scroll-reveal order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Excelência em Climatização em Sorocaba</h2>
                
                {/* Image moved after title on mobile/tablet */}
                <div className="relative mb-8 lg:hidden">
                  <img 
                    src={ABOUT_IMAGE} 
                    alt="Nossa Equipe em Ação" 
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  A Climatiza Conforto Térmico nasceu com o propósito de elevar o padrão de serviços de ar-condicionado na região de Sorocaba/SP. Combinamos conhecimento técnico profundo com um atendimento humanizado e ágil.
                </p>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Nossa missão é proporcionar o clima ideal para sua casa ou empresa, garantindo não apenas temperatura agradável, mas também a qualidade do ar que você respira. Trabalhamos com as melhores marcas e ferramentas do mercado.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-primary animate-float-icon" size={20} />
                    Equipe técnica altamente qualificada
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-primary animate-float-icon" size={20} />
                    Uso de materiais de primeira linha
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-primary animate-float-icon" size={20} />
                    Foco total na limpeza e organização do local
                  </li>
                </ul>
                <a 
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                >
                  Siga nosso trabalho no Instagram
                  <ArrowRight className="animate-float-icon" size={20} />
                </a>
              </div>

              {/* Desktop Image */}
              <div className="relative scroll-reveal hidden lg:block order-1">
                <img 
                  src={ABOUT_IMAGE} 
                  alt="Nossa Equipe em Ação" 
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-2xl">
                  <div className="text-4xl font-bold mb-1">+4</div>
                  <div className="text-sm font-medium uppercase tracking-wider">Anos de História</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">O que dizem nossos clientes</h2>
              <div className="flex justify-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ricardo Santos",
                  text: "Serviço impecável! Instalaram 3 aparelhos na minha casa com uma limpeza que nunca vi igual. Recomendo muito.",
                  role: "Residencial"
                },
                {
                  name: "Ana Paula Mendes",
                  text: "O plantão 24h me salvou. Meu ar parou no meio da noite e em menos de 1 hora o técnico já estava aqui resolvendo.",
                  role: "Emergência"
                },
                {
                  name: "Marcos Oliveira",
                  text: "Contratei o PMOC para minha empresa e a organização deles é exemplar. Tudo dentro das normas e muito profissionais.",
                  role: "Empresarial"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-[#a0defb]/30 scroll-reveal transition-all hover:border-[#a0defb]">
                  <p className="text-slate-600 italic mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0f172b] rounded-full flex items-center justify-center font-bold text-white">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{testimonial.name}</div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Nossos Trabalhos</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Confira alguns de nossos projetos realizados com excelência e cuidado.
              </p>
            </div>

            <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-4 sm:pb-0 snap-x snap-mandatory no-scrollbar">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    "relative flex-shrink-0 w-[85vw] sm:w-auto aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 snap-center scroll-reveal",
                    activeGalleryIndex === idx ? "scale-[1.02] ring-4 ring-primary/20" : "scale-100"
                  )}
                >
                  <img 
                    src={img} 
                    alt={`Trabalho Climatiza ${idx + 1}`} 
                    className={cn(
                      "w-full h-full object-cover object-top gallery-img",
                      `gallery-img-${idx}`
                    )}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-bold">Ver Ampliado</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-[110]"
            >
              <X size={40} />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-[110] bg-white/10 p-2 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft size={40} />
            </button>

            <div className="relative max-w-5xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img 
                src={galleryImages[selectedImageIndex]} 
                alt="Trabalho Ampliado" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-[110] bg-white/10 p-2 rounded-full backdrop-blur-sm"
            >
              <ChevronRight size={40} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    selectedImageIndex === i ? "bg-primary w-8" : "bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section id="contato" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-primary rounded-[2rem] p-8 sm:p-16 text-center text-white relative overflow-hidden scroll-reveal">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[100px]"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-balance">Chega de sofrer com o calor, multas ou aparelhos que só dão problema.</h2>
              <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Não sofra com o calor ou com aparelhos barulhentos. Peça agora seu orçamento sem compromisso e garanta seu conforto.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3 animate-pulse-whatsapp"
                >
                  <Phone className="animate-float-icon" size={24} />
                  Chamar no WhatsApp
                </a>
                <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                  <MapPin className="animate-float-icon" size={16} />
                  Atendemos Sorocaba e Região
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between gap-12 mb-12 items-center md:items-start text-center md:text-left">
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <img 
                src={LOGO_URL} 
                alt="Climatiza Logo" 
                className="h-12 w-auto mb-6"
                referrerPolicy="no-referrer"
              />
              <p className="text-slate-400 max-w-sm mb-6">
                Especialistas em soluções térmicas para residências e empresas. Qualidade, garantia e atendimento 24h em Sorocaba/SP.
              </p>
              <div className="flex gap-4">
                <a href={INSTAGRAM_LINK} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="animate-float-icon" size={20} />
                </a>
                <a href={WHATSAPP_LINK} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Phone className="animate-float-icon" size={20} />
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <h4 className="font-bold mb-6 text-lg">Links Rápidos</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-6 text-lg">Contato</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center md:items-start gap-3">
                  <MapPin size={20} className="text-primary shrink-0 animate-float-icon" />
                  Sorocaba/SP e Região
                </li>
                <li className="flex items-center md:items-start gap-3">
                  <Phone size={20} className="text-primary shrink-0 animate-float-icon" />
                  (15) 99847-0610
                </li>
                <li className="flex items-center md:items-start gap-3">
                  <Clock size={20} className="text-primary shrink-0 animate-float-icon" />
                  Plantão 24 Horas
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col justify-center items-center gap-4 text-sm text-slate-500 text-center">
            <p>© Copyright 2026 - Climatiza Conforto Térmico</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
