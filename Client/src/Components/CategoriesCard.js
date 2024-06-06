import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { categoryData } from "../Pages/Home/categoryData";

function CategoriesCard() {
  const navigate = useNavigate();
  const handleRedirect = (name) => {
    navigate(`/${name}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {categoryData.map((item, index) => {
        return (
          <Grid key={index} item md={4} textAlign="center">
            <Card
              key={index}
              sx={{ margin: "6px", maxWidth: "90%", maxHeight: "100%" }}
            >
              <CardMedia
                component="img"
                height="250"
                sx={{ cursor: "pointer" }}
                src={require(`../assests/${item.img}`)}
                alt="Image Alt Text"
                onClick={(e) => handleRedirect(item.categoryname)}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {item.categoryname === "Car-Rental" ||
                  item.categoryname === "Event-Planner"
                    ? item.categoryname.replace("-", " ")
                    : item.categoryname}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CategoriesCard;
