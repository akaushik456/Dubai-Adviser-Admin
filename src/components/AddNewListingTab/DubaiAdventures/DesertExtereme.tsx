import React, { useState } from 'react';
import {
  TextField, Box, Button, TableContainer, Table, TableHead, TableBody,
  TableRow, TableCell, Paper, Switch, Typography, IconButton, Chip, InputAdornment
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CustomButtonCompTwo } from '../../common/Button';

const propsnext = {
  height: '40px',
  width: '120px',
  borderRadius: '3px',
  color: '#000000',
  backgroundColor: '#34BE66',
  fontFamily: 'poppins',
  fontweight: '600',
  fontSize: '16px'
};

const propsback = {
  height: '40px',
  width: '120px',
  borderRadius: '3px',
  backgroundColor: '#7A4F97',
  color: '#B2B2B2',
  fontFamily: 'poppins',
  fontweight: '600',
  fontSize: '16px'
};

interface AdventureListing {
  buggyLists: any[];
  setBuggyLists: React.Dispatch<React.SetStateAction<any[]>>;
  onNext: () => void;
  onBack: () => void;
}
export type ActivityItemType = {
  _id:string;
  menu_title: string;
  menu_sub_title: string;
  status: boolean;
  tour_durations_price: {
    time: "30_minutes" | "1_Hour";
    price: number;
  }[];
  tour_durations_discounted_price: {
    time: "30_minutes" | "1_Hour";
    price: number;
  }[];
};

const TopActivity: React.FC<AdventureListing> = ({ buggyLists, setBuggyLists, onNext, onBack }) => {
  const [station, setStation] = useState('');
  const [buggyType, setBuggyType] = useState('');
  const [buggyName, setBuggyName] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (buggyName.trim() && !tags.includes(buggyName.trim())) {
      setTags([...tags, buggyName.trim()]);
      setBuggyName('');
    }
  };

  const handleSubmit = () => {
    if (!station || !buggyType || tags.length === 0) return;

    const newItems = tags.map((tag) => ({
      menu_title: station,
      menu_sub_title: tag,
      status: true,
      tour_durations_price: [
        { time: "30_minutes", price: 0 },
        { time: "1_Hour", price: 0 }
      ], 
      tour_durations_discounted_price: [
        { time: "30_minutes", price: 0 },
        { time: "1_Hour", price: 0 }
      ]
    }));

    setBuggyLists([...buggyLists, ...newItems]);
    setTags([]);
    setStation('');
    setBuggyType('');
  };

  const handlePriceChange = (
    index: number,
    type: 'tour_durations_price' | 'tour_durations_discounted_price',
    time: '30_minutes' | '1_Hour',
    value: string
  ) => {
    const updated = [...buggyLists];
    const target = updated[index][type].find((d: any) => d.time === time);
    if (target) {
      target.price = Number(value);
    }
    setBuggyLists(updated);
  };

  const handleStatusToggle = (index: number) => {
    const updated = [...buggyLists];
    updated[index].status = !updated[index].status;
    setBuggyLists(updated);
  };

  const handleDeleteRow = (index: number) => {
    const updated = [...buggyLists];
    updated.splice(index, 1);
    setBuggyLists(updated);
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <Box sx={{ backgroundColor: 'rgba(24, 32, 45, 0.5)', color: 'white', p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={3}>
          <TextField
            label="Activity"
            fullWidth
            value={station}
            onChange={(e) => setStation(e.target.value)}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid size={3}>
          <TextField
            label="Category"
            fullWidth
            value={buggyType}
            onChange={(e) => setBuggyType(e.target.value)}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid size={4}>
          <TextField
            label="Activity Name"
            fullWidth
            value={buggyName}
            onChange={(e) => setBuggyName(e.target.value)}
            InputProps={{
              style: { color: 'white' },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={handleAddTag}
                    variant="contained"
                    sx={{
                      backgroundColor: '#FFD499',
                      color: '#000',
                      fontWeight: 600,
                      height: '36px',
                      minWidth: '60px'
                    }}
                  >
                    Add
                  </Button>
                </InputAdornment>
              )
            }}
            InputLabelProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid size={2}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#34BE66',
              color: '#000',
              fontWeight: 600,
              height: '46px',
              width: '90px'
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            sx={{ backgroundColor: '#e0e0e0', color: '#000' }}
          />
        ))}
      </Box>

      {buggyLists.length > 0 && (
        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(24, 32, 45, 0.5)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#D3D3D3' }}>
                <TableCell><strong>Activity</strong></TableCell>
                <TableCell><strong>Activity Name</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Tour Duration/Price</strong></TableCell>
                <TableCell><strong>After Discounted Price</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buggyLists.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{color:'#fff'}}>{item.menu_title}</TableCell>
                  <TableCell sx={{color:'#fff'}}>{item.menu_sub_title}</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.status}
                      onChange={() => handleStatusToggle(index)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: 'white',
                          '& + .MuiSwitch-track': { backgroundColor: 'green', opacity: 1 },
                        },
                        '& .MuiSwitch-switchBase': {
                          color: 'white',
                          '& + .MuiSwitch-track': { backgroundColor: 'red', opacity: 1 },
                        },
                        '& .MuiSwitch-thumb': { backgroundColor: 'white' },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{color:'#fff'}}>30 MINUTES</Typography>
                      <TextField
                        value={item.tour_durations_price?.find((d: any) => d.time === '30_minutes')?.price || ''}
                        onChange={(e) =>
                          handlePriceChange(index, 'tour_durations_price', '30_minutes', e.target.value)
                        }
                        size="small"
                        sx={{ input: { color: '#fff' }, backgroundColor: '#673AB7', width: 80 }}
                      />
                      <Typography variant="body2" sx={{color:'#fff'}}>1 HOUR</Typography>
                      <TextField
                        value={item.tour_durations_price?.find((d: any) => d.time === '1_Hour')?.price || ''}
                        onChange={(e) =>
                          handlePriceChange(index, 'tour_durations_price', '1_Hour', e.target.value)
                        }
                        size="small"
                        sx={{ input: { color: '#fff' }, backgroundColor: '#673AB7', width: 80 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{color:'#fff'}}>30 MINUTES</Typography>
                      <TextField
                        value={item.tour_durations_discounted_price?.find((d: any) => d.time === '30_minutes')?.price || ''}
                        onChange={(e) =>
                          handlePriceChange(index, 'tour_durations_discounted_price', '30_minutes', e.target.value)
                        }
                        size="small"
                        sx={{ input: { color: '#fff' }, backgroundColor: '#673AB7', width: 80 }}
                      />
                      <Typography variant="body2" sx={{color:'#fff'}}>1 HOUR</Typography>
                      <TextField
                        value={item.tour_durations_discounted_price?.find((d: any) => d.time === '1_Hour')?.price || ''}
                        onChange={(e) =>
                          handlePriceChange(index, 'tour_durations_discounted_price', '1_Hour', e.target.value)
                        }
                        size="small"
                        sx={{ input: { color: '#fff' }, backgroundColor: '#673AB7', width: 80 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton sx={{ color: '#fff' }} onClick={() => handleDeleteRow(index)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ my: 3, display: 'flex', gap: '10px' }}>
        <CustomButtonCompTwo props={propsnext} title="Next" onClick={onNext} />
        <CustomButtonCompTwo props={propsback} title="Back" onClick={onBack} />
      </Box>
    </Box>
  );
};

export default TopActivity;
