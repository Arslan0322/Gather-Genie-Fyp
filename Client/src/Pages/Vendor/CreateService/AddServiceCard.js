import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import profile from "../../../assests/profile.jpg";
import { useIsMobile } from "../../../contexts/isMobile";
import { DropdownVendor } from "../../../Components/DropdownVendor";
import { MultipleImages } from "../../../Components/MultipleImages";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";
import DropdownCity from "../../../Components/DropdownCity";
import { DropdownVenue } from "../../../Components/DropdownVenue";
import { useSelector } from "react-redux";
import {
  useCreateServiceMutation,
  useGetServiceByIDQuery,
  useUpdateServicesMutation,
} from "../../../store/servicesSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ServiceCreationNotificationAdmin } from "../../../utils";
import { useCreateNotificationMutation } from "../../../store/notificationsSlice";
import DropdownAmenities from "../../../Components/DropdownAmenities";
import DropdownEquipment from "../../../Components/DropdownEquipment";
import DropdownCuisine from "../../../Components/DropdownCuisine";
import EventPlannerAddOns from "../../../Components/AddOns/EventPlannerAddOns";
import CarRentalAddOns from "../../../Components/AddOns/CarRentalAddOns";
import DecorAddOns from "../../../Components/AddOns/DecorAddOns";
import PhotographyAddOns from "../../../Components/AddOns/PhotographyAddOns";
import CateringAddOns from "../../../Components/AddOns/CateringAddOns";
import VenueAddOns from "../../../Components/AddOns/VenueAddOns";
import { useCreateAddOnMutation } from "../../../store/addOnSlice";
import { useGetAddonByServicesIDQuery, useUpdateAddonMutation } from "../../../store/addOnSlice";
import DropdownDecorType from "../../../Components/DecorTypeDropdown";
import { DropdownEventType } from "../../../Components/EventTypeDropdown";
import DropdownWeddingType from "../../../Components/WeddingTypeDropdown";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

export default function AddServiceCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [createService, { isLoading, isSuccess }] = useCreateServiceMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [createAddOn] = useCreateAddOnMutation();
  const [updateAddOn] = useUpdateAddonMutation();
  const [
    updateServices,
    { isLoading: updateLoading, isSuccess: uploadSuccess, isFetching },
  ] = useUpdateServicesMutation();
  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useGetServiceByIDQuery(id);
  const { data: addOnData, isLoading: isLoadingAddon } = useGetAddonByServicesIDQuery(id);
  const edit = id ? true : false;
  const _id = useSelector((state) => state.user?.userInfo?.data?._id);
  const vendor = useSelector((state) => state.user?.userInfo?.data?.vendor);
  const showPackage =
    vendor === "Photographer" || vendor === "Decor" ? "Package" : "Service";
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedDecor, setSelectedDecor] = useState([])
  const [form, setForm] = useState({
    name: "",
    vendor: vendor || "",
    price: "",
    city: "",
    description: "",
    capacity: "",
    venueType: "",
    carModel: "",
    coverImage: "",
    multipleImages: {},
    location: "",
    amenities: [],
    equipment: [],
    teamMembers: "",
    cuisine: [],
    addOns: [],
    decorType: [],
    town: '',
    eventType: [],
  });
  const btnLabel = isEdit ? "Update" : "Create";
  const isMobile = useIsMobile();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [addOnsData, setAddOnsData] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState([])
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setForm((form) => ({ ...form, coverImage: selectedImage }));
  };

  const handleUploadButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      await updateServices({
        data: {
          ...form,
          multipleImages: JSON.stringify(form?.multipleImages),
          userId: form?.userId?._id,
        },
        id: id,
      });

      await updateAddOn({ data: addOnsData, id: addOnData[0]?._id })
    } else {
      const data = await createService({
        ...form,
        multipleImages: JSON.stringify(form?.multipleImages),
        userId: _id,
      });
      const addOn = await createAddOn({
        addOn: addOnsData,
        servicesId: data?.data?._id,
      });
      if (data?.data?._id) {
        const serviceName = form?.name;
        const notificationData = ServiceCreationNotificationAdmin(
          _id,
          serviceName
        );
        await createNotification(notificationData);
      }

      if (data?.error?.status === 400) {
        toast.error(data?.error?.data?.message);
      }
      if (data?.error?.status === 500) {
        toast.error("An error occured during creating the service");
      }
    }
  };

  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (data) {
      setIsEdit(true);
      // setAddOnsData(data?.addOns);
      setSelectedEventType(data?.eventType)
      setForm({
        ...data,
        multipleImages: JSON.parse(data?.multipleImages),
        vendor,
      });
    }
  }, [data]);

  useEffect(() => {
    // if (isEdit) {
    //     setAddOnsData(form?.addOns);
    // }

    if (addOnData) {
      setAddOnsData(addOnData[0]?.addOn)
      setForm((form) => ({ ...form, addOns: addOnData[0]?.addOn }))
    }
  }, [addOnData]);

  useEffect(() => {
    if(form.eventType  && (vendor === "Event Planner" || vendor === "Photographer")){
      let totalPrice = 0;
      for(let i = 0; i < form.eventType.length ; i++){
        totalPrice += parseInt(form.eventType[i].price)
      }
      setForm((form) => ({ ...form, price: totalPrice.toString() }));
    }
  }, [form,])
  

  useEffect(() => {
    if (isSuccess) {
      refetch();
      navigate("/home");
    }
    if (uploadSuccess) {
      navigate("/home");
    }
  }, [isLoading, isSuccess, uploadSuccess]);

  if ((isLoadingData && isLoadingAddon) || updateLoading || isFetching) return <Loader />;
  return (
    <>
      <Container component="main" maxWidth="lg">
        <Card
          elevation={2}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ m: 4 }}>
            <Grid container spacing={2}>
              <Grid md={12} xs={12}>
                <Typography component="h1" variant="h5" textAlign="center">
                  {edit ? `Edit ${showPackage}` : `Create ${showPackage}`}
                </Typography>
              </Grid>
            </Grid>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid
                container
                spacing={2}
                justifyContent={isMobile ? "center" : "left"}
                direction={isMobile ? "column-reverse" : "row"}
              >
                <Grid item md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="servicename"
                        label={`${showPackage} Name`}
                        value={form.name}
                        name="name"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} mt={2}>
                      <DropdownVendor {...{ form, disableOnChange: true }} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        value={form.location}
                        name="location"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="town"
                        label="Town"
                        value={form.town}
                        name="town"
                        onChange={onChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} marginTop={2}>
                      <DropdownCity {...{ form, setForm }} />
                    </Grid>

                    {form.vendor === "Venue" && (
                      <>
                        <Grid item xs={12} sm={6} md={6} mt={2}>
                          <DropdownVenue {...{ form, setForm }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} mt={2}>
                          <DropdownAmenities
                            {...{
                              form,
                              setForm,
                              selectedAmenities,
                              setSelectedAmenities,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="capacity"
                            value={form.capacity}
                            label="Max No.of Persons"
                            name="capacity"
                            onChange={onChange}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            value={form.price}
                            label="Price per Person"
                            name="price"
                            onChange={onChange}
                          />
                        </Grid>
                        
                        <VenueAddOns
                          {...{ form, setForm, setAddOnsData, addOnsData, isLoadingAddon, isEdit }}
                          data={addOnData ? addOnData[0]?.addOn || [] : []}
                        />
                      </>
                    )}
                    {["Decor"].includes(
                      form.vendor
                    ) && (
                        <Grid item xs={12} md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            value={form.price}
                            label={`${showPackage} Price`}
                            name="price"
                            onChange={onChange}
                          />
                        </Grid>
                      )}

                    {form.vendor === "Photographer" && (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="teamMembers"
                            value={form.teamMembers}
                            label="No. of Team Members"
                            name="teamMembers"
                            onChange={onChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} mt={2}>
                          <DropdownEquipment
                            {...{
                              form,
                              setForm,
                              selectedEquipment,
                              setSelectedEquipment,
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} mt={2}>
                          <DropdownEventType {...{ form, setForm, setSelectedEventType, selectedEventType }} />
                        </Grid>

                       
                        <PhotographyAddOns
                          {...{ form, setForm, setAddOnsData, addOnsData, isLoadingAddon, isEdit }}
                          data={addOnData ? addOnData[0]?.addOn || [] : []}
                        />
                      </>
                    )}
                    {form.vendor === "Caterer" && (
                      <>
                        <Grid item xs={12} md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            value={form.price}
                            label="Price per Person"
                            name="price"
                            onChange={onChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} marginTop={2}>
                          <DropdownCuisine {...{ form, setForm, selectedCuisine, setSelectedCuisine }} />
                        </Grid>
                        <CateringAddOns
                          {...{ form, setForm, setAddOnsData, addOnsData, isLoadingAddon }}
                          data={addOnData ? addOnData[0]?.addOn || [] : []}
                        />
                      </>
                    )}
                    {form.vendor === "Car Rental" && (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="carmodel"
                            value={form.carModel}
                            label="Car Model"
                            name="carModel"
                            onChange={onChange}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            value={form.price}
                            label="Price per hour"
                            name="price"
                            onChange={onChange}
                          />
                        </Grid>
                        <CarRentalAddOns
                          {...{ form, setForm, setAddOnsData, addOnsData, isLoadingAddon, isEdit }}
                          data={addOnData ? addOnData[0]?.addOn || [] : []}
                        />
                      </>
                    )}

                    {form.vendor === "Event Planner" && (

                      <>
                        
                          <DropdownEventType {...{ form, setForm ,  setSelectedEventType,selectedEventType,}} />
                        
                        <EventPlannerAddOns
                          {...{ form, setForm, setAddOnsData, addOnsData, isLoadingAddon }}
                          data={addOnData ? addOnData[0]?.addOn || [] : []}
                        /></>
                    )}
                    {form.vendor === "Decor" && (
                      <>
                        <Grid item xs={12} sm={6} md={6} mt={2}>
                          <DropdownDecorType {...{ form, setForm, selectedDecor, setSelectedDecor }} />
                        </Grid>
                        <DecorAddOns
                          {...{ form, setForm, setAddOnsData, addOnsData, isLoadingAddon }}
                          data={addOnData ? addOnData[0]?.addOn || [] : []}
                        />
                      </>
                    )}
                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="normal"
                        multiline
                        rows={4}
                        required
                        fullWidth
                        id="description"
                        value={form.description}
                        label={`${showPackage} Description`}
                        name="description"
                        onChange={onChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={4} xs={12} textAlign="center">
                  <Card
                    elevation={2}
                    sx={{
                      marginTop: 6,
                      display: "grid",
                      flexDirection: "column",
                      justifyContent: "center",
                      borderRadius: "10px",
                      marginLeft: isMobile ? 0 : "2rem",
                    }}
                  >
                    <Grid item md={6} xs={12}>
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Uploaded Cover Image"
                          style={{
                            width: isMobile ? 200 : 200,
                          }}
                          onChange={onChange}
                          value={form.coverImage}
                        />
                      ) : form?.coverImage ? (
                        <img
                          src={`http://localhost:5000/uploads/${form?.coverImage}`}
                          alt="Logo"
                          style={{
                            width: isMobile ? 200 : 200,
                          }}
                        />
                      ) : (
                        <img
                          src={profile}
                          alt="Logo"
                          style={{
                            width: isMobile ? 200 : 200,
                          }}
                        />
                      )}
                    </Grid>
                  </Card>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    id="imageInput"
                    name="coverImage"
                  />
                  <Button
                    onClick={handleUploadButtonClick}
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontFamily: "Semibold",
                      width: "13rem",
                    }}
                  >
                    Upload Cover Image
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={12} xs={12} mt={2}>
                <MultipleImages
                  multiImages={form?.multipleImages || {}}
                  setMultiImages={(newImages) => {
                    setForm({
                      ...form,
                      multipleImages: newImages,
                    });
                  }}
                  form={form}
                  setForm={setForm}
                />
              </Grid>
              <Grid item md={12} textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontFamily: "Semibold",
                    width: "8rem",
                  }}
                >
                  {isLoading ? "Loading...." : btnLabel}
                </Button>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
}
