"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const mainRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 900);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const mobile = window.innerWidth <= 900;
    const sceneScale = mobile ? 22 : 11;
    const circleEnd = "circle(0px at 90% 25%)";

    const ctx = gsap.context(() => {
      const header = document.querySelector(".header");
      const logo = document.querySelector(".header-logo");
      const buttons = document.querySelector(".header-buttons");
      const layerHero = document.querySelector(".layer-hero");

      let headerIsHiddenForSection2 = false;

      const hideHeaderForSection2 = () => {
        if (headerIsHiddenForSection2) return;
        headerIsHiddenForSection2 = true;
        gsap.killTweensOf([logo, buttons, header]);
        gsap.to(logo, { x: -120, opacity: 0, duration: 0.35, ease: "power2.inOut" });
        gsap.to(buttons, { x: 120, opacity: 0, duration: 0.35, ease: "power2.inOut" });
        gsap.to(header, { pointerEvents: "none", duration: 0, delay: 0.2 });
      };

      const showHeader = () => {
        if (!headerIsHiddenForSection2) return;
        headerIsHiddenForSection2 = false;
        gsap.killTweensOf([logo, buttons, header]);
        gsap.set(header, { pointerEvents: "auto" });
        gsap.to(logo, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
        gsap.to(buttons, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
      };

      gsap.set(logo, { x: 0, opacity: 1 });
      gsap.set(buttons, { x: 0, opacity: 1 });

      if (mobile) {
        // Mobile: simple fade hero, scene title is static, cards below
        gsap.set(".layer-hero", { opacity: 1 });
        gsap.set(".hero-center-wrap", { opacity: 1 });
        gsap.set(".mobile-scene-section", { opacity: 1 });
        gsap.set(".hiw-steps-container", { opacity: 0, y: 30 });

        const mobileIntro = gsap.timeline({
          scrollTrigger: {
            trigger: ".intro-trigger",
            start: "top top",
            end: "+=80%",
            scrub: 0.15,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (p > 0.1) {
                header.style.opacity = "0";
                header.style.visibility = "hidden";
                header.style.pointerEvents = "none";
              } else {
                header.style.opacity = "1";
                header.style.visibility = "visible";
                header.style.pointerEvents = "auto";
              }
            },
          },
        });

        mobileIntro.to(".hero-center-wrap", { opacity: 0, scale: 0.85, duration: 0.5, ease: "power2.in" }, 0);
        mobileIntro.to(".layer-hero", { opacity: 0, duration: 0.5, ease: "power2.in" }, 0.15);

        // Fade in cards when scrolling to them
        ScrollTrigger.create({
          trigger: ".hiw-section",
          start: "top 85%",
          onEnter: () => {
            gsap.to(".hiw-steps-container", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            header.style.opacity = "1";
            header.style.visibility = "visible";
            header.style.pointerEvents = "auto";
            header.classList.add("header-light");
          },
          onLeaveBack: () => {
            gsap.to(".hiw-steps-container", { opacity: 0, y: 30, duration: 0.3, ease: "power2.in" });
          },
        });

      } else {
        // Desktop: full scroll-driven intro animation
        gsap.set(".layer-scene", {
          scale: sceneScale,
          rotation: -60,
          x: "-40vw",
          y: "25dvh",
          transformOrigin: "90% 25%",
          visibility: "visible",
          opacity: 1,
        });

        gsap.set(".layer-hero", { clipPath: "circle(150vmax at 50% 50%)", opacity: 1 });
        gsap.set(".hero-center-wrap", { top: "0", left: "0", scale: 1, rotation: 0, opacity: 1, position: "relative" });
        gsap.set(".hiw-steps-container", { opacity: 0, y: 40 });

        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".intro-trigger",
            start: "top top",
            end: "+=250%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (p > 0.05 && p < 0.75) {
                header.style.opacity = "0";
                header.style.visibility = "hidden";
                header.style.pointerEvents = "none";
              } else {
                header.style.opacity = "1";
                header.style.visibility = "visible";
                if (!headerIsHiddenForSection2) {
                  header.style.pointerEvents = "auto";
                }
                if (p >= 0.75) {
                  header.classList.add("header-light");
                } else {
                  header.classList.remove("header-light");
                }
              }
              if (layerHero) {
                if (p > 0.2) {
                  layerHero.style.pointerEvents = "none";
                } else {
                  layerHero.style.pointerEvents = "auto";
                }
              }
            },
          },
        });

        introTl.to(".layer-scene", { scale: 1, rotation: 0, x: "0vw", y: "0dvh", duration: 0.5, ease: "none" }, 0);
        introTl.to(".layer-hero", { clipPath: circleEnd, duration: 0.35, ease: "power1.in" }, 0);
        introTl.to(".hero-center-wrap", { top: "-25%", left: "40%", scale: 0.3, rotation: 40, duration: 0.3, ease: "power1.in" }, 0);
        introTl.to(".hero-center-wrap", { opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
        introTl.to(".layer-hero", { opacity: 0, duration: 0.01, ease: "none" }, 0.35);
        introTl.to(".hiw-steps-container", { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.55);
      }

      const hiwRows = gsap.utils.toArray(".hiw-step-row");
      hiwRows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        });
      });

      ScrollTrigger.create({
        trigger: ".features-section",
        start: "top top+=60",
        onEnter: () => { header.classList.remove("header-light"); hideHeaderForSection2(); },
        onLeaveBack: () => { header.classList.add("header-light"); showHeader(); },
      });

      gsap.fromTo(".features-label", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".features-heading", start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".features-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".features-heading", start: "top 80%", toggleActions: "play none none reverse" } });

      const featureRows = gsap.utils.toArray(".feature-row");
      featureRows.forEach((row) => {
        const isReversed = row.classList.contains("reverse");
        const visual = row.querySelector(".feature-visual");
        const info = row.querySelector(".feature-info");
        gsap.fromTo(visual, { opacity: 0, x: isReversed ? 250 : -250, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none reverse" } });
        gsap.fromTo(info, { opacity: 0, x: isReversed ? -200 : 200 }, { opacity: 1, x: 0, duration: 1, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none reverse" } });
      });

      gsap.fromTo(".cta-label", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".section3", start: "top 75%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".cta-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".section3", start: "top 75%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".cta-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".section3", start: "top 75%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".cta-buttons", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out", scrollTrigger: { trigger: ".section3", start: "top 75%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".cta-stats", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power2.out", scrollTrigger: { trigger: ".section3", start: "top 75%", toggleActions: "play none none reverse" } });

      gsap.fromTo(".footer-top", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ".footer", start: "top 90%", toggleActions: "play none none none" } });
      gsap.fromTo(".footer-divider-line", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.4, delay: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".footer", start: "top 90%", toggleActions: "play none none none" } });
      gsap.fromTo(".footer-credits-label", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.25, ease: "power2.out", scrollTrigger: { trigger: ".footer", start: "top 90%", toggleActions: "play none none none" } });

      const footerNames = gsap.utils.toArray(".footer-name");
      footerNames.forEach((name, i) => {
        gsap.fromTo(name, { opacity: 0, scale: 0.8, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, delay: 0.35 + i * 0.1, ease: "back.out(1.7)", scrollTrigger: { trigger: ".footer", start: "top 90%", toggleActions: "play none none none" } });
      });

      gsap.fromTo(".footer-bottom", { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".footer", start: "top 90%", toggleActions: "play none none none" } });

      ScrollTrigger.create({
        trigger: ".section3",
        start: "top 80px",
        onEnter: () => { header.classList.remove("header-light"); showHeader(); },
        onLeaveBack: () => { header.classList.remove("header-light"); hideHeaderForSection2(); },
      });

      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { ScrollTrigger.refresh(); }, 200);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
      };
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const stepsData = [
    { title: "Adaptive Learning Path", desc: "Our AI builds a personalized curriculum that evolves as you improve." },
    { title: "Interactive Lessons", desc: "Bite-sized lessons combining reading, listening, speaking, and writing." },
    { title: "AI Conversations", desc: "Practice with our AI tutor in realistic scenarios to build fluency." },
    { title: "Smart Repetition", desc: "Spaced repetition brings back weak areas at the perfect moment." },
    { title: "Track & Level Up", desc: "Watch your progress with detailed stats, streaks, and achievements." },
  ];

  // =============================================
  // CHANGE YOUR NAMES HERE:
  // =============================================
  const teamMembers = ["Name1", "Name2", "Name3"];
  // =============================================

  return (
    <div ref={mainRef}>
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <img src="/images/logo.svg" alt="Bulbul Logo" className="logo-img" />
          </div>
          <div className="header-buttons">
            <Link href="/login" className="btn-login">Login</Link>
            <Link href="/signup" className="btn-signup">Get Started</Link>
          </div>
        </div>
      </header>

      <div className="brand-bg-wrapper">
        <section className="intro-trigger">
          <div className="intro-container">
            <div className="layer-scene">
              <div className="scene-content">
                <div className="scene-label">How Bulbul Works</div>
                <h2 className="scene-title">5 steps to fluency</h2>
              </div>
            </div>
            <div className="layer-hero">
              <div className="hero-center-wrap">
                <div className="hero-content">
                  <div className="hero-left">
                    <img src="/images/vocal.webp" alt="Vocal" className="hero-icon" />
                    <h1 className="hero-title">Learn<br /><span className="hero-highlight">English</span><br />the smart way</h1>
                    <Link href="/signup" className="hero-main-cta">Get started for free</Link>
                  </div>
                  <div className="hero-right">
                    <div className="hero-visual-wrapper">
                      <div className="hero-blob"></div>
                      <img src="/images/hero.svg" alt="App Preview" className="hero-main-img" />
                      <img src="/images/moscot.webp" alt="Mascot" className="hero-mascot" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile-only: static scene title between hero and cards */}
        {isMobile && (
          <section className="mobile-scene-section">
            <div className="mobile-scene-content">
              <div className="scene-label">How Bulbul Works</div>
              <h2 className="scene-title">5 steps to fluency</h2>
            </div>
          </section>
        )}

        <section className="hiw-section">
          <div className="hiw-bg-lines">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 600">
              <path d="M -100 150 Q 600 300, 1500 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
              <path d="M -100 450 Q 800 200, 1500 500" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
              <path d="M 300 -50 Q 500 300, 1200 700" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
            </svg>
          </div>
          <div className="hiw-steps-container">
            {stepsData.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div key={i} className={`hiw-step-row ${isActive ? "active" : ""}`}>
                  <div className="hiw-step-left">
                    <div className={`hiw-card ${isActive ? "hiw-card-active" : ""}`} onClick={(e) => { setActiveStep(i); e.currentTarget.closest(".hiw-step-row").scrollIntoView({ behavior: "smooth", block: "center" }); }}>
                      <h3 className="hiw-card-title">{step.title}</h3>
                      <p className="hiw-card-desc">{step.desc}</p>
                    </div>
                  </div>
                  <div className="hiw-step-right">
                    <div className="hiw-visual-area">
                      <svg viewBox="0 0 400 300" className="hiw-visual-svg">
                        <rect x="0" y="0" width="400" height="300" rx="24" fill={["rgba(43,175,182,0.15)", "rgba(245,158,11,0.15)", "rgba(139,92,246,0.15)", "rgba(231,76,110,0.15)", "rgba(255,255,255,0.1)"][i]} />
                        <rect x="30" y="30" width="340" height="120" rx="16" fill={["rgba(43,175,182,0.2)", "rgba(245,158,11,0.2)", "rgba(139,92,246,0.2)", "rgba(231,76,110,0.2)", "rgba(255,255,255,0.12)"][i]} />
                        <rect x="30" y="170" width="140" height="16" rx="8" fill="rgba(255,255,255,0.15)" />
                        <rect x="30" y="200" width="220" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
                        <rect x="30" y="225" width="180" height="12" rx="6" fill="rgba(255,255,255,0.06)" />
                        <text x="340" y="260" textAnchor="end" fontSize="64" fontWeight="800" fill={["rgba(43,175,182,0.4)", "rgba(245,158,11,0.4)", "rgba(139,92,246,0.4)", "rgba(231,76,110,0.4)", "rgba(255,255,255,0.2)"][i]}>{String(i + 1).padStart(2, "0")}</text>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="section-curve-bottom">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z" fill="#eff2f6" />
          </svg>
        </div>
      </div>

      <section className="features-section">
        <div className="features-decorations">
          <svg className="features-deco features-deco-1" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="rgba(43,175,182,0.08)" strokeWidth="2" /><circle cx="100" cy="100" r="60" fill="none" stroke="rgba(43,175,182,0.06)" strokeWidth="1.5" /><circle cx="100" cy="100" r="40" fill="none" stroke="rgba(43,175,182,0.04)" strokeWidth="1" /></svg>
          <svg className="features-deco features-deco-2" viewBox="0 0 300 300"><path d="M 50 150 Q 150 50, 250 150 Q 150 250, 50 150 Z" fill="none" stroke="rgba(25,56,98,0.06)" strokeWidth="2" /><path d="M 80 150 Q 150 80, 220 150 Q 150 220, 80 150 Z" fill="none" stroke="rgba(25,56,98,0.04)" strokeWidth="1.5" /></svg>
          <svg className="features-deco features-deco-3" viewBox="0 0 200 200"><polygon points="100,20 180,180 20,180" fill="none" stroke="rgba(43,175,182,0.06)" strokeWidth="2" /><polygon points="100,50 160,160 40,160" fill="none" stroke="rgba(43,175,182,0.04)" strokeWidth="1.5" /></svg>
          <svg className="features-deco features-deco-4" viewBox="0 0 400 200"><path d="M 0 100 Q 100 20, 200 100 Q 300 180, 400 100" fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="2" /><path d="M 0 120 Q 100 40, 200 120 Q 300 200, 400 120" fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="1.5" /></svg>
          <svg className="features-deco features-deco-5" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" rx="16" fill="none" stroke="rgba(245,158,11,0.07)" strokeWidth="2" transform="rotate(45 50 50)" /></svg>
          <svg className="features-deco features-deco-6" viewBox="0 0 150 150"><circle cx="75" cy="75" r="50" fill="none" stroke="rgba(231,76,110,0.05)" strokeWidth="2" strokeDasharray="8 6" /></svg>
        </div>

        <div className="features-heading">
          <div className="features-label">Why Bulbul?</div>
          <h2 className="features-title">Everything you need to master English</h2>
        </div>

        <div className="feature-row">
          <div className="feature-visual"><div className="feature-card feature-card-1"><div className="feature-card-inner">AI</div></div></div>
          <div className="feature-info"><div className="feature-number">01</div><h3 className="feature-name">Adaptive Learning Path</h3><div className="feature-divider"></div><p className="feature-desc">Our AI analyzes your strengths and weaknesses in real-time, building a personalized curriculum that evolves as you improve.</p></div>
        </div>

        <div className="feature-row reverse">
          <div className="feature-visual"><div className="feature-card feature-card-2"><div className="feature-card-inner">🎙</div></div></div>
          <div className="feature-info"><div className="feature-number">02</div><h3 className="feature-name">Voice Recognition</h3><div className="feature-divider"></div><p className="feature-desc">Speak naturally and get instant pronunciation feedback powered by advanced speech analysis technology.</p></div>
        </div>

        <div className="feature-row">
          <div className="feature-visual"><div className="feature-card feature-card-3"><div className="feature-card-inner">🏆</div></div></div>
          <div className="feature-info"><div className="feature-number">03</div><h3 className="feature-name">Gamified Experience</h3><div className="feature-divider"></div><p className="feature-desc">Earn XP, unlock achievements, climb leaderboards, and compete with friends to stay motivated every single day.</p></div>
        </div>

        <div className="feature-row reverse">
          <div className="feature-visual"><div className="feature-card feature-card-4"><div className="feature-card-inner">🧠</div></div></div>
          <div className="feature-info"><div className="feature-number">04</div><h3 className="feature-name">Smart Repetition</h3><div className="feature-divider"></div><p className="feature-desc">Never forget what you learn. Our spaced repetition algorithm brings back weak areas at the perfect moment for review.</p></div>
        </div>
      </section>

      <div className="section-curve-cta">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 C360,0 1080,0 1440,120 L1440,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>

      <section className="section3">
        <div className="cta-decorations">
          <svg className="cta-deco cta-deco-1" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="rgba(43,175,182,0.1)" strokeWidth="2" /><circle cx="100" cy="100" r="50" fill="none" stroke="rgba(43,175,182,0.07)" strokeWidth="1.5" /></svg>
          <svg className="cta-deco cta-deco-2" viewBox="0 0 300 300"><path d="M 50 150 Q 150 30, 250 150 Q 150 270, 50 150 Z" fill="none" stroke="rgba(25,56,98,0.06)" strokeWidth="2" /></svg>
          <svg className="cta-deco cta-deco-3" viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" rx="16" fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="2" transform="rotate(30 50 50)" /></svg>
        </div>
        <div className="cta-content">
          <div className="cta-label">Start Today</div>
          <h2 className="cta-title">Ready to become<br /><span className="cta-highlight">fluent?</span></h2>
          <p className="cta-desc">Join thousands of learners who are already mastering English with Bulbul&apos;s AI-powered platform. It&apos;s free to start.</p>
          <div className="cta-buttons">
            <Link href="/signup" className="cta-primary">Get Started for Free</Link>
            <Link href="/login" className="cta-secondary">I already have an account</Link>
          </div>
          <div className="cta-stats">
            <div className="cta-stat"><span className="cta-stat-number">50K+</span><span className="cta-stat-label">Active Learners</span></div>
            <div className="cta-stat-divider"></div>
            <div className="cta-stat"><span className="cta-stat-number">4.9</span><span className="cta-stat-label">App Rating</span></div>
            <div className="cta-stat-divider"></div>
            <div className="cta-stat"><span className="cta-stat-number">10M+</span><span className="cta-stat-label">Lessons Completed</span></div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <img src="/images/logo.svg" alt="Bulbul Logo" className="footer-logo-img" />
          </div>
          <div className="footer-divider-line"></div>
          <div className="footer-credits">
            <span className="footer-credits-label">This project was realized by</span>
            <div className="footer-names">
              {teamMembers.map((name, i) => (
                <span key={i} className="footer-name">
                  {name}
                  {i < teamMembers.length - 1 && <span className="footer-name-separator">•</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-text">© 2025 Bulbul. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
