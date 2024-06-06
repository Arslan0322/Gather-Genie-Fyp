import { useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import CarRentalSvg from '../Assets/CarRental';
import ChefIcon from '../Assets/Chief';
import Vendor from '../Assets/Vendor';
import EventPlannerSvg from '../Assets/EventPlanner';
import Client from '../Assets/Client';
import HallOwner from '../Assets/HallOwner';
import DecoratorSvg from '../Assets/Decorator';
import PhotographerSvg from '../Assets/Photographer';
import { useGetDashboardCountQuery } from '../store/dashboardSlice';
import { socket } from '../socket';
import Loader from '../components/Loader';
import EarningSvg from '../Assets/EarningSvg';

// ----------------------------------------------------------------------
export default function DashboardAppPage() {
  const { data, isLoading } = useGetDashboardCountQuery();

  const user = JSON.parse(localStorage.getItem('isLogin'));

  useEffect(() => {
    socket.emit('new-user-add', user?.id);
    socket.on('get-users', (users) => {
      localStorage.setItem('onlineUsers', JSON.stringify(users));
    });
  }, [user]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Vendors" total={data?.vendor} icon={<Vendor />} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Clients" total={data?.client} color="info" icon={<Client />} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Venue" total={data?.Venue} color="warning" icon={<HallOwner />} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Car Rentals" total={data?.CarRental} color="error" icon={<CarRentalSvg />} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Caterers" total={data?.Caterer} color="success" icon={<ChefIcon />} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Decors" total={data?.Decor} color="secondary" icon={<DecoratorSvg />} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Photographers"
              total={data?.Photographer}
              color="primary"
              icon={<PhotographerSvg />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Event Planners"
              total={data?.EventPlanner}
              color="orange"
              icon={<EventPlannerSvg />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Earnings" total={data?.total} color="green" icon={<EarningSvg />} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
