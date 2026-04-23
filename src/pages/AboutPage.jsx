import React from "react";
import { Badge, Button, Image, Text } from "@mantine/core";

const teamMembers = [
  {
    name: "Anna",
    href: "https://github.com/jaya-anna",
    image: "../../images/bubbles.png",
    alt: "Anna avatar",
    width: 80,
  },
  {
    name: "Leila",
    href: "https://github.com/Leiladany",
    image: "../../images/blossom.webp",
    alt: "Leila avatar",
    width: 70,
  },
  {
    name: "Diana",
    href: "https://github.com/dianaligiapena",
    image: "../../images/buttercup.png",
    alt: "Diana avatar",
    width: 65,
  },
];

function AboutPage() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="about-page">
      <div className="about-header">
        <h1 className="page-title">about</h1>
      </div>

      <section className="about-intro">
        <div className="about-mission">
          <Badge className="about-badge" size="xl" color="pink">
            mission
          </Badge>

          <Text className="about-mission-text">
            create an information exchange platform for teens and emerging adults
            on sexuality and relationship topics so that they will feel empowered
            (more confident and stronger)
          </Text>
        </div>

        <img
          className="about-gif"
          src="../../images/powerpuff.gif"
          alt="powerpuff girls"
        />
      </section>

      <section className="about-section">
        <Badge size="xl" color="pink">
          team
        </Badge>

        <div className="about-team-grid">
          {teamMembers.map((member) => (
            <a
              key={member.name}
              className="about-team-card"
              href={member.href}
              target="_blank"
              rel="noreferrer"
            >
              <Text className="about-team-name">{member.name}</Text>
              <Image
                className="about-team-avatar"
                src={member.image}
                alt={member.alt}
                width={member.width}
              />
            </a>
          ))}
        </div>
      </section>

      <section className="about-section">
        <Badge size="xl" color="pink">
          instagram
        </Badge>

        <Button
          variant="transparent"
          size="xl"
          component="a"
          href="https://www.instagram.com/empoweredemp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="../../images/instagram.png" alt="instagram logo" width={50} />
        </Button>
      </section>

      <section className="about-section">
        <Badge size="xl" color="pink">
          visit us
        </Badge>

        <iframe
          className="about-map"
          src="https://www.google.com/maps/d/embed?mid=1V9vrpxRAdI-G66_1-QRtHEgAo0k&ehbc=2E312F"
          title="Empowered Emp location"
        />
      </section>

      <Button
        className="scroll-top-button"
        onClick={scrollToTop}
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
      >
        scroll to top
      </Button>
    </div>
  );
}

export default AboutPage;
