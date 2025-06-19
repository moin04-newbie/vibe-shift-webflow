
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Menu, X, Sparkles, Zap, Rocket, Brain, Globe, Shield, Cpu, Smartphone, Layers, ArrowRight, Play, Pause, Volume2, VolumeX, Github, Twitter, Linkedin, Mail, ChevronDown, Star, Award, Trophy, Code, Users, Database, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const loaderRef = useRef(null);
  const navRef = useRef(null);
  const cursorRef = useRef(null);
  const videoRef = useRef(null);

  // Track mouse for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Custom cursor animation
    gsap.to(cursorRef.current, {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      duration: 0.1,
      ease: "power2.out"
    });

    // Enhanced Loader Animation with AI-style text
    const tl = gsap.timeline();
    tl.to('.loader-text', {
      duration: 0.5,
      text: "INITIALIZING...",
      ease: "none"
    })
    .to('.loader-text', {
      duration: 0.5,
      text: "LOADING AI ENGINE...",
      ease: "none"
    }, "+=0.3")
    .to('.loader-text', {
      duration: 0.5,
      text: "OPTIMIZING PERFORMANCE...",
      ease: "none"
    }, "+=0.3")
    .to('.loader-text', {
      duration: 0.8,
      text: "VIBE SHIFT ACTIVATED ✨",
      ease: "none"
    }, "+=0.3")
    .to('.loader-glow', {
      scale: 2,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .to('.loader-progress', {
      width: "100%",
      duration: 2,
      ease: "power2.inOut"
    }, "-=2")
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

    // Advanced navbar entrance with stagger
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.8)", delay: 3 }
    );

    // Hero section with advanced animations
    const heroTimeline = gsap.timeline({ delay: 3.5 });
    heroTimeline
      .fromTo('.hero-title-main', 
        { opacity: 0, y: 150, scale: 0.5, rotationX: 90 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 2, ease: "elastic.out(1, 0.5)" }
      )
      .fromTo('.hero-title-sub', 
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "back.out(1.7)" }, "-=1.5"
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, x: -100, rotationY: 45 },
        { opacity: 1, x: 0, rotationY: 0, duration: 1.5, ease: "power3.out" }, "-=1"
      )
      .fromTo('.hero-buttons', 
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.8"
      );

    // Advanced Features animations with 3D effects
    gsap.fromTo('.feature-card', 
      { opacity: 0, y: 100, rotationX: -45, transformPerspective: 1000 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
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

    // Floating animations for cards
    gsap.to('.feature-card', {
      y: "random(-15, 15)",
      rotation: "random(-3, 3)",
      duration: "random(3, 6)",
      ease: "sine.inOut",
      stagger: 0.3,
      repeat: -1,
      yoyo: true,
      delay: 5
    });

    // Advanced Stats with counting animation
    gsap.fromTo('.stat-card', 
      { opacity: 0, scale: 0, rotationY: 180 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Testimonials horizontal scroll
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

    // CTA magnetic effect
    gsap.to('.cta-button', {
      scale: 1.05,
      boxShadow: "0 0 50px rgba(147, 51, 234, 0.8)",
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Parallax effects
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

    // Interactive particles
    gsap.to('.floating-particle', {
      y: "random(-30, 30)",
      x: "random(-20, 20)",
      rotation: "random(-360, 360)",
      duration: "random(4, 8)",
      ease: "sine.inOut",
      stagger: 0.1,
      repeat: -1,
      yoyo: true
    });

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 6);
    }, 4000);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(testimonialInterval);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    
    gsap.to('.theme-toggle', {
      rotation: 720,
      scale: 1.3,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
      repeat: 1
    });
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMenuOpen(false);
      gsap.to(window, {
        duration: 2,
        scrollTo: element,
        ease: "power3.inOut"
      });
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero', icon: '🏠' },
    { name: 'Features', id: 'features', icon: '⚡' },
    { name: 'AI Tools', id: 'ai-section', icon: '🤖' },
    { name: 'Stats', id: 'stats', icon: '📊' },
    { name: 'Reviews', id: 'testimonials', icon: '💬' },
    { name: 'Join', id: 'cta', icon: '🚀' }
  ];

  const features = [
    { 
      title: "AI-Powered Analytics", 
      emoji: "🤖", 
      desc: "Advanced machine learning algorithms that analyze user behavior and predict trends in real-time",
      color: "from-blue-500 to-cyan-500",
      icon: Brain
    },
    { 
      title: "Blockchain Integration", 
      emoji: "🔗", 
      desc: "Secure, decentralized data storage with smart contract automation for maximum transparency",
      color: "from-purple-500 to-pink-500",
      icon: Shield
    },
    { 
      title: "Quantum Processing", 
      emoji: "⚡", 
      desc: "Next-generation quantum computing capabilities for complex calculations and instant processing",
      color: "from-orange-500 to-red-500",
      icon: Zap
    },
    { 
      title: "IoT Connectivity", 
      emoji: "🌐", 
      desc: "Seamless integration with Internet of Things devices for comprehensive ecosystem management",
      color: "from-green-500 to-teal-500",
      icon: Globe
    },
    { 
      title: "Neural Networks", 
      emoji: "🧠", 
      desc: "Deep learning neural networks that adapt and evolve based on user interactions and data patterns",
      color: "from-indigo-500 to-purple-500",
      icon: Cpu
    },
    { 
      title: "AR/VR Ready", 
      emoji: "🥽", 
      desc: "Fully compatible with augmented and virtual reality platforms for immersive experiences",
      color: "from-pink-500 to-rose-500",
      icon: Smartphone
    }
  ];

  const testimonials = [
    { 
      name: "Alex Chen", 
      role: "AI Researcher", 
      text: "This platform has revolutionized how we approach machine learning. The quantum processing capabilities are mind-blowing!",
      avatar: "🚀",
      company: "TechCorp AI",
      rating: 5
    },
    { 
      name: "Sarah Kim", 
      role: "Blockchain Developer", 
      text: "The blockchain integration is seamless. Smart contracts deploy in seconds, not hours. Game-changing technology!",
      avatar: "⚡",
      company: "CryptoInnovate",
      rating: 5
    },
    { 
      name: "Marcus Johnson", 
      role: "IoT Specialist", 
      text: "Managing thousands of IoT devices has never been easier. The real-time analytics are incredibly detailed.",
      avatar: "🌐",
      company: "SmartDevices Inc",
      rating: 5
    },
    { 
      name: "Elena Rodriguez", 
      role: "VR Designer", 
      text: "The AR/VR compatibility is flawless. Our immersive experiences have reached new levels of engagement.",
      avatar: "🥽",
      company: "MetaDesign Studio",
      rating: 5
    },
    { 
      name: "Dr. James Wilson", 
      role: "Data Scientist", 
      text: "Neural network training that used to take weeks now completes in hours. The efficiency gains are remarkable.",
      avatar: "🧠",
      company: "DataLab Research",
      rating: 5
    },
    { 
      name: "Maya Patel", 
      role: "Startup Founder", 
      text: "This platform gave our startup the enterprise-level capabilities we needed to compete with tech giants.",
      avatar: "💎",
      company: "FutureStart",
      rating: 5
    }
  ];

  return (
    <div className={`${isDark ? 'dark' : ''} overflow-x-hidden relative`}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-80"
        style={{ left: 0, top: 0 }}
      />

      {/* Advanced floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `linear-gradient(45deg, 
                hsl(${Math.random() * 360}, 70%, 60%), 
                hsl(${Math.random() * 360}, 70%, 80%))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      {/* Premium Loader */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center"
      >
        <div className="text-center relative">
          <div className="loader-glow absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-3xl scale-75"></div>
          <div className="relative mb-8">
            <div className="loader-text text-white text-4xl md:text-6xl font-black mb-6">VIBE</div>
            <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto">
              <div className="loader-progress h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Premium Navbar */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-40 backdrop-blur-2xl bg-white/5 dark:bg-gray-900/5 border-b border-white/10 dark:border-gray-700/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Premium Logo */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative flex items-center space-x-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  VIBE
                </div>
                <div className="flex space-x-1">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  <Brain className="w-5 h-5 text-pink-400 animate-bounce" />
                  <Zap className="w-5 h-5 text-orange-400 animate-ping" />
                </div>
              </div>
            </div>

            {/* Premium Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-white/10 to-gray-100/10 dark:from-gray-800/10 dark:to-gray-700/10 backdrop-blur-2xl rounded-2xl px-8 py-4 border border-white/20">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-500 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10"
                >
                  <span className="relative z-10 flex items-center gap-3 font-semibold">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    {item.name}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                </button>
              ))}
            </div>

            {/* Premium Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="theme-toggle relative p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-xl">{isDark ? '☀️' : '🌙'}</span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-gray-600 dark:text-gray-400 hover:bg-white/20 transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-white/20">
            <div className="px-6 py-8 space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-6 py-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 flex items-center gap-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-lg">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Parallax Background */}
      <div className="parallax-bg fixed inset-0 z-0" data-speed="0.5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-pink-500/30 to-orange-400/40 dark:from-purple-900/50 dark:via-pink-900/40 dark:to-orange-900/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(249,115,22,0.1),transparent_50%)]"></div>
      </div>

      {/* Premium Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay 
          muted={isMuted}
          loop 
          playsInline
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Video Controls */}
        <div className="absolute top-24 right-8 flex space-x-3 z-20">
          <button
            onClick={toggleVideo}
            className="p-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="hero-title-main mb-4">
            <h1 className="text-8xl md:text-12xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-none">
              FUTURE
            </h1>
          </div>
          <div className="hero-title-sub mb-8">
            <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-none">
              IS NOW
            </h2>
          </div>
          <p className="hero-subtitle text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-16 max-w-4xl mx-auto font-light leading-relaxed">
            Experience the convergence of <span className="font-bold text-purple-600">AI</span>, 
            <span className="font-bold text-pink-600"> Blockchain</span>, and 
            <span className="font-bold text-orange-600"> Quantum Computing</span>
            <br />in one revolutionary platform
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('features')}
              className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-black rounded-2xl text-xl overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-4">
                Launch Experience 
                <Rocket className="w-7 h-7 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button 
              onClick={() => scrollToSection('ai-section')}
              className="group relative px-12 py-6 bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white font-black rounded-2xl text-xl hover:bg-white/30 transition-all duration-500"
            >
              <span className="flex items-center gap-4">
                Try AI Demo
                <Brain className="w-7 h-7 group-hover:animate-pulse" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" ref={featuresRef} className="relative py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              Revolutionary Features
            </h2>
            <p className="text-3xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge technology stack designed for the next generation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-12 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl" style={{background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-6xl">{feature.emoji}</div>
                    <feature.icon className="w-12 h-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{feature.desc}</p>
                  <button className="flex items-center gap-2 text-purple-600 font-semibold hover:gap-4 transition-all duration-300">
                    Learn More <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New AI Demo Section */}
      <section id="ai-section" className="relative py-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              AI in Action
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Watch our AI analyze data patterns in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-black rounded-2xl p-6 font-mono text-green-400 text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span>AI Neural Network Active</span>
                  </div>
                  <div className="space-y-2">
                    <div>Processing dataset: 50,000 data points...</div>
                    <div>Classification accuracy: 99.7%</div>
                    <div>Pattern recognition: Complete</div>
                    <div>Anomaly detection: 3 outliers found</div>
                    <div>Predictive model: Ready</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <Database className="w-10 h-10 text-purple-500" />
                  <h3 className="text-2xl font-bold">Real-time Analysis</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Our AI processes millions of data points per second, providing instant insights and predictions.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <Lock className="w-10 h-10 text-pink-500" />
                  <h3 className="text-2xl font-bold">Secure Processing</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">All data is processed with enterprise-grade encryption and privacy protection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section id="stats" ref={statsRef} className="relative py-32 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZmlsbC1yaWxlPSJub256ZXJvIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
              Performance Metrics
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Numbers that showcase our revolutionary impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10M+", label: "AI Computations", icon: "🤖", desc: "per second" },
              { number: "99.9%", label: "Uptime Guarantee", icon: "⚡", desc: "24/7 reliability" },
              { number: "256-bit", label: "Encryption", icon: "🔒", desc: "military grade" },
              { number: "< 10ms", label: "Response Time", icon: "⚡", desc: "lightning fast" }
            ].map((stat, index) => (
              <div key={index} className="stat-card text-center text-white group hover:scale-105 transition-all duration-500 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-6xl mb-6 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-5xl md:text-6xl font-black mb-4 group-hover:text-yellow-300 transition-colors duration-300">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-sm opacity-80">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="text-6xl md:text-7xl font-black text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              Industry Leaders Choose Us
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
              Trusted by innovators worldwide
            </p>
          </div>
          
          <div className="testimonials-container flex space-x-8 w-max px-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card flex-shrink-0 w-96 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-10 rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 border border-purple-100 dark:border-gray-600">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed font-medium">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-6 text-xl shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</div>
                    <div className="text-purple-600 dark:text-purple-400 font-medium">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section id="cta" ref={ctaRef} className="relative py-32 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/videos/cta-bg.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
          <h2 className="text-7xl md:text-9xl font-black text-white mb-12 leading-none">
            Join the
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Revolution
            </span>
          </h2>
          <p className="text-3xl md:text-4xl text-white/90 mb-16 font-light max-w-4xl mx-auto leading-relaxed">
            Be part of the future where AI, blockchain, and quantum computing converge
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <button className="cta-button group relative px-16 py-8 bg-white text-purple-900 font-black rounded-2xl text-2xl md:text-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-4">
                Start Free Trial
                <Rocket className="w-8 h-8 group-hover:animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative px-16 py-8 bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white font-black rounded-2xl text-2xl md:text-3xl hover:bg-white/30 transition-all duration-300">
              <span className="flex items-center gap-4">
                Schedule Demo
                <Award className="w-8 h-8 group-hover:animate-bounce" />
              </span>
            </button>
          </div>

          <div className="flex justify-center space-x-8 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span>50K+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              <span>Award Winning</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  VIBE
                </div>
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                Revolutionizing the digital landscape with cutting-edge AI, blockchain, and quantum technologies.
              </p>
              <div className="flex space-x-6">
                {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 transform"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-gray-400">
                {['AI Tools', 'Blockchain', 'Quantum Computing', 'Analytics', 'Security'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-purple-400 transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-400">
                {['About', 'Careers', 'Press', 'Partners', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-purple-400 transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 VIBE. All rights reserved. Patent pending technology.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
