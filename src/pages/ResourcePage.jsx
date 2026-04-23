import React from "react";
import { Badge, Button, Card, Image, Text } from "@mantine/core";

const resourceSections = [
  {
    title: "books",
    items: [
      {
        href: "https://www.amazon.com/Its-Perfectly-Normal-Changing-Growing/dp/0763668729",
        image: "https://m.media-amazon.com/images/I/A1pp7rvuN4L.jpg",
        alt: "It's Perfectly Normal book cover",
        title: "It's Perfectly Normal",
        subtitle: "by Robie H. Harris and Michael Emberley",
        badge: "Puberty, sex, and relationships",
      },
      {
        href: "https://www.amazon.com/Sexual-Intelligence-Marty-Klein/dp/0062026062",
        image: "https://m.media-amazon.com/images/P/0062026062.01._SCLZZZZZZZ_SX500_.jpg",
        alt: "Sexual Intelligence book cover",
        title: "Sexual Intelligence",
        subtitle: "by Marty Klein",
        badge: "Healthy and fulfilling sex life",
      },
      {
        href: "https://www.amazon.com/Guide-Getting-Paul-Joannides/dp/1885535457",
        image: "https://m.media-amazon.com/images/I/512bCyJrRmL._SX387_BO1,204,203,200_.jpg",
        alt: "The Guide to Getting it On book cover",
        title: "The Guide to Getting it On",
        subtitle: "by Paul Joannides",
        badge: "An inclusive and humorous guide to all aspects of sex",
      },
    ],
  },
  {
    title: "apple podcasts",
    items: [
      {
        href: "https://podcasts.apple.com/us/podcast/sex-with-emily/id467599648",
        image: "https://i.podnews.network/r/t/396/11221-2b1ef06c.webp",
        alt: "Sex with Emily podcast cover",
        title: '"Sex with Emily"',
        subtitle: "by Emily Morse",
        badge: "Explores sex, relationships, and intimacy",
      },
      {
        href: "https://podcasts.apple.com/us/podcast/savage-lovecast/id135784124",
        image: "https://m.media-amazon.com/images/I/51N-kQCITjL._SL500_.jpg",
        alt: "Savage Lovecast podcast cover",
        title: '"Savage Lovecast"',
        subtitle: "by Dan Savage",
        badge: "Offers advice and insights on sex and relationships",
      },
      {
        href: "https://podcasts.apple.com/us/podcast/whoreible-decisions/id1291914299",
        image: "https://podsauce.com/wp-content/uploads/2022/03/WhoreibleDecisions-Logo-FINAL3000x3000-V2.png",
        alt: "Whoreible Decisions podcast cover",
        title: '"Whoreible Decisions"',
        subtitle: "by Mandii B and WeezyWTF",
        badge: "Discusses sex and dating from a frank and humorous perspective",
      },
    ],
  },
  {
    title: "websites",
    items: [
      {
        href: "https://www.plannedparenthood.org/",
        image: "https://www.plannedparenthood.org/static/assets/img/logos/planned-parenthood-logo-484x60.png",
        alt: "Planned Parenthood logo",
        title: "Planned Parenthood",
        subtitle:
          "A national organization that provides reproductive health services and sex education resources to individuals of all ages and genders",
        badge: "Reproductive health and sex education",
      },
      {
        href: "https://www.scarleteen.com/",
        image: "http://www.scarleteen.com/sites/all/themes/scarleteen/images/logo.png",
        alt: "Scarleteen logo",
        title: "Scarleteen",
        subtitle:
          "A website that offers comprehensive sex education and advice to young people, including LGBTQ+ individuals and survivors of sexual assault",
        badge: "Comprehensive sex education and advice",
      },
      {
        href: "https://goaskalice.columbia.edu/",
        image: "https://hips.hearstapps.com/hmg-prod/images/index-13-1654538886.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*",
        alt: "Go Ask Alice logo",
        title: "Go Ask Alice!",
        subtitle:
          "A health Q&A website run by Columbia University that covers a wide range of topics, including sexual health and relationships",
        badge: "Health Q&A run by Columbia University",
      },
      {
        href: "https://www.theguardian.com/education/sexeducation",
        image: "https://yt3.googleusercontent.com/ytc/AL5GRJWlS0Y_Lg53IzsRrZ6fpd_JbwKr66I1cF-dYHx8Y9k=s900-c-k-c0x00ffffff-no-rj",
        alt: "Guardian logo",
        title: "Relationships and sex Education",
        subtitle: "by The Guardian",
        badge: "Articles on different aspects of sex education and relationships",
      },
    ],
  },
  {
    title: "videos",
    items: [
      {
        href: "https://www.youtube.com/c/AdvocatesforYouth",
        image: "https://yt3.googleusercontent.com/ytc/AL5GRJUNzsOnYSfXeKgE7ZttEopUaXmz-MAwnEzm8--9HA=s176-c-k-c0x00ffffff-no-rj",
        alt: "Advocates for Youth logo",
        title: "Amaze.org",
        subtitle: "by Advocates for Youth",
        badge: "Engaging and accessible sex education videos",
      },
      {
        href: "https://www.youtube.com/user/sexplanations",
        image: "https://i.ytimg.com/vi/7FA9aqw1wag/maxresdefault.jpg",
        alt: "Sexplanations channel preview",
        title: "Sexplanations",
        subtitle: "by Dr. Lindsey Doe",
        badge: "Wide range of sex education topics",
      },
      {
        href: "https://www.ted.com/talks/al_vernacchio_sex_needs_a_new_metaphor_here_s_one",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsUMmmnfqZH1Kzh0HtynlP0vQ1ET23jnyoLFbpTIFQ-xRtRQSJ21DR0568CXmqa-5SVqc&usqp=CAU",
        alt: "Let's Talk About Sex TEDx Talk preview",
        title: "Let's Talk About Sex",
        subtitle: "by Al Vernacchio",
        badge: "Comprehensive sex education",
      },
    ],
  },
  {
    title: "tools",
    items: [
      {
        href: "https://www.bedsider.org/",
        image: "https://www.bedsider.org/assets/twentyone/action_promo_explorer_small-d788ee8243acf9c93c0e5c49313cb2ff6217219620acc6ce898193dd23211ac5.webp",
        alt: "Bedsider preview",
        title: "Bedsider",
        subtitle:
          "A website that provides information on birth control options and helps users find a method that works for them",
        badge: "Birth control information and support",
      },
      {
        href: "https://www.condomfinder.org/",
        image: "https://condomfinder.org/wp-content/uploads/2021/02/condoms.png",
        alt: "Condom Finder preview",
        title: "Condom Finder",
        subtitle: "An app that helps users find free condoms near their location",
        badge: "Free condom locator",
      },
      {
        href: "https://helloclue.com/",
        image: "https://images.ctfassets.net/juauvlea4rbf/3ESGywBoB2CS66QGeaysY8/6f62f759f40f5aefb5d5f940f8604f6e/Contenful.svg",
        alt: "Clue preview",
        title: "Clue",
        subtitle:
          "A period and fertility tracking app that helps users understand their menstrual cycle and reproductive health",
        badge: "Period and fertility tracker",
      },
    ],
  },
  {
    title: "quizzes",
    items: [
      {
        href: "https://www.ashasexualhealth.org/hpv-and-men-take-the-quiz/",
        image: "https://cdn.riddle.com/embeds/v2/images/q_80,c_fill,w_960,h_540/fa8/fa8ffcb228c3503a4bbcb5d8e40078fb.png",
        alt: "ASHA Sexual Health Quiz",
        title: "What do you know about HPV and men?",
        badge: "Test your knowledge of how HPV infection affects men",
      },
      {
        href: "https://www.plannedparenthood.org/online-tools/am-i-pregnant",
        image: "https://cdn.plannedparenthood.org/uploads/filer_public_thumbnails/filer_public/28/b9/28b9e83b-4ab5-4cae-8cbf-9e39e1bc1a92/08_pp_website_quiz-5-660x400.jpg__1200x900_q75_subsampling-2.jpg",
        alt: "Planned Parenthood quiz",
        title: "Am I Pregnant?",
        badge: "Test your knowledge of pregnancy and taking a pregnancy test",
      },
      {
        href: "https://www.cdc.gov/std/saw/pbyt/quiz.htm#question-1",
        image: "https://www.cdc.gov/std/saw/pbyt/images/PBYT_container_Campaign_Materials.png?_=00189",
        alt: "CDC STI quiz",
        title: "Are you at risk for an STI?",
        badge: "Check the risk for a sexually transmitted infection",
      },
      {
        href: "https://www.healthshots.com/quiz/how-much-do-you-know-about-sex-find-out-here/",
        image: "https://images.healthshots.com/healthshots/en/uploads/2021/12/18161853/sex-education-770x433.jpg",
        alt: "Sex education quiz",
        title: "Do you know everything about sex?",
        badge: "Yes / No quiz - basic sex education",
      },
    ],
  },
];

