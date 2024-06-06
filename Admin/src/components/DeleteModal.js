import { Box, Grid, Modal, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Form } from 'react-router-dom';

export default function DeleteModal({ open, setOpen, label }) {
  const [cancel, setcancel] = useState(false);
 

  const handleSubmit = () => {};
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        component={Form}
        open={open}
        onSubmit={handleSubmit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#F5F5F5',
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {label}
            </Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>
              <CloseIcon />
            </Box>
          </Stack>

          <Grid container justifyContent="center" mt={2}>
            <SolidButton label="Yes" onClick={handleSubmit} btnwidth={isMobile ? '90%' : '30%'} />
            <SolidButton label="No" onClick={handleSubmit} btnwidth={isMobile ? '90%' : '30%'} />
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
