import React, { useState } from 'react';

import { Paper, Grid, Typography, Stack, Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import AccordianTable from './ServicesAccordianTable';

function VendorAccordian({data, servicetype, refetchAgain}) {
  const [expanded, setExpanded] = useState(false);
  const [changeText, setChangeText] = useState(false);

  const isPackage = servicetype === "Photographer" || servicetype === "Decor";

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper elevation={3} sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            onClick={() => setChangeText((prev) => !prev)}
          >
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 500,
                  margin: '8px 2px',
                  width: '4%',
                }}
              >
                <Box
                  sx={{
                    borderBottom: changeText ? '5px solid grey' : 'none',
                    display: 'initial',
                  }}
                >
                  {isPackage ? 'Packages' : 'Services'}
                </Box>
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="flex-end"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                sx={{ flexGrow: 1 }}
              >
                {/* <Box
                  // onClick={handleSearchFieldClick}
                  sx={{
                    width: '20%',
                    marginRight: { xs: 0, sm: 2 },
                    marginBottom: '8px',
                    '.MuiAutocomplete-inputRoot': { padding: '1px' },
                  }}
                >
                 <SerchField/>
                </Box> */}
                <Typography
                  sx={{
                    padding: '5px',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '15%',
                    border: '1px solid grey',
                    borderRadius: '5px',
                  }}
                >
                  {changeText ? 'Reduce' : 'Expand'} {changeText ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Typography>
              </Stack>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <AccordianTable data={data} servicetype={servicetype} refetchAgain={refetchAgain} isPackage={isPackage} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Grid>
  );
}

export default VendorAccordian;
