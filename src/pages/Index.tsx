import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Menu, X, Sparkles, Zap, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const loaderRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Enhanced Loader Animation with text effect
    const tl = gsap.timeline();
    tl.to('.loader-text', {
      duration: 1,
      text: "VIBE CHECK...",
      ease: "none"
    })
    .to('.loader-glow', {
      scale: 1.5,
      opacity: 0.8,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.5")
    .to(loaderRef.current, {
      duration: 1.5,
      opacity: 0,
      scale: 0.8,
      rotationY: 180,
      ease: "power2.inOut",
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
      }
    });

    // Navbar entrance animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 2.5 }
    );

    // Enhanced Hero animations with stagger
    const heroTimeline = gsap.timeline({ delay: 3 });
    heroTimeline
      .fromTo('.hero-title', 
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.8)" }
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, x: -50, rotationX: 90 },
        { opacity: 1, x: 0, rotationX: 0, duration: 1.2, ease: "power3.out" }, "-=0.8"
      )
      .fromTo('.hero-button', 
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5"
      )
      .fromTo('.hero-particles', 
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 2, stagger: 0.1, ease: "power2.out" }, "-=1"
      );

    // Enhanced Features Section with morphing effects
    gsap.fromTo('.feature-card', 
      { opacity: 0, y: 100, scale: 0.5, rotation: 15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for feature cards
    gsap.to('.feature-card', {
      y: "random(-10, 10)",
      rotation: "random(-2, 2)",
      duration: "random(2, 4)",
      ease: "sine.inOut",
      stagger: 0.5,
      repeat: -1,
      yoyo: true,
      delay: 4
    });

    // Enhanced Stats with morphing numbers
    gsap.fromTo('.stat-card', 
      { opacity: 0, scale: 0, rotationY: 180 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Enhanced Testimonials with 3D effect
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
      gsap.to(testimonialsContainer, {
        x: () => -(testimonialsContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top top",
          end: () => `+=${testimonialsContainer.scrollWidth}`,
          pin: true,
          scrub: 1
        }
      });

      // 3D tilt effect on testimonial cards
      gsap.set('.testimonial-card', { transformPerspective: 1000 });
    }

    // Enhanced CTA with magnetic effect
    gsap.to('.cta-button', {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Parallax enhancements
    gsap.to('.parallax-bg', {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
      }
    });

    // Floating particles animation
    gsap.to('.floating-particle', {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      rotation: "random(-180, 180)",
      duration: "random(3, 6)",
      ease: "sine.inOut",
      stagger: 0.1,
      repeat: -1,
      yoyo: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    
    // Theme toggle animation
    gsap.to('.theme-toggle', {
      rotation: 360,
      scale: 1.2,
      duration: 0.5,
      ease: "back.out(1.7)",
      yoyo: true,
      repeat: 1
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMenuOpen(false);
      gsap.to(window, {
        duration: 1.5,
        scrollTo: element,
        ease: "power3.inOut"
      });
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero', icon: '🏠' },
    { name: 'Features', id: 'features', icon: '⚡' },
    { name: 'Stats', id: 'stats', icon: '📊' },
    { name: 'Reviews', id: 'testimonials', icon: '💬' },
    { name: 'Join', id: 'cta', icon: '🚀' }
  ];

  return (
    <div className={`${isDark ? 'dark' : ''} overflow-x-hidden relative`}>
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Loader */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="loader-glow absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
          <div className="loader-text text-white text-6xl font-black mb-4">VIBE</div>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full">
            <div className="h-full bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Ultra Cool Navbar */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with glow effect */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                VIBE
                <Sparkles className="inline-block ml-2 w-6 h-6 text-purple-400 animate-pulse" />
              </div>
            </div>

            {/* Desktop Navigation with glassmorphism */}
            <div className="hidden md:flex space-x-1 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/20"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    <span className="text-sm">{item.icon}</span>
                    {item.name}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle with enhanced animation */}
              <button
                onClick={toggleTheme}
                className="theme-toggle relative p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-lg">{isDark ? '☀️' : '🌙'}</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-gray-600 dark:text-gray-400 hover:bg-white/20 transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with enhanced animations */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-white/20">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 flex items-center gap-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Parallax Background */}
      <div className="parallax-bg fixed inset-0 z-0" data-speed="0.5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-orange-400/30 dark:from-purple-900/40 dark:via-pink-900/30 dark:to-orange-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      {/* Hero Section with enhanced visuals */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Hero particles */}
        <div className="hero-particles absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${20 + (i * 6)}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="hero-title text-7xl md:text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-8 leading-none">
            SHIFT THE
            <br />
            <span className="relative">
              VIBE
              <Zap className="absolute -top-4 -right-8 w-12 h-12 text-yellow-400 animate-bounce" />
            </span>
          </h1>
          <p className="hero-subtitle text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            Where <span className="font-bold text-purple-600">Gen-Z</span> meets <span className="font-bold text-pink-600">Millennial</span> energy. 
            <br />Experience the future of digital creativity.
          </p>
          <button 
            onClick={() => scrollToSection('features')}
            className="hero-button group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-black rounded-full text-xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore the Vibe 
              <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="relative py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Features That Hit Different
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">Discover what makes us unique</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "AI-Powered", emoji: "🤖", desc: "Smart automation that understands your vibe", color: "from-blue-500 to-cyan-500" },
              { title: "Social-First", emoji: "📱", desc: "Built for the social media generation", color: "from-purple-500 to-pink-500" },
              { title: "Real-Time", emoji: "⚡", desc: "Instant everything, because waiting is so 2010", color: "from-orange-500 to-red-500" }
            ].map((feature, index) => (
              <div key={index} className="feature-card group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-10 rounded-3xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border border-gray-200 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" style={{backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`}}></div>
                <div className={`text-8xl mb-6 filter drop-shadow-lg bg-gradient-to-r ${feature.color} bg-clip-text`}>
                  {feature.emoji}
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="relative py-24 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZmlsbC1yaWxlPSJub256ZXJvIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "1M+", label: "Vibes Created", icon: "🔥" },
              { number: "500K", label: "Active Users", icon: "👥" },
              { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
              { number: "24/7", label: "Support", icon: "💬" }
            ].map((stat, index) => (
              <div key={index} className="stat-card text-center text-white group hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-6xl md:text-7xl font-black mb-4 group-hover:text-yellow-300 transition-colors duration-300">{stat.number}</div>
                <div className="text-xl opacity-90 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="text-6xl md:text-7xl font-black text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Vibe Check ✨
            </h2>
          </div>
          
          <div className="testimonials-container flex space-x-8 w-max px-8">
            {[
              { name: "Alex Z", role: "Content Creator", text: "This platform literally changed my entire workflow. The AI understands my aesthetic perfectly!", avatar: "🦄" },
              { name: "Jordan M", role: "Social Media Manager", text: "Finally, a tool that speaks Gen-Z. The automation features are *chef's kiss*", avatar: "🚀" },
              { name: "Taylor R", role: "Influencer", text: "The real-time collaboration is insane. My team and I create magic together now.", avatar: "✨" },
              { name: "Casey L", role: "Designer", text: "The aesthetic is everything. Clean, modern, and actually functional. Rare combo!", avatar: "🎨" },
              { name: "Morgan K", role: "Entrepreneur", text: "ROI went through the roof after switching. The analytics are incredibly detailed.", avatar: "📈" }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card flex-shrink-0 w-96 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-100 dark:border-gray-600">
                <div className="text-3xl mb-6">{testimonial.avatar}</div>
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed font-medium">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4 text-xl shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</div>
                    <div className="text-purple-600 dark:text-purple-400 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" ref={ctaRef} className="relative py-24 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/videos/cta-bg.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <h2 className="text-7xl md:text-8xl font-black text-white mb-8 leading-none">
            Ready to Shift
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Your Vibe?
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-16 font-light max-w-3xl mx-auto">
            Join the movement that's redefining digital creativity
          </p>
          <button className="cta-button group relative px-16 py-8 bg-white text-purple-900 font-black rounded-full text-2xl md:text-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center gap-4">
              Join the Vibe Revolution 
              <span className="text-3xl group-hover:animate-spin">🚀</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            VIBE
            <Sparkles className="inline-block ml-2 w-8 h-8 text-purple-400" />
          </div>
          <p className="text-gray-400 mb-12 text-xl">Shifting the digital landscape, one vibe at a time.</p>
          <div className="flex justify-center space-x-8 mb-8">
            {['Twitter', 'Instagram', 'TikTok', 'Discord'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 text-lg font-semibold hover:scale-110 transform"
              >
                {social}
              </a>
            ))}
          </div>
          <div className="text-gray-500 text-sm">© 2024 VIBE. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
