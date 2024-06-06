import React, { useState, useEffect } from "react";
import { useIsMobile } from "../../../contexts/isMobile";
import { Card, Container, Grid, IconButton, Typography } from "@mui/material";
import ImageGrid from "../../../Components/ImageGrid";
import { SolidButton } from "../../../Components/SolidButton";
import Navbar from "../../../Components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../../../Components/DeleteModal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  useGetServiceByIDQuery,
  useDeleteServiceMutation,
} from "../../../store/servicesSlice";
import Loader from "../../../Components/Loader";
import { useSelector } from "react-redux";
import { useGetAddonByServicesIDQuery } from "../../../store/addOnSlice";
import { add } from "date-fns";

export default function ServiceDetails() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { id } = useParams();
  const vendor = useSelector((state) => state?.user?.userInfo?.data?.vendor);
  const userId = useSelector((state) => state?.user?.userInfo?.data?._id);
  const [openDelete, setOpenDelete] = useState();
  const { data, isLoading, refetch } = useGetServiceByIDQuery(id);
  const [deleteService] = useDeleteServiceMutation();
  const { data: addOnData, refetch: refetchAdOn } = useGetAddonByServicesIDQuery(id);
  const showPackage =
    vendor === "Photographer" || vendor === "Decor" ? "Package" : "Service";

  const handleEdit = (id) => {
    navigate(`/addservices/${id}`);
  };
  const handleDelete = () => {
    setOpenDelete(!openDelete);
  };
  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    refetch();
    refetchAdOn()
  }, []);

  useEffect(() => {
    if (!userId) return navigate("/login");
  }, [userId]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Navbar />
      <Container sx={{ margin: isMobile ? 0 : 6 }}>
        <Grid container spacing={3} alignItems="center" p={2}>
          <Grid
            container
            spacing={2}
            justifyContent="right"
            mt={isMobile ? 3 : 0}
          >
            <Grid container spacing={2}>
              <Grid item>
                <IconButton onClick={handleBackClick}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6">{showPackage} Details</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <SolidButton
                label="Edit"
                onClick={() => handleEdit(id)}
                btnwidth="100%"
              />
            </Grid>
            <Grid item>
              <SolidButton
                label="Delete"
                onClick={handleDelete}
                btnwidth="100%"
              />
            </Grid>
          </Grid>
        </Grid>
        {id ? (
          <>
            <Card
              elevation={6}
              sx={{ maxWidth: "100%", maxHeight: "100%", marginTop: 4 }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item md={7}>
                  <img
                    src={
                      data?.coverImage
                        ? `http://localhost:5000/uploads/${data?.coverImage}`
                        : require("../../../assests/noimg.jpeg")
                    }
                    alt="Logo"
                    style={{
                      width: isMobile ? 340 : 700,
                      borderRadius: "8px",
                      marginBottom: "-0.5rem",
                    }}
                  />
                </Grid>

                <Grid item md={4} my={1} mx={"3rem"}>
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
                    {data.price}
                    {data?.userId?.vendor === "Venue" ||
                      data?.userId?.vendor === "Caterer"
                      ? " per person"
                      : data?.userId?.vendor === "Car Rental"
                        ? " per hour"
                        : ""}
                  </Typography>
                  {data?.userId?.vendor === "Venue" && (
                    <>
                      <Typography variant="h6" mt={1}>
                        Venue Type
                      </Typography>
                      <Typography variant="body1">{data.venueType}</Typography>
                      <Typography variant="h6" mt={1}>
                        Amenities
                      </Typography>
                      <Typography variant="body1">
                        {data.amenities?.join(",")}
                      </Typography>
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
                      <Typography variant="body1">
                        {data.equipment?.join(",")}
                      </Typography>
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

                  {data?.userId?.vendor === "Decor" && <>
                    <Typography variant="h6" mt={1}>
                      Decor Types
                    </Typography>
                    <Typography variant="body1">
                      {data.decorType?.join(",")}
                    </Typography>
                  </>}

                  {data?.userId?.vendor === "Caterer" && (
                    <>
                      <Typography variant="h6" mt={1}>
                        Cuisine Type
                      </Typography>
                      <div style={{ height: "170px", overflowY: "scroll" }}>
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
            {
              (vendor === 'Event Planner' || vendor === 'Photographer') && data?.eventType?.length >  0 && (
                <Grid item mt={4}>
                  <Typography variant="h6" mt={1}>
                    Event Type
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="normal"
                    style={{ maxHeight: "105px", overflowY: "auto" }}
                  >
                    { `${data?.eventType[0]?.title} - ${data?.eventType[0]?.price} Rs`}
                  </Typography>
                
                </Grid>
              )
            }
            <Grid item mt={4}>
              {addOnData?.length > 0 && addOnData?.map((item, index) => (
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
              </Typography>
              <Typography
                variant="body1"
                fontWeight="normal"
                style={{ maxHeight: "105px", overflowY: "auto" }}
              >
                {data.description}
              </Typography>
            </Grid>
            <Grid item mt={4}>
              <Typography variant="h6"> Relevent Images</Typography>
              {data?.multipleImages && (
                <ImageGrid itemData={JSON.parse(data?.multipleImages)} />
              )}
            </Grid>
          </>
        ) : null}
      </Container>
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        id={id}
        deleteItem={deleteService}
      />
    </>
  );
}
