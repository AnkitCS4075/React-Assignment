import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Avatar,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { authService, User } from '../services/authService';
import Counter from './Counter';
import Layout from './Layout';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const count = useSelector((state: RootState) => state.counter.value);

  // Animation for profile card
  const profileAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Get activity data
  const { labels, data } = authService.getUserActivityData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Activity',
        data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Activity Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const AnimatedBox = animated(Box);

  const dashboardContent = (
    <Grid templateColumns="repeat(2, 1fr)" gap={8}>
      {/* Left Column */}
      <GridItem>
        <VStack spacing={8} align="stretch">
          {/* Profile Section */}
          <AnimatedBox
            style={profileAnimation}
            p={6}
            bg="white"
            borderRadius="lg"
            boxShadow="base"
          >
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <Avatar
                  size="xl"
                  name={user?.name}
                  src={user?.photoURL}
                />
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {user?.name}
                  </Text>
                  <Text color="gray.600">{user?.email}</Text>
                  <Text color="gray.500" fontSize="sm">
                    Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </AnimatedBox>

          {/* Counter Section */}
          <Box p={6} bg="white" borderRadius="lg" boxShadow="base">
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">Counter</Text>
              <Counter />
              <Stat>
                <StatLabel>Current Value</StatLabel>
                <StatNumber>{count}</StatNumber>
                <StatHelpText>
                  <StatArrow type={count >= 0 ? 'increase' : 'decrease'} />
                  {Math.abs(count)} from zero
                </StatHelpText>
              </Stat>
            </VStack>
          </Box>
        </VStack>
      </GridItem>

      {/* Right Column - Activity Chart */}
      <GridItem>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="base" h="full">
          <VStack spacing={4} align="stretch" h="full">
            <Text fontSize="xl" fontWeight="bold">Activity Overview</Text>
            <Box flex="1">
              <Line options={chartOptions} data={chartData} />
            </Box>
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  );

  return <Layout>{dashboardContent}</Layout>;
};

export default Dashboard; 