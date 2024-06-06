import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function VendorCard({ data }) {
  const navigate = useNavigate();
  const handleRedirect = (id, uid) => {
    navigate(`/${id}/${uid}`);
  };
  return (
    <Grid container spacing={2}>
      {data.length === 0 ? (
        <Typography variant="h6" sx={{ padding: "15px" }}>
          No Vendors Found
        </Typography>
      ) : (
        data?.map((item, index) => {
          return (
            <Grid key={index} item md={4}>
              <Card
                key={index}
                sx={{ margin: "6px", maxWidth: "90%", maxHeight: "100%" }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  sx={{ cursor: "pointer" }}
                  src={
                    item?.coverImage
                      ? `http://localhost:5000/uploads/${item?.coverImage}`
                      : require("../assests/noimg.jpeg")
                  }
                  alt="Image Alt Text"
                  onClick={() => handleRedirect(item._id, item?.userId?._id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {item.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item?.userId?.firstname} {item?.userId?.lastname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.userId?.vendor}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}

export default VendorCard;
