import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container, Grid, Typography } from "@mui/material";
import TestimonialCard from "../../Components/TestimonialCard";
import { testimonialData } from "./TestimonialUtils";
import { useIsMobile } from "../../contexts/isMobile";

const CustomPrevArrow = (props) => {
  return (
    <ArrowBackIosNewIcon
      className="slick-prev"
      sx={{
        zIndex: 1,
        marginLeft: "1.5rem",
        color: "white",
        padding: "5px",
        height: "32px",
        width: "32px",
        background: "#4c545c",
        borderRadius: "100%",
        "&:hover": {
          cursor: "pointer", // Change cursor on hover
          background: "black", // Change color on hover
          color: "white",
        },
      }}
      onClick={props.onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  return (
    <ArrowForwardIosIcon
      className="slick-next"
      sx={{
        marginRight: " 1.5rem",
        color: "white",
        padding: "5px",
        height: "32px",
        width: "32px",
        background: "#4c545c",
        borderRadius: "100%",
        "&:hover": {
          cursor: "pointer", // Change cursor on hover
          background: "black", // Change color on hover
          color: "white",
        },
      }}
      onClick={props.onClick}
    />
  );
};

export default function TestimonialsSlider() {
  const isMobile = useIsMobile();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ m: !isMobile && "4rem" }}>
      <Typography
        textAlign="center"
        variant="h4"
        fontWeight="bold"
        marginTop={8}
      >
        The Voice of Our Clients
      </Typography>
      <Slider {...settings}>
        {testimonialData.map((item, index) => (
          <Grid item md={4}>
            <TestimonialCard name={item.name} desc={item.desc} img={item.img} />
          </Grid>
        ))}
      </Slider>
    </Container>
  );
}
