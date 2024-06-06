import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export default function TestimonialCard({ name, desc, img }) {
  return (
    <>
      <Card
        elevation={4}
        sx={{
          position: "relative",
          margin: "2rem",
          maxWidth: "100%",
          height: "360px",
        }}
      >
        <img
          height="130"
          width="130"
          src={require(`../assests/${img}`)}
          alt="Image Alt Text"
          style={{
            margin: "1rem",
            position: "absolute",
            left: "30%",
            borderRadius: "4rem",
          }}
        />
        <CardContent
          style={{ margin: "2rem", marginTop: "8rem", textAlign: "center" }}
        >
          <Typography variant="h5" color="#363636" mt={2}>
            {name}
          </Typography>
          <Typography variant="body2" color="#666666">
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
