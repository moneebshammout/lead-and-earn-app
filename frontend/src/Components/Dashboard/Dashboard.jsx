import StateBlock from '../StateBlock/StateBlock';
import LinkBlock from '../LinkBlock/LinkBlock';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { FaUsers } from 'react-icons/fa';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { useState, useEffect } from 'react';
import { getUserDashboardData } from '../../Service/user.service';
import PointsEarnedChart from '../PointsChart/PointsChart';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await getUserDashboardData();
      setDashboardData(response);
      setIsLoading(false);
    }
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} lg={3}>
                <StateBlock
                  sx={{ height: '100%' }}
                  title="Unique Visitors"
                  value={dashboardData['unique_views']}
                  icon={<FaUsers />}
                  iconColor="error.main"
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <StateBlock
                  difference={16}
                  positive={true}
                  sx={{ height: '100%' }}
                  title="Total Visitors"
                  value={dashboardData['total_views']}
                  icon={<FaUsers />}
                  iconColor="success.main"
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <StateBlock
                  sx={{ height: '100%' }}
                  title="Total Points"
                  value={dashboardData['total_points']}
                  icon={<CurrencyDollarIcon />}
                  iconColor="primary.main"
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <LinkBlock
                  sx={{ height: '100%' }}
                  title="Referral Link"
                  link={`${window.location.origin}/auth/${
                    dashboardData['referral_link']
                  }`}
                />
              </Grid>
                <Grid item xs={12} lg={12}>
                  <PointsEarnedChart
                    pointsEarnedData={dashboardData['points_earned']}
                  />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
}
