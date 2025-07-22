import React, { useState } from 'react';
import {
  TextField, Box, Button, Chip, Grid, Typography,
  InputAdornment, Switch, IconButton, Radio, RadioGroup, FormControlLabel, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CustomButtonCompTwo } from '../../common/Button';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { TOP_ACTIVITY_CATEGORY_ID } from '../../../constant/constant';


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

export type MenuItemType = {
  [x: string]: any;
  menu_type?: string;
  menu_title: string;
  menu_sub_title: string;
  actual_price: string | number;
  discounted_price: string | number;
  type: string;
  status: boolean;
  category?: 'food' | 'drinks';
};

interface ListingHeaderRowProps {
  menuList: MenuItemType[];
  setMenuList: React.Dispatch<React.SetStateAction<MenuItemType[]>>;
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  categoryId?: string;
  titleOverride?: string; 
  subtitleOverride?: string;
}

const ListingHeaderRow: React.FC<ListingHeaderRowProps> = ({
  onNext,
  onBack,
  currentStep,
  menuList,
  setMenuList,
  categoryId,
  subtitleOverride = "Menu Sub Title",
}) => {
  const isTopActivity = categoryId === TOP_ACTIVITY_CATEGORY_ID;
  const [menuTitle, setMenuTitle] = useState('');
  const [menuSubTitle, setMenuSubTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<'food' | 'drinks' | ''>('');
  const handleAddTag = () => {
    if (menuSubTitle.trim() && !tags.includes(menuSubTitle.trim())) {
      setTags([...tags, menuSubTitle.trim()]);
      setMenuSubTitle('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

const handleSubmit = () => {
  handleAddTag();

  if (!menuTitle.trim() || (!isTopActivity && tags.length === 0)) return;

  let newRows: MenuItemType[] = [];

  if (isTopActivity) {
    newRows = tags.map((tag) => ({
      menu_title: menuTitle,       
      menu_sub_title: tag,       
      actual_price: 0,
      discounted_price: 0,
      type: 'Veg',
      status: true,
      menu_type: 'activity'
    }));
  } else {
    newRows = tags.map((tag) => ({
      menu_title: menuTitle,
      menu_sub_title: tag,
      actual_price: 0,
      discounted_price: 0,
      type: 'Veg',
      status: true,
      menu_type: category
    }));
  }

  const filteredNewRows = newRows.filter(
    (newRow) =>
      !menuList.some(
        (existingRow) =>
          existingRow.menu_title === newRow.menu_title &&
          existingRow.menu_sub_title === newRow.menu_sub_title &&
          existingRow.menu_type === newRow.menu_type
      )
  );

  if (filteredNewRows.length > 0) {
    setMenuList([...menuList, ...filteredNewRows]);
  }

  setTags([]);
};

  const handleInputChange = (
    index: number,
    field: keyof MenuItemType,
    value: any
  ) => {
    const updated = [...menuList];
    (updated[index][field] as any) =
      field === 'actual_price' || field === 'discounted_price'
        ? Number(value)
        : value;
    setMenuList(updated);
  };
  const handleDeleteRow = (index: number) => {
    const updated = [...menuList];
    updated.splice(index, 1);
    setMenuList(updated);
  };

  const filteredDrinks = menuList.filter((item) => item.menu_type === 'drinks');
  const filteredFood = menuList.filter((item) => item.menu_type === 'food');
  const filteredActivity = isTopActivity ? menuList : []

  const finalLists = isTopActivity
    ? [filteredActivity]
    : [filteredDrinks, filteredFood];

  return (
    <Box sx={{ background: 'rgba(24, 32, 45, 0.5)', padding: 3, color: 'white' }}>
      <Grid container spacing={2} alignItems="center">
        {!isTopActivity && (
          <Grid item xs={4}>
            <TextField
              select
              label="Select Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              fullWidth
              size="small"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="drinks">Drinks</MenuItem>
            </TextField>
          </Grid>
        )}

        <Grid item xs={isTopActivity ? 6 : 3}>
          <TextField
            label={isTopActivity ? 'Activity' : 'Menu Title'}
            value={menuTitle}
            onChange={(e) => setMenuTitle(e.target.value)}
            fullWidth
            size="small"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
        </Grid>

       {(category || isTopActivity) && (
          <Grid item xs={3}>
            <TextField
              label={isTopActivity ? 'Activity Name' : subtitleOverride || `${category} Sub Title`}
              value={menuSubTitle}
              onChange={(e) => setMenuSubTitle(e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                style: { color: 'white' },
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleAddTag}
                      variant="contained"
                      sx={{ backgroundColor: '#FFD499', color: '#000', fontWeight: 600 }}
                    >
                      Add
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        )}

        <Grid item xs={2}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#34BE66', color: '#000', fontWeight: 600 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

        {tags.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                sx={{ backgroundColor: '#e0e0e0', color: '#000' }}
              />
            ))}
          </Box>
        )}

      {finalLists.map((list, idx) => {
        const actualIndexes = list.map((item) =>
          menuList.findIndex(
            (menu) =>
              menu.menu_title === item.menu_title &&
              menu.menu_sub_title === item.menu_sub_title &&
              menu.menu_type === item.menu_type
          )
        );

        return (
          list.length > 0 && (
            <Box key={idx} sx={{ mt: 3, maxHeight: '550px' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {list[0].menu_type}
              </Typography>
              <Grid container sx={{ background: '#d3d3d3', padding: 1, color: '#000' }}>
                <Grid item xs={2}><strong>Menu Title</strong></Grid>
                <Grid item xs={2}><strong>Menu Sub Title</strong></Grid>
                <Grid item xs={1}><strong>Status</strong></Grid>
                <Grid item xs={1}><strong>Price</strong></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}><strong>Discount</strong></Grid>
                <Grid item xs={1}></Grid>
                {list[0].menu_type === 'food' && <Grid item xs={2}><strong>Type</strong></Grid>}
                <Grid item xs={1}><strong>Actions</strong></Grid>
              </Grid>
              <Box
                sx={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': { width: 0, background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': { background: 'transparent' },
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {list.map((row, i) => {
                  const actualIndex = actualIndexes[i];
                  return (
                    <Grid container key={actualIndex} sx={{ padding: 1, alignItems: 'center', borderBottom: '1px solid #555' }}>
                      <Grid item xs={2}><Typography>{row.menu_title}</Typography></Grid>
                      <Grid item xs={2}><Typography>{row.menu_sub_title}</Typography></Grid>
                      <Grid item xs={1}>
                        <Switch
                          checked={row.status}
                          onChange={(e) => handleInputChange(actualIndex, 'status', e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: 'white',
                              '& + .MuiSwitch-track': {
                                backgroundColor: 'green',
                                opacity: 1,
                              },
                            },
                            '& .MuiSwitch-switchBase': {
                              color: 'white',
                              '& + .MuiSwitch-track': {
                                backgroundColor: 'red',
                                opacity: 1,
                              },
                            },
                            '& .MuiSwitch-thumb': {
                              backgroundColor: 'white',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          type="number"
                          value={row.actual_price}
                          onChange={(e) => handleInputChange(actualIndex, 'actual_price', e.target.value)}
                          size="small"
                          fullWidth
                          sx={{ input: { color: '#fff' } }}
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}>
                        <TextField
                          type="number"
                          value={row.discounted_price}
                          onChange={(e) => handleInputChange(actualIndex, 'discounted_price', e.target.value)}
                          size="small"
                          fullWidth
                          sx={{ input: { color: '#fff' } }}
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                      {row.menu_type === 'food' && (
                        <Grid item xs={2}>
                          <RadioGroup
                            row
                            value={row.type}
                            onChange={(e) => handleInputChange(actualIndex, 'type', e.target.value)}
                          >
                            <FormControlLabel
                              value="Veg"
                              control={<Radio icon={<RadioButtonUncheckedIcon sx={{ color: 'green' }} />} checkedIcon={<RadioButtonCheckedIcon sx={{ color: 'green' }} />} />}
                              label="Veg"
                            />
                            <FormControlLabel
                              value="Non-Veg"
                              control={<Radio icon={<RadioButtonUncheckedIcon sx={{ color: 'red' }} />} checkedIcon={<RadioButtonCheckedIcon sx={{ color: 'red' }} />} />}
                              label="Non-Veg"
                            />
                          </RadioGroup>
                        </Grid>
                      )}
                      <Grid item xs={1}>
                        <IconButton sx={{ color: '#fff' }} onClick={() => handleDeleteRow(actualIndex)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#fff' }}>
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
              </Box>
            </Box>
          )
        );
      })}

      <Box sx={{ my: 3, display: 'flex', gap: '10px' }}>
        <CustomButtonCompTwo props={propsnext} title="Next" onClick={onNext} />
        {currentStep > 0 && (
          <CustomButtonCompTwo props={propsback} title="Back" onClick={onBack} />
        )}
      </Box>
    </Box>
  );
};

export default ListingHeaderRow;
