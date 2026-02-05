import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);

// Helper function to parse highlight, emphasis, gradient, and glow tags
const parseHighlights = (text: string) => {
  const parts = text.split(/(<(?:highlight|emphasis|gradient|glow)>.*?<\/(?:highlight|emphasis|gradient|glow)>)/g);
  return parts.map((part, index) => {
    if (part.startsWith('<highlight>')) {
      const content = part.replace(/<\/?highlight>/g, '');
      return <span key={index} className="highlight">{content}</span>;
    }
    if (part.startsWith('<emphasis>')) {
      const content = part.replace(/<\/?emphasis>/g, '');
      return <span key={index} className="emphasis">{content}</span>;
    }
    if (part.startsWith('<gradient>')) {
      const content = part.replace(/<\/?gradient>/g, '');
      return <span key={index} className="gradient-text">{content}</span>;
    }
    if (part.startsWith('<glow>')) {
      const content = part.replace(/<\/?glow>/g, '');
      return <span key={index} className="glow-text">{content}</span>;
    }
    return part;
  });
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.innerWidth < 900) return;

    const para = paraRef.current;
    if (!para) return;

    // Initial state - hidden
    gsap.set(para, { autoAlpha: 0, y: 50 });

    // Animate on scroll
    gsap.to(para, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: para.parentElement,
        start: "20% 60%",
        toggleActions: "play pause resume reverse",
      },
    });

    // Subtitle floating animation for blobs
    gsap.to(".about-blob", {
      y: "random(-30, 30)",
      x: "random(-30, 30)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });
  }, []);

  return (
    <div className="about-section" id="about" ref={containerRef}>
      <div className="about-background">
        <div className="about-blob blob-1"></div>
        <div className="about-blob blob-2"></div>
      </div>
      <div className="about-me">
        <h3 className="title">{config.about.title}</h3>
        <p ref={paraRef} className="about-para">
          {parseHighlights(config.about.description)}
        </p>
      </div>
    </div>
  );
};

export default About;
