import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import service from "../../../assests/download.jpg";
import { useIsMobile } from "../../../contexts/isMobile";
import { useNavigate } from "react-router-dom";
import { SolidButton } from "../../../Components/SolidButton";

export default function ServicesTabs({ data, refetchAgain, showPackage }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const fieldName = showPackage === "Packages" ? "Package" : "Service";
  const handleView = (id) => {
    refetchAgain();
    navigate(`/home/${id}`);
  };

  return (
    <Grid md={12} xs={12}>
      {data.length !== 0 ? (
        data?.map((item, index) => {
          return (
            <Card
              elevation={2}
              sx={{
                marginTop: 6,
                display: "flex",
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              <Grid
                key={index}
                container
                spacing={2}
                justifyContent={isMobile && "center"}
                m={2}
              >
                <Grid
                  md={2}
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={
                      item?.coverImage
                        ? `http://localhost:5000/uploads/${item?.coverImage}`
                        : require("../../../assests/noimg.jpeg")
                    }
                    alt="Logo"
                    style={{
                      width: isMobile ? 200 : 160,
                    }}
                  />
                </Grid>
                <Grid item md={2} xs={12} mt={2} mb={!isMobile && 5}>
                  <Typography variant="body1">
                    {`${fieldName}`} Name{" "}
                  </Typography>
                  <Typography variant="body2" mb={4}>
                    {item.name}{" "}
                  </Typography>
                  <SolidButton
                    onClick={() => handleView(item._id)}
                    label="View"
                  />
                </Grid>
                <Grid item md={2} xs={12} mt={2}>
                  <Typography variant="body1">
                    {`${fieldName}`} Type{" "}
                  </Typography>
                  <Typography variant="body2">{item.userId.vendor} </Typography>
                </Grid>
                <Grid item md={2} xs={12} mt={2}>
                  <Typography variant="body1">
                    {`${fieldName}`} Price{" "}
                  </Typography>
                  <Typography variant="body2">{item.price} </Typography>
                </Grid>
                <Grid item md={1} xs={12} mt={2}>
                  <Typography variant="body1">City </Typography>
                  <Typography variant="body2">{item.city} </Typography>
                </Grid>
                <Grid item md={1} xs={12} mt={2}>
                  <Typography variant="body1">Town </Typography>
                  <Typography variant="body2">{item?.town || "N/A"} </Typography>
                </Grid>
                <Grid item md={1} xs={12} mt={2}>
                  <Typography variant="body1">Status </Typography>
                  <Typography variant="body2">{item?.status} </Typography>
                </Grid>
              </Grid>
            </Card>
          );
        })
      ) : (
        <p>No Data Availabe</p>
      )}
    </Grid>
  );
}
