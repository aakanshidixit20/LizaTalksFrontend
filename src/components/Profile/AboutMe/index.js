"use client";

import * as React from "react";
import { Card, Typography, Box } from "@mui/material";
import styles from "./AboutMe.module.css";

const AboutMe = () => {
  return (
    <>
      {/* Post #1 */}
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
            pb: "15px",
          }}
          className="text-black border-bottom"
        >
          About Me
        </Typography>

        <Box className={styles.aboutMeContent}>
          <Typography variant="h6">Introduction</Typography>
          <Typography>
            Alice Johnson, a visionary UX/UI designer, blends creativity with
            user-centric design principles to craft seamless digital
            experiences. With a passion for innovation and a knack for
            understanding user needs, [Your Name] has become a driving force in
            the ever-evolving landscape of digital design. This 5000-word
            biography aims to delve into Alice's journey, from humble beginnings
            to becoming a recognized name in the realm of user experience and
            interface design.
          </Typography>

          <Typography variant="h6">Professional Beginnings</Typography>
          <Typography>
            Upon graduating, Alice embarked on their professional journey, eager
            to make an impact in the world of design. They initially gained
            experience working at VivoTech, where they collaborated with
            cross-functional teams to deliver user-centric solutions for various
            clients. This early exposure provided invaluable insights into the
            complexities of design processes and solidified Alice's commitment
            to enhancing user experiences.
          </Typography>

          <Typography variant="h6">Expertise in UX/UI Design</Typography>
          <Typography>
            Driven by a desire for continuous growth, Alice delved deeper into
            the nuances of UX/UI design, staying abreast of emerging trends,
            technologies, and methodologies. They immersed themselves in user
            research, wireframing, prototyping, and usability testing, refining
            their craft with each project undertaken.
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default AboutMe;
