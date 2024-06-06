// import { Box, Drawer, Grid, Stack, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { SolidButton } from "../../Components/SolidButton";
// import CloseIcon from "@mui/icons-material/Close";
// import DropdownCity from "../../Components/DropdownCity";
// import DropdownVendorMultiple from "../../Components/DropdownVendorMultiple";
// import { DateField } from "../../Components/DateField";
// import TimeField from "../../Components/TimeField";
// import { useIsMobile } from "../../contexts/isMobile";
// import { DropdownVenue } from "../../Components/DropdownVenue";

// const Content = ({ toggleDrawer }) => {
//   const [eventDate, setEventDate] = useState();
//   const [eventTime, setEventTime] = useState();
//   const [selectedVendor, setSelectedVendor] = useState([]);
//   const [form, setForm] = useState({
//     id: "",
//     guests: "",
//     date: "",
//     price: "",
//     vendor: [],
//     time: "",
//     venuetype: "",
//     photographers: "",

//     city: "",
//   });
//   const [Vendors, setVendors] = useState([
//     "Venue",
//     "Photographer",
//     "Decor",
//     "Event Planner",
//     "car Rental",
//     "Caterer",
//   ]);
//   const [VendorFilteredArray, setVendorFilteredArray] = useState([]);
//   const onChange = (e) => {
//     setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
//   };

//   const RequestforPackage = (e) => {
//     console.log(form);
//     toggleDrawer(false);
//   };
//   useEffect(() => {
//     const sameValue = selectedVendor?.filter((item) => Vendors.includes(item));
//     setVendorFilteredArray(sameValue);
//     console.log(sameValue, "value");
//   }, [selectedVendor]);

//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ marginBottom: "3rem" }}
//       >
//         <Typography variant="h6">Add Custom Package Deals</Typography>
//         <Box sx={{ cursor: "pointer" }} onClick={() => toggleDrawer(false)}>
//           <CloseIcon />
//         </Box>
//       </Stack>
//       <Box
//         component="form"
//         sx={{
//           "& .MuiTextField-root": { width: "100%" },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <Grid container spacing={2}>
//           <Grid item md={6} xs={12}>
//             <DropdownCity {...{ form, setForm }} />
//           </Grid>
//           <Grid item md={6} xs={12}>
//             <TextField
//               required
//               id="outlined-required"
//               label="No .of Guests"
//               placeholder="Enter No . of Guests"
//               name="guests"
//               value={form.guests}
//               onChange={onChange}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <DateField {...{ eventDate, setEventDate }} />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TimeField {...{ eventTime, setEventTime }} />
//           </Grid>

//           <Grid item md={6} xs={12} mt={2}>
//             <DropdownVendorMultiple
//               {...{
//                 form,
//                 setForm,
//                 selectedVendor,
//                 setSelectedVendor,
//               }}
//             />
//           </Grid>
//           {VendorFilteredArray.map((item, index) => {
//             return (
//               <>
//                 {item === "Venue" ? (
//                   <>
//                     <Grid item xs={12} sm={6} md={6} mt={1.7}>
//                       <DropdownVenue {...{ form, setForm }} />
//                     </Grid>
//                   </>
//                 ) : (
//                   <></>
//                 )}
//                 {item === "Photographer" ? (
//                   <>
//                     <Grid item md={6} xs={12} mt={1.7}>
//                       <TextField
//                         required
//                         id="outlined-required"
//                         label="No.of Photographers"
//                         placeholder="Enter No.of Photographers"
//                         name="photographers"
//                         value={form.photographers}
//                         onChange={onChange}
//                         sx={{ padding: "3px" }}
//                       />
//                     </Grid>
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </>
//             );
//           })}
//         </Grid>
//         <Stack
//           direction="row"
//           justifyContent={"flex-end"}
//           sx={{ marginTop: "3rem" }}
//         >
//           <SolidButton label="Request" onClick={RequestforPackage} />
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default function DealsDrawer({ open, toggleDrawer }) {
//   const isMobile = useIsMobile();

//   return (
//     <React.Fragment key={"anchor"}>
//       <Drawer
//         sx={{
//           display: { sm: "block" },
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             overflowX: "hidden",
//             width: isMobile ? "80%" : "50%",
//           },
//         }}
//         anchor="right"
//         open={open}
//         onClose={() => toggleDrawer(false)}
//       >
//         <Content toggleDrawer={() => toggleDrawer(false)} />
//       </Drawer>
//     </React.Fragment>
//   );
// }
