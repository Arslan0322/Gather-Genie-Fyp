import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Card,
  Container,
  Button,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import profile from "../../../assests/profile.jpg";
import edit from "../../../assests/edit.svg";
import { useIsMobile } from "../../../contexts/isMobile";
import { VendorProfileData } from "./VendorProfileUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "../../../store/usersSlice";
import Loader from "../../../Components/Loader";
import { DropdownVendor } from "../../../Components/DropdownVendor";

function VendorProfileEdit() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const imagefileRef = useRef(null);
  // Api integration part
  const { data, isLoading, refetch } = useGetUserProfileQuery();
  const [updateUser, { isLoading: updateLoading, isSuccess }] =
    useUpdateUserMutation();

  // UseState part
  const [isEdit, setIsEdit] = useState([]);
  const [previousData, setPreviousData] = useState(null);
  const [form, setForm] = useState(data || {});
  const [image, setImage] = useState(null);
  const [experience, setExperience] = useState(null);

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compare previousData with updatedData to see what has changed
    const changes = {};
    let data;
    for (const key in form) {
      if (previousData[key] !== form[key]) {
        changes[key] = form[key];
      }
    }
    if (image || experience) {
      data = { ...form, ...changes, photo: image, experience };
    } else {
      data = { ...form, ...changes };
    }
    await updateUser(data);
    setIsEdit([]);
  };

  const handleFieldChange = (fieldName, newValue) => {
    // Update the updatedData state when a field is changed
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const handleClick = (index) => {
    const newEdit = [...isEdit];
    newEdit[index] = true;
    setIsEdit(newEdit);
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setExperience(selectedFile);
  };

  const handleUploadFileButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUploadButtonClick = () => {
    // Trigger the hidden file input
    imagefileRef.current.click();
  };

  // UseEffect
  useEffect(() => {
    // Initialize the previousData state with the initial data from Redux store
    setPreviousData(data || {});
    setExperience(data?.experience || null)
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile Updated Successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Container component="main" maxWidth="md">
      <Card
        elevation={2}
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 2 }}>
          <Grid container spacing={2} alignItems="center" p={2}>
            <Grid item>
              <IconButton onClick={handleBackClick}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">Personal Info</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction={isMobile ? "column-reverse" : "row"}
          >
            <Grid md={8} xs={12}>
              <Box sx={{ m: 3 }}>
                <Grid container spacing={2}>
                  {VendorProfileData.map((item, index) => {
                    const fieldName = item.toLowerCase().replace(" ", "");
                    return (
                      <>
                        <Grid item xs={10} md={6}>
                          <Typography variant="body1">
                            {item === "Vendor" ? "Service Type" : item}
                          </Typography>
                          {item === "Vendor" ? (
                            isEdit[index] ? (
                              <DropdownVendor {...{ form, setForm }} />
                            ) : (
                              <Typography
                                variant="body2"
                                contentEditable={isEdit[index] ? true : false}
                                onBlur={(e) =>
                                  handleFieldChange(
                                    fieldName,
                                    e.target.textContent
                                  )
                                }
                              >
                                {data && data[fieldName]}
                              </Typography>
                            )
                          ) : (
                            <>
                              <Typography
                                variant="body2"
                                contentEditable={isEdit[index] ? true : false}
                                onBlur={(e) =>
                                  handleFieldChange(
                                    fieldName,
                                    e.target.textContent
                                  )
                                }
                              >
                                {data && data[fieldName]}
                              </Typography>
                            </>
                          )}
                        </Grid>

                        <Grid item xs={2} md={6}>
                          <IconButton onClick={(e) => handleClick(index)}>
                            <img
                              src={edit}
                              alt=""
                              style={{
                                width: 15,
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </>
                    );
                  })}
                  <Grid item xs={10} md={6}>
                    <Typography variant="body1">Experience </Typography>
                    <Box
                      sx={{
                        border: "1px solid grey",
                        borderRadius: "8px",
                        height: "3.5rem",
                        mt: 2,
                      }}
                    >
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        id="experience"
                        name="experience"
                      />

                      <Button
                        onClick={handleUploadFileButtonClick}
                        fullWidth
                        variant="contained"
                        sx={{
                          m: 1,
                          fontFamily: "Semibold",
                          width: "6rem",
                        }}
                      >
                        Upload
                      </Button>
                      {!experience?.name ?
                        <a href={`http://localhost:5000/uploads/${experience}`} rel="noreferrer" target="_blank" download>Download File</a> :
                        <Typography
                          sx={{
                            mt: "-2.5rem",
                            ml: "7rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {experience?.name}
                        </Typography>
                      }

                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid md={4} xs={12} textAlign="center">
              <Card
                elevation={2}
                sx={{
                  marginTop: 6,
                  display: "grid",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
              >
                <Grid item md={6}>
                  {image || data?.photo ? (
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : `http://localhost:5000/uploads/${data?.photo}`
                      }
                      alt="UploadedImage"
                      style={{
                        width: isMobile ? 300 : 250,
                      }}
                    />
                  ) : (
                    <img
                      src={profile}
                      alt="Logo"
                      style={{
                        width: isMobile ? 300 : 250,
                      }}
                    />
                  )}
                </Grid>
              </Card>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                ref={imagefileRef}
                id="imageInput"
                name="photo"
              />
              <Button
                onClick={handleUploadButtonClick}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontFamily: "Semibold",
                  width: "6rem",
                }}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12} textAlign="center">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: "Semibold",
                width: "10rem",
              }}
            >
              {updateLoading ? "Loading...." : "Save Changes"}
            </Button>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default VendorProfileEdit;