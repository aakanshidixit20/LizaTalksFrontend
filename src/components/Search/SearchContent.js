"use client";

import React from "react";
import { Card, Typography, Box } from "@mui/material";

const SearchContent = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          p: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          <span className="text-black">120</span> results found for{" "}
          <span className="text-black">“Ipsum”</span>
        </Typography>

        <Box
          className="border"
          sx={{
            padding: "20px",
            marginTop: "15px",
            borderRadius: "7px",

            "& h5": {
              fontSize: "17px",
              fontWeight: "600",
              marginBottom: "13px",
            },
            "& p": {
              lineHeight: "1.8",
              marginTop: "13px !important",
            },
          }}
        >
          <Typography variant="h5" className="text-black">
            What is Lorem Ipsum?
          </Typography>

          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>

        <Box
          className="border"
          sx={{
            padding: "20px",
            marginTop: "15px",
            borderRadius: "7px",

            "& h5": {
              fontSize: "17px",
              fontWeight: "600",
              marginBottom: "13px",
            },
            "& p": {
              lineHeight: "1.8",
              marginTop: "13px !important",
            },
          }}
        >
          <Typography variant="h5" className="text-black">
            Why do we use it Lorem Ipsum?
          </Typography>

          <Typography>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Typography>
        </Box>

        <Box
          className="border"
          sx={{
            padding: "20px",
            marginTop: "15px",
            borderRadius: "7px",

            "& h5": {
              fontSize: "17px",
              fontWeight: "600",
              marginBottom: "13px",
            },
            "& p": {
              lineHeight: "1.8",
              marginTop: "13px !important",
            },
          }}
        >
          <Typography variant="h5" className="text-black">
            Where does it come from Lorem Ipsum?
          </Typography>

          <Typography>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source.
          </Typography>

          <Typography>
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
            Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
            written in 45 BC. This book is a treatise on the theory of ethics,
            very popular during the Renaissance. The first line of Lorem Ipsum,
            "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32.
          </Typography>
        </Box>

        <Box
          className="border"
          sx={{
            padding: "20px",
            marginTop: "15px",
            borderRadius: "7px",

            "& h5": {
              fontSize: "17px",
              fontWeight: "600",
              marginBottom: "13px",
            },
            "& p": {
              lineHeight: "1.8",
              marginTop: "13px !important",
            },
          }}
        >
          <Typography variant="h5" className="text-black">
            Where can I get some Lorem Ipsum?
          </Typography>

          <Typography>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.
          </Typography>

          <Typography>
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
            therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default SearchContent;
