import React from 'react';
import { Paper, Grid, Typography, Stack, Divider, Box, Button } from '@mui/material';

import EditSvg from '../../../Assets/EditSvg';
import { ProfileData } from './ProfileUtils';

export function ProfileInfo({ data }) {
  return (
    <>
      <Paper elevation={3} sx={{ padding: '1.5rem', height: '100%' }}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Stack direction="column" sx={{ height: '100%' }}>
              <Typography variant="p" sx={{ fontSize: 16, fontWeight: 600 }}>
                Name
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.secondary',
                  margin: '.85rem 0',
                  wordBreak: 'break-word',
                }}
              >
                {`${data?.firstname} ${data?.lastname}`}
              </Typography>
              <Divider />
              <Typography variant="p" sx={{ fontSize: 16, fontWeight: 600 }}>
                Gender
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.secondary',
                  margin: '.85rem 0',
                  wordBreak: 'break-word',
                }}
              >
                {data?.gender}
              </Typography>
              <Divider />

              <Typography variant="p" sx={{ fontSize: 16, fontWeight: 600 }}>
                Email Address
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.secondary',
                  margin: '.85rem 0',
                  wordBreak: 'break-word',
                }}
              >
                {data?.email}
              </Typography>
              <Divider />
              <Typography variant="p" sx={{ fontSize: 16, fontWeight: 600 }}>
                Experience
              </Typography>
              <a href={`http://localhost:5000/uploads/${data?.experience}`} rel="noreferrer" target="_blank" download>
                Download File
              </a>
              <Divider />
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack direction="column" sx={{ height: '100%' }}>
              <Typography variant="p" sx={{ fontSize: 16, fontWeight: 600 }}>
                Phone Number
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.secondary',
                  margin: '.85rem 0',
                  wordBreak: 'break-word',
                }}
              >
                {data?.number}
              </Typography>
              <Divider />
              <Typography variant="p" sx={{ fontSize: 16, fontWeight: 600 }}>
                Vendor Type
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.secondary',
                  margin: '.85rem 0',
                  wordBreak: 'break-word',
                }}
              >
                {data?.vendor}
              </Typography>
              <Divider />

              <Typography variant="p" sx={{ fontSize: 16, fontWeight: 600 }}>
                City
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.secondary',
                  margin: '.85rem 0',
                  wordBreak: 'break-word',
                }}
              >
                {data?.city}
              </Typography>
              <Divider />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
