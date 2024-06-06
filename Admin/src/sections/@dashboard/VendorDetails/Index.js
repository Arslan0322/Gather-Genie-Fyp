import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

import VendorReviewAccordian from './VendorReviewAccordian';
import VendorAccordian from './VendorServicesAccordian';
import { VendorProfileCard } from './VendorProfileCard';
import { ProfileInfo } from './ProfileInfo';
import {useGetVendorByIDQuery} from "../../../store/registrationSlice";
import Loader from "../../../components/Loader";

export default function VendorDetail() {
  const { id } = useParams();
  const {data, isLoading, refetch} = useGetVendorByIDQuery(id)

  const name = data && `${data?.vendor[0]?.firstname} ${data?.vendor[0]?.lastname}`

  const refetchAgain =()=>{
    refetch()
  }

  if(isLoading) return <Loader />
  return (
    <>
      {id ? (
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <VendorProfileCard name={name} email={data?.vendor[0]?.email} photo={data?.vendor[0]?.photo} />
          </Grid>
          <Grid item md={9} xs={12}>
            <ProfileInfo data={data?.vendor[0] || []} />
          </Grid>
          <VendorAccordian data={data?.vendorService || []} servicetype={data?.vendor[0]?.vendor} refetchAgain={refetchAgain} />
          {/* <VendorReviewAccordian /> */}
        </Grid>
      ) : null}
    </>
  );
}
