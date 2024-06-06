import { Box, Card, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { useIsMobile } from "../../contexts/isMobile";

export default function ReviewCard({data}) {
  const isMobile = useIsMobile();
  return (
    <Box width={"100%"}>
      <Card
        elevation={2}
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          margin: 2,
        }}
      >
        <div style={{ margin: "20px" }}>
          <Typography variant="body1">Ratings</Typography>
          <Rating name="review" value={data?.client?.rating} readOnly="true" precision={1} />
          <Typography variant="body1"> Comments</Typography>
          <Typography variant="body2">{data?.client?.comment}</Typography>
        </div>
      </Card>
    </Box>
  );
}
