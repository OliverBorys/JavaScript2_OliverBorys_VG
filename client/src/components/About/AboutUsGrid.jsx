import { useState, useEffect } from "react";
import AboutSection from "./AboutSection";

const AboutUsGrid = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const aboutSections = [
    {
      title: "Luxury with Responsibility:",
      text: "True craftsmanship stands the test of time. We embrace ethical production and responsibly sourced materials, ensuring every piece reflects quality and care. Sustainability isn’t a trend—it’s our commitment to protecting the future while celebrating the artistry of the past.",
      image: "https://a.storyblok.com/f/273642/1200x1200/e49272671b/morjas-was-born1-1200x1200.webp/m/1280x0/filters:quality(80)",
      reverse: true,
    },
    {
      title: "Where We Come From:",
      text: "Born in Italy, I grew up surrounded by craftsmanship, where fashion is legacy. Later in Sweden, I embraced minimalism and a deep connection to nature. This brand unites both worlds—Italian passion and Swedish innovation, creating luxury that is both responsible and refined.",
      image: "https://amoureux-du-monde.com/wp-content/uploads/2023/08/Couv-Milan-1r-scaled.jpg",
      reverse: false,
    },
    {
      title: "A Heritage of Contrast:",
      text: "My grandfather believed beauty lay in simplicity, shaped by the wilderness. My nonna grew up in Milan, where fashion was expression. Their worlds collided, creating a balance of quiet nature and vibrant artistry—the same harmony that defines our brand today.",
      image: "https://a.storyblok.com/f/286233/550x365/4286ab26bd/page-3.jpg",
      reverse: true,
    },
  ];

  return (
    <section>
      <div className="h-[70vh] contain-content">
        <img
          src={
            isMobile
              ? "https://i.pinimg.com/736x/f3/0f/4e/f30f4ed97dc2b51e98547595b6e96957.jpg"
              : "https://a.storyblok.com/f/273642/1920x595/626d5e48b9/hero-1-1920x595.webp"
          }
          alt="Responsive"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="m-8">
        <h2 className="text-3xl font-medium text-center mb-4">About us</h2>
        <p className="sm:text-center">
          A Story of Craftsmanship and Consciousness where we craft timeless pieces
          that merge precision with elegance. Each silhouette, fabric, and
          detail honors generations of artisans. Our philosophy is simple:
          luxury isn’t excess—it’s purpose, refinement, and lasting beauty,
          created with sustainability at its core.
        </p>
      </div>

      <div className="flex flex-col m-8">
        {aboutSections.map((section, index) => (
          <AboutSection key={index} {...section} />
        ))}
      </div>

      <div className="mt-6">
        <img src="https://a.storyblok.com/f/286233/1920x1050/e15f45e4d6/a-story-of-contrasts1.jpg" alt="Brand Heritage" />
      </div>
    </section>
  );
};

export default AboutUsGrid;
