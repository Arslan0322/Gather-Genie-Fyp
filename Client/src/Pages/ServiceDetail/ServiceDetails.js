import { Card, Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ImageGrid from "../../Components/ImageGrid";
import { VendorDetail } from "./VendorDetail";
import { useIsMobile } from "../../contexts/isMobile";
import { useNavigate } from "react-router-dom";
import { SolidButton } from "../../Components/SolidButton";
import { useSelector } from "react-redux";
import AvailabilityDrawer from "../../Components/AvailabilityDrawer";
import { useGetAddonByServicesIDQuery } from "../../store/addOnSlice";

function ServiceDetails({ id, userId, data, allServices, allReview }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const _id = useSelector((state) => state?.user?.userInfo?.data?._id);
  const [isOpen, setIsOpen] = useState(false);
  const handleBackClick = () => {
    navigate(-1);
  };
  const { data: addOnData } = useGetAddonByServicesIDQuery(id);
  const isPackage =
    data?.userId?.vendor === "Photographer" || data?.userId?.vendor === "Decor";
  const handleCart = () => {
    if (_id) {
      setIsOpen(!isOpen);
    } else {
      navigate("/login");
    }
  };

  // Make a state which have initially object and have all values which we have to show below
  // use useEffect in which you will filter the cardData with the id available in params and update the initial object;

  return (
    <>
      <Container sx={{ margin: isMobile ? 0 : 6 }}>
        <Grid container spacing={3} alignItems="center" p={2}>
          <Grid
            container
            spacing={2}
            justifyContent="right"
            mt={isMobile ? 3 : 0}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <IconButton onClick={handleBackClick}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  {isPackage ? "Package" : "Service"} Details
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <SolidButton
                label="Add To Cart"
                onClick={handleCart}
                btnwidth="100%"
              />
            </Grid>
          </Grid>
        </Grid>
        {id ? (
          <>
            {" "}
            <Card
              elevation={6}
              sx={{ maxWidth: "100%", maxHeight: "100%", marginTop: 4 }}
            >
              <Grid container spacing={2}>
                <Grid item md={7}>
                  <img
                    src={
                      data?.coverImage
                        ? `http://localhost:5000/uploads/${data?.coverImage}`
                        : require("../../assests/noimg.jpeg")
                    }
                    alt="Logo"
                    style={{
                      width: isMobile ? 340 : 700,
                      borderRadius: "8px",
                      marginBottom: "-0.5rem",
                    }}
                  />
                </Grid>
                <Grid item md={4} mx={"2.5rem"} my={"1rem"}>
                  <Typography variant="h6">Title</Typography>
                  <Typography variant="body1">{data.name}</Typography>
                  <Typography variant="h6" mt={1}>
                    City
                  </Typography>
                  <Typography variant="body1">{data.location},{data.city}</Typography>
                  <Typography variant="h6" mt={1}>
                    Town
                  </Typography>
                  <Typography variant="body1">{data?.town || 'N/A'}</Typography>
                  <Typography variant="h6" mt={1}>
                    Price
                  </Typography>
                  <Typography variant="body1">
                    {data.price}{" "}
                    {data?.userId?.vendor === "Venue" ||
                    data?.userId?.vendor === "Caterer"
                      ? " per person"
                      : data?.userId?.vendor === "Car Rental"
                      ? " per hour"
                      : ""}
                  </Typography>

                  {data?.userId?.vendor === "Decor" && <>
                    <Typography variant="h6" mt={1}>
                      Decor Types
                    </Typography>
                    <Typography variant="body1">
                      {data.decorType?.join(",")}
                    </Typography>
                  </>}
                  
                  {data?.userId?.vendor === "Venue" && (
                    <>
                      <Typography variant="h6" mt={1}>
                        Venue Type
                      </Typography>
                      <Typography variant="body1">{data.venueType}</Typography>
                      <Typography variant="h6" mt={1}>
                        Amenities
                      </Typography>
                      <Typography variant="body1">{data.amenities}</Typography>
                      <Typography variant="h6" mt={1}>
                        Maximum No.of Persons
                      </Typography>
                      <Typography variant="body1">{data.capacity}</Typography>
                    </>
                  )}
                  {data?.userId?.vendor === "Photographer" && (
                    <>
                      <Typography variant="h6" mt={1}>
                        No. of Team Members
                      </Typography>
                      <Typography variant="body1">
                        {data.teamMembers}
                      </Typography>
                      <Typography variant="h6" mt={1}>
                        Equipments
                      </Typography>
                      <Typography variant="body1">{data.equipment}</Typography>
                    </>
                  )}
                  {data?.userId?.vendor === "Car Rental" && (
                    <>
                      <Typography variant="h6" mt={1}>
                        Car Model
                      </Typography>
                      <Typography variant="body1">{data.carModel}</Typography>
                    </>
                  )}
                  {data?.userId?.vendor === "Caterer" && (
                    <>
                      <Typography variant="h6" mt={1}>
                        Cuisine Type
                      </Typography>
                      <div style={{height:"170px",overflowY:"scroll"}}>
                      {
                        data.cuisine.map((Menu) => {
                          return (
                            <>
                              <Typography variant="body1">{Menu}</Typography>
                              {Menu === "Italian" && (
                                <>
                                  <ul>
                                    <li>Pizza</li>
                                    <li>Spaghetti Carbonara</li>
                                    <li>Risotto</li>
                                    <li>Lasagna</li>
                                    <li>Tiramisu</li>
                                  </ul>
                                </>
                              )}
                              {Menu === "Continental" && (
                                <>
                                  <ul>
                                    <li>Chicken Alfredo</li>
                                    <li>Beef Stroganoff</li>
                                    <li>Grilled Steak</li>
                                    <li>Chicken Parmesan</li>
                                    <li>Ratatouille</li>
                                  </ul>
                                </>
                              )}
                              {Menu === "Asian" && (
                                <>
                                  <ul>
                                    <li>Biryani</li>
                                    <li>Sushi</li>
                                    <li>Thai Green Curry</li>
                                    <li>Pad Thai</li>
                                    <li>Dim Sum</li>
                                  </ul>
                                </>
                              )}
                              {Menu === "Indian" && (
                                <>
                                  <ul>
                                    <li>Chicken Tikka Masala</li>
                                    <li>Biryani</li>
                                    <li>Paneer Tikka</li>
                                    <li>Rogan Josh</li>
                                    <li>Butter Chicken</li>
                                  </ul>
                                </>
                              )}
                              {Menu === "Chinese" && (
                                <>
                                  <ul>
                                    <li>Kung Pao Chicken</li>
                                    <li>Egg Fried Rice</li>
                                    <li>ChowMein</li>
                                    <li>Mapo Tofu</li>
                                    <li>Mongolian Beef</li>
                                  </ul>
                                </>
                              )}
                            </>
                          );
                        })
                      }
                      </div>

                    </>
                  )}
                </Grid>
              </Grid>
            </Card>
            <Grid item mt={4}>
              {data?.eventType?.length > 0 &&
              <>
               <Typography variant="h6" mt={1}>
                Event Type
              </Typography>
              <Typography
                variant="body1"
                fontWeight="normal"
                style={{ maxHeight: "105px", overflowY: "auto" }}
              >
                          { `${data?.eventType[0]?.title} - ${data?.eventType[0]?.price} Rs` } 
              </Typography>
              </>
              }
            </Grid>
            <Grid item mt={4}>
              { addOnData?.length > 0 && addOnData?.map((item, index) => (
                <>
                  <Typography variant="h6" mt={1}>
                    Add Ons
                  </Typography>
                  <Typography>
                    {item?.addOn?.map((item, index) => (
                      <>
                        {item.title !== "Starters" &&
                        item.title !== "Deserts" &&
                        item.title !== "Hot Beverages" ? (
                          <Typography
                            variant="body1"
                            fontWeight="normal"
                            style={{ maxHeight: "105px" }}
                          >
                            {item.title} - {item.price} Rs
                            {item?.menu && (
                              <>
                                <br />
                                {`${item.title} - menu : ${item.menu}`}
                              </>
                            )}
                          </Typography>
                        ) : (
                          <>
                            <Typography
                              variant="body1"
                              fontWeight="normal"
                              style={{ maxHeight: "105px" }}
                            >
                              {item.title}
                            </Typography>
                            {item?.category?.map((item) => (
                              <li
                                variant="body1"
                                fontWeight="normal"
                                style={{ maxHeight: "105px" }}
                              >
                                {item.title} - {item.price} Rs
                              </li>
                            ))}
                          </>
                        )}
                      </>
                    ))}
                  </Typography>
                </>
              ))}
            </Grid>
            <Grid item>
              <Typography variant="h6" mt={1}>
                Description
                <Typography
                  sx={{ overflowY: "auto", maxHeight: "105px" }}
                  variant="body1"
                  fontWeight="normal"
                >
                  {data.description}
                </Typography>
              </Typography>
            </Grid>
            <Grid item mt={6}>
              <Typography variant="h6"> Relevent Images</Typography>
              {data?.multipleImages && (
                <ImageGrid itemData={JSON.parse(data?.multipleImages)} />
              )}
            </Grid>
            <Grid item md={12}>
              <VendorDetail {...{ data, allServices, allReview }} />
            </Grid>
          </>
        ) : null}
      </Container>
      <AvailabilityDrawer
        open={isOpen}
        toggleDrawer={handleCart}
        data={data || []}
        userId={userId}
        vendor={data?.userId?.vendor || null}
        isPackage={isPackage}
        addOnData={addOnData}
      />
    </>
  );
}

export default ServiceDetails;