function ResourcePage() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="resource-section">
        <Image
          src="../../images/home-reading.jpg"
          alt="reading people"
          className="image-resource"
        />
      </section>

      <div className="resource-page">
        <Text className="page-lead resource-intro">
          Welcome to our <b>resources</b> page, where you can find a wide range of
          materials to help you learn more about sex education and health.
        </Text>

        {resourceSections.map((section) => (
          <Card key={section.title} className="resource-list-section" shadow="xl">
            <Text className="resource-section-title" weight={500}>
              {section.title}
            </Text>

            <ul className="resource-list">
              {section.items.map((item) => (
                <li key={item.href} className="resource-item">
                  <a
                    className="resource-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      className="resource-thumbnail"
                      src={item.image}
                      alt={item.alt}
                      width={88}
                    />

                    <div className="resource-copy">
                      <Text weight={500}>{item.title}</Text>
                      {item.subtitle ? (
                        <Text size="sm" mt={5}>
                          {item.subtitle}
                        </Text>
                      ) : null}
                      <Badge mt={20} color="indigo">
                        {item.badge}
                      </Badge>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <Text className="resource-outro">
          We hope that these resources are helpful to you, and we encourage you to
          explore them further. If you have any suggestions for resources that we
          should include on this page, please don't hesitate to contact us.
        </Text>

        <Button
          className="scroll-top-button"
          onClick={scrollToTop}
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
        >
          scroll to top
        </Button>
      </div>
    </>
  );
}

export default ResourcePage;
