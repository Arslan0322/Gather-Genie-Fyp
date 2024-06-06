import React from 'react';

import { Paper, Typography, Stack, Box, Avatar } from '@mui/material';

export function VendorProfileCard({name, email, photo}) {
  return (
    <Paper elevation={3} sx={{ height: '100%' }}>
      <Stack direction="column" alignItems="center" sx={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ width: '100px', height: '100px' }} alt="Profile Image" src={photo && `http://localhost:5000/uploads/${photo}`} />
        </Box>
        <Typography
          variant="p"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: 14,
            fontWeight: 500,
            margin: '5px',
            color: 'text.secondary',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          {email}
        </Typography>
      </Stack>
    </Paper>
  );
}
