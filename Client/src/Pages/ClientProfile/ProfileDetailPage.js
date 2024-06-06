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
import profile from "../../assests/profile.jpg";
import edit from "../../assests/edit.svg";
import { ProfileData } from "./profileUtils";
import { useIsMobile } from "../../contexts/isMobile";
import { useNavigate } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "../../store/usersSlice";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

function ProfileDetailPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Api integration part
  const { data, isLoading, refetch } = useGetUserProfileQuery();
  const [updateUser, { isLoading: updateLoading, isSuccess }] =
    useUpdateUserMutation();

  // UseState part
  const [isEdit, setIsEdit] = useState([]);
  const [previousData, setPreviousData] = useState(null);
  const [form, setForm] = useState(data || {});
  const [image, setImage] = useState(null);

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
    if (image) {
      data = { ...form, ...changes, photo: image };
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

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // if (selectedImage) {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     ;
    //   };

    //   reader.readAsDataURL(selectedImage);
    // }
  };

  const handleUploadButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  // UseEffect
  useEffect(() => {
    // Initialize the previousData state with the initial data from Redux store
    setPreviousData(data || {});
  }, [data]);
  useEffect(() => {
    if (isSuccess) toast.success("Profile Updated Successfully");
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
                  {ProfileData.map((item, index) => {
                    const fieldName = item.toLowerCase().replace(" ", "");
                    return (
                      <>
                        <Grid item xs={10} md={6}>
                          <Typography variant="body1">{item}</Typography>
                          <Typography
                            variant="body2"
                            name={`${fieldName}`}
                            contentEditable={isEdit[index] ? true : false}
                            onBlur={(e) =>
                              handleFieldChange(fieldName, e.target.textContent)
                            }
                          >
                            {data && data[fieldName]}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={6}>
                          <IconButton onClick={(e) => handleClick(index)}>
                            <img
                              src={edit}
                              alt="Logo"
                              style={{
                                width: 15,
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </>
                    );
                  })}
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
                ref={fileInputRef}
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

export default ProfileDetailPage;
