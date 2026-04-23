import { Button, Image } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import {
  IconGenderAndrogyne,
  IconGenderBigender,
  IconGenderDemiboy,
  IconGenderDemigirl,
  IconGenderFemale,
  IconGenderGenderfluid,
  IconGenderGenderless,
  IconGenderGenderqueer,
  IconGenderHermaphrodite,
  IconGenderIntergender,
  IconGenderMale,
  IconGenderNeutrois,
  IconGenderTransgender,
  IconGenderTrasvesti,
  IconMessages,
  IconRocket,
  IconSchool,
} from "@tabler/icons-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="home-section-1">
        <div className="homepage-header">
          <div>
            <h1>Let's talk about Sexuality & Relationships</h1>

            <div className="button-homepage">
              <Button
                type="button"
                onClick={() => navigate("/login")}
                className="button-home-margin"
                variant="outline"
                color="indigo"
              >
                JOIN THE COMMUNITY
              </Button>

              <Button
                type="button"
                onClick={() => navigate("/info")}
                className="button-home-margin"
                variant="outline"
                color="indigo"
              >
                READ AND INFORM YOURSELF
              </Button>

              <Button
                type="button"
                onClick={() => navigate("/resources")}
                className="button-home-margin"
                variant="outline"
                color="indigo"
              >
                RESOURCE RECOMMENDATIONS
              </Button>
            </div>
          </div>

          <Image
            className="image-group-home"
            src="../../images/home-group.png"
            alt="group illustration"
          />
        </div>
      </section>

      <section className="home-section-2">
        <div className="background-section-2">
          <div>
            <h1>
              <span>
                <IconGenderIntergender /> <IconGenderAndrogyne /> <IconGenderBigender />{" "}
                <IconGenderFemale /> <IconGenderTransgender /> <IconGenderDemiboy />{" "}
                <IconGenderDemigirl /> <IconGenderGenderfluid />{" "}
                <IconGenderGenderqueer /> <IconGenderGenderless />{" "}
                <IconGenderHermaphrodite /> <IconGenderNeutrois /> <IconGenderMale />{" "}
                <IconGenderTrasvesti />
              </span>
              <p className="text-community">
                an online community and information platform for your unique journey
              </p>
              <Link to="/about">
                <Button variant="filled" className="button-about">
                  About us
                </Button>
              </Link>
            </h1>
          </div>
        </div>
      </section>

      <section className="home-section-3">
        <div className="container-section-3">
          <div className="box-3">
            <h2>interactive</h2>
            <IconMessages />
            <p>
              "interactive" refers to features that allow you to actively engage with
              our content and participate in learning activities like our fantastic
              quiz. You can join our community for exchange - post, comment, ask
              questions and share your experiences. These features can help you to
              enhance your learning experience. So get started and signup!
            </p>
          </div>
          <div className="box-3">
            <h2>educational</h2>
            <IconSchool />
            <p>
              Our mission is to provide accessible and accurate information on sex
              education and health. We believe that everyone deserves access to
              accurate and up-to-date information about their bodies and their sexual
              health, and we strive to provide that through our web application. We
              want to support you in your personal development: knowing your rights
              and living a self-determined sexuality. Being the one you want to be!
            </p>
          </div>
          <div className="box-3">
            <h2>empowering</h2>
            <IconRocket />
            <p>
              We want you to feel empowered about yourself, your rights, your
              sexuality and gender indentity therefore we provide comprehensive and
              accurate information about anatomy, body knowledge, gender diversity,
              sexual orientation, LGBTIQ*, sexual rights, relationships, sexual
              health and a lot of more. We hope we can support you during your unique
              journey!
            </p>
          </div>
        </div>
      </section>
      <section>
        <Image
          className="image-reading-home"
          src="../../images/home-reading.jpg"
          alt="reading people"
        />
      </section>
    </>
  );
};

export default HomePage;
