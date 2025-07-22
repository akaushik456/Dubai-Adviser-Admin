import React from 'react';
import {Box,Card,Typography,CircularProgress,useTheme,} from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

interface AnalyticsProps {
  title: string;
  value: string | number;
  change?: string;
  changePositive?: boolean;
  graph?: React.ReactNode;
  icon?: React.ReactNode; 
  color?: string;
  circularValue?: number; 
}
const StatCard: React.FC<AnalyticsProps> = ({
  title,
  value,
  change,
  changePositive = true,
  graph,
  icon,
  color = '#2196f3',
  circularValue,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.mode === 'dark' ? '#1f1f2c' : '#2b3443',
        display: 'flex',
        flexDirection: 'column',
        height: 110,
      }}
    >
      <Typography variant="subtitle2" color="#fff" mb={1}>
        {title}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight={600} color="#fff">
            {value}
          </Typography>
          {change && (
            <Box display="flex" alignItems="center" mt={0.5}>
              {changePositive ? (
                <ArrowDropUp sx={{ color: 'green', fontSize: 20 }} />
              ) : (
                <ArrowDropDown sx={{ color: 'red', fontSize: 20 }} />
              )}
              <Typography
                variant="body2"
                color={changePositive ? 'green' : 'red'}
              >
                {change}
              </Typography>
            </Box>
          )}
        </Box>

        {circularValue !== undefined ? (
          <CircularProgress
            variant="determinate"
            value={circularValue}
            thickness={5}
            size={40}
            sx={{
              color,
            }}
          />
        ) : (
          icon ?? graph
        )}
      </Box>
    </Card>
  );
};

export default StatCard;
