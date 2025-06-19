
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Loader Animation
    const tl = gsap.timeline();
    tl.to(loaderRef.current, {
      duration: 2,
      opacity: 0,
      scale: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
      }
    });

    // Hero Section Animations
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 2.2 }
    );

    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 2.8 }
    );

    // Features Section Scroll Animation
    gsap.fromTo('.feature-card', 
      { opacity: 0, y: 80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats Counter Animation
    gsap.fromTo('.stat-card', 
      { opacity: 0, scale: 0.5, rotation: 10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Testimonials Horizontal Scroll
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
    }

    // CTA Pulse Animation
    gsap.to('.cta-button', {
      scale: 1.05,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Parallax Background
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: element,
        ease: "power3.inOut"
      });
    }
  };

  return (
    <div className={`${isDark ? 'dark' : ''} overflow-x-hidden`}>
      {/* Loader */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center"
      >
        <div className="text-white text-6xl font-bold animate-pulse">VIBE</div>
      </div>

      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              VIBE
            </div>
            <div className="hidden md:flex space-x-8">
              {['hero', 'features', 'stats', 'testimonials', 'cta'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Parallax Background */}
      <div className="parallax-bg fixed inset-0 z-0" data-speed="0.5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-orange-400/20 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-orange-900/30"></div>
      </div>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="hero-title text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-6">
            SHIFT THE VIBE
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Where Gen-Z meets Millennial energy. Experience the future of digital creativity.
          </p>
          <button 
            onClick={() => scrollToSection('features')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-purple-500/25"
          >
            Explore the Vibe ✨
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="relative py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Features That Hit Different
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Discover what makes us unique</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered", emoji: "🤖", desc: "Smart automation that understands your vibe" },
              { title: "Social-First", emoji: "📱", desc: "Built for the social media generation" },
              { title: "Real-Time", emoji: "⚡", desc: "Instant everything, because waiting is so 2010" }
            ].map((feature, index) => (
              <div key={index} className="feature-card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="text-6xl mb-4">{feature.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="relative py-20 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "1M+", label: "Vibes Created" },
              { number: "500K", label: "Active Users" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="stat-card text-center text-white">
                <div className="text-5xl font-black mb-2">{stat.number}</div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Vibe Check
            </h2>
          </div>
          
          <div className="testimonials-container flex space-x-8 w-max">
            {[
              { name: "Alex Z", role: "Content Creator", text: "This platform literally changed my entire workflow. The AI understands my aesthetic perfectly!" },
              { name: "Jordan M", role: "Social Media Manager", text: "Finally, a tool that speaks Gen-Z. The automation features are *chef's kiss*" },
              { name: "Taylor R", role: "Influencer", text: "The real-time collaboration is insane. My team and I create magic together now." },
              { name: "Casey L", role: "Designer", text: "The aesthetic is everything. Clean, modern, and actually functional. Rare combo!" },
              { name: "Morgan K", role: "Entrepreneur", text: "ROI went through the roof after switching. The analytics are incredibly detailed." }
            ].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl">
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" ref={ctaRef} className="relative py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/videos/cta-bg.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-6xl font-black text-white mb-6">
            Ready to Shift Your Vibe?
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            Join the movement that's redefining digital creativity
          </p>
          <button className="cta-button px-12 py-6 bg-white text-purple-900 font-black rounded-full text-2xl hover:bg-gray-100 transition-colors duration-300 shadow-2xl">
            Join the Vibe Revolution 🚀
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            VIBE
          </div>
          <p className="text-gray-400 mb-8">Shifting the digital landscape, one vibe at a time.</p>
          <div className="flex justify-center space-x-6">
            {['Twitter', 'Instagram', 'TikTok', 'Discord'].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
