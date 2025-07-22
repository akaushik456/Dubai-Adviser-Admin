import React from 'react';
import {Box,Card,CardContent,Typography,Button,LinearProgress,Avatar,Grid,} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  graph?: React.ReactNode;
  icon?: React.ReactNode;
}

const COLORS = ['#00C49F', '#FFBB28', '#8884d8', '#FF8042'];

const deviceData = [
  { name: 'Mobile', value: 68.3 },
  { name: 'Tablet', value: 17.68 },
  { name: 'Desktop', value: 10.5 },
  { name: 'Others', value: 5.16 },
];

const browserData = [
  { name: 'Google', value: 23379 },
  { name: 'Safari', value: 78973 },
  { name: 'Opera', value: 12457 },
  { name: 'Edge', value: 8570 },
  { name: 'Firefox', value: 6135 },
  { name: 'Ubuntu', value: 4789 },
];

const countryData = [
  { name: 'India', value: 32190, code: 'in' },
  { name: 'Germany', value: 8798, code: 'de' },
  { name: 'Mexico', value: 16885, code: 'mx' },
  { name: 'Uae', value: 14885, code: 'ae' },
  { name: 'Argentina', value: 17578, code: 'ar' },
  { name: 'Russia', value: 10118, code: 'ru' },
  { name: 'China', value: 6578, code: 'cn' },
  { name: 'France', value: 2345, code: 'fr' },
  { name: 'Canada', value: 1678, code: 'ca' },
];

const TrafficDashboard = () => {
  return (
    <Grid container spacing={2}>
      {/* Sessions By Device */}
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#2b3443', color: 'white', minHeight:'400px' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Sessions By Device</Typography>
              <Button size="small" sx={{ color: 'purple' }}>View All</Button>
            </Box>
            <Box height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2} display="flex" justifyContent="space-around">
              {deviceData.map((item, i) => (
                <Box key={i}>
                  <Typography variant="body2">
                    <strong>{item.name}:</strong> {item.value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Traffic Sources */}
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#2b3443', color: 'white',minHeight:'400px' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Traffic Sources</Typography>
              <Button size="small" sx={{ color: 'purple' }}>View All</Button>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              {browserData.map((item, i) => (
                <Box key={i} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography variant="body2" color="success.main">{item.value.toLocaleString()}</Typography>
                  <Box width={100}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((item.value / 80000) * 100, 100)}
                      sx={{
                        height: 6,
                        borderRadius: 5,
                        backgroundColor: '#929292ff',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#00e676' 
                        }
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Visitors By Countries */}
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#2b3443', color: 'white'}}>
          <CardContent sx={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': { width: 0, background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': { background: 'transparent' },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Visitors By Countries</Typography>
              <Button size="small" sx={{ color: 'purple' }}>View All</Button>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              {countryData.map((country, i) => (
                <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      src={`https://flagcdn.com/w40/${country.code}.png`}
                      alt={country.name}
                      sx={{ width: 24, height: 18 }}
                      variant="square"
                    />
                    <Typography variant="body2">{country.name}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ backgroundColor: '#2a2a40', px: 1.5, py: 0.5, borderRadius: 1 }}>
                    {country.value.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TrafficDashboard;
