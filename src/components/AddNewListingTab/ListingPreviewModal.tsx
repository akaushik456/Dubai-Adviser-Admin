import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Stack, Chip } from '@mui/material';
import { useAddListingMutation, useUpdateListingMutation } from '../../services/mainApiSlice';
import { useDispatch } from 'react-redux';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { transformFilters, toSnakeCase } from "../../utils/utility";
import { MenuItemType } from './MenuListing/Menu';
import snackBarUtil from '../../utils/snackbar';
import { DESERT_SAFARI_CATEGORY_ID, RESTAURANTS_CATEGORY_ID, TOP_ACTIVITY_CATEGORY_ID } from '../../constant/constant';

interface ListingPreviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  listingData: {
    buggyLists: any;
    openingHours: any;
    listingName: string;
    address: string;
    metaKeyword: string;
    description: string;
    cost: string;
    actualCost: string;
    categories: string;
    featured: string;
    mapUrl: string;
    uploadedImages: File[] | string[];
    selectedFiltersByCategory: any;
    menuList: MenuItemType[]
    contactList: {
      phone: string;
      email: string;
    };
  };
  listingId?: string | null;
}

const categoryIdToName: Record<string, string> = {
  "1": "Restaurant",
  "2": "Top Activities",
  "3": "Dubai Desert Safari",
  "67d91e51cf3c17f1cafbeb76": "Restaurant",
  "65e7229a5ef5ddee8cd15f71": "Top Activities",
  "65f13806a1b0a70d4602ba3f": "Dubai Desert Safari"
};

const extractOnlyFilters = (filters: Record<string, any>, currentCategoryId: string) => {
  return filters[currentCategoryId] || {};
};

const ListingPreviewModal: React.FC<ListingPreviewModalProps> = ({
  open,
  onClose,
  onSubmit,
  listingData,
  listingId
}) => {
  const dispatch = useDispatch();
  const [addTrigger, { isLoading: isAdding }] = useAddListingMutation();
  const [updateTrigger, { isLoading: isUpdating }] = useUpdateListingMutation();

  const isTopActivity = listingData.categories === TOP_ACTIVITY_CATEGORY_ID;
  const isRestaurant = listingData.categories === RESTAURANTS_CATEGORY_ID;
  const isDesertSafari = listingData.categories === DESERT_SAFARI_CATEGORY_ID;

  const handleSubmit = async () => {
    const activeFilters = extractOnlyFilters(
      listingData.selectedFiltersByCategory,
      listingData.categories
    );

    const toSnakeFilters = transformFilters(activeFilters);

    const payload: any = {
      listing_name: listingData.listingName,
      address: listingData.address,
      meta_keyword: listingData.metaKeyword,
      description: listingData.description,
      map_url: listingData.mapUrl,
      cost: listingData.cost,
      actual_cost: listingData.actualCost,
      category_id: listingData.categories,
      opening_Hours: listingData.openingHours,
      features: listingData.featured,
      image: listingData.uploadedImages,
      ...toSnakeFilters,

      menu: !isDesertSafari
      ? listingData.menuList.map((item) => {
          const updatedItem = {
            ...item,
            type: item.type as 'Veg' | 'Non-Veg',
          };
    
          if (isTopActivity) {
            delete updatedItem?.menu_type;
          }
    
          return updatedItem;
        })
      : listingData.buggyLists,
    

      contact_info: [
        {
          number: listingData.contactList.phone,
          email: listingData.contactList.email,
        },
      ],
    };

    const formData = new FormData();
    formData.append("listing_name", payload.listing_name);
    formData.append("address", payload.address);
    formData.append("meta_keyword", payload.meta_keyword);
    formData.append("description", payload.description);
    formData.append("map_url", payload.map_url);
    formData.append("cost", payload.cost);
    formData.append("actual_cost", payload.actual_cost);
    formData.append("category_id", payload.category_id);
    formData.append("opening_Hours", JSON.stringify(payload.opening_Hours));
    formData.append("features", payload.features ? "true" : "false");
    formData.append("menu", JSON.stringify(payload.menu));
    formData.append("contact_info", JSON.stringify(payload.contact_info));

    if (Array.isArray(payload.image)) {
      payload.image.forEach((imgFile: string | Blob) => {
        formData.append("image", imgFile);
      });
    }

    Object.entries(toSnakeFilters).forEach(([key, values]) => {
      formData.append(`${key}[]`, JSON.stringify(values));
    });

    try {
      if (listingId) {
        await updateTrigger({ id: listingId, body: formData }).unwrap();
        snackBarUtil.success("Listing updated successfully!");
      } else {
        await addTrigger(formData).unwrap();
        snackBarUtil.success("Listing added successfully!");
      }
      onSubmit();
    } catch (error) {
      console.error("Failed to submit listing:", error);
      const err = error as FetchBaseQueryError;
      const message = (err.data as any)?.message || "Something went wrong while submitting.";
      snackBarUtil.error(message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      PaperProps={{
        sx: { background: '#7a34cb' }
      }}
    >
      <DialogTitle sx={{ color: '#fff' }}>Listing Preview</DialogTitle>
      <DialogContent dividers sx={{ color: '#fff' }}>
        <Typography variant="h6">Listing Name: {listingData.listingName}</Typography>
        <Typography>Address: {listingData.address}</Typography>
        <Typography>Meta Keyword: {listingData.metaKeyword}</Typography>
        <Typography>Description: {listingData.description}</Typography>
        <Typography>
          Category: {categoryIdToName[listingData.categories] || listingData.categories}
        </Typography>
        <Typography>Actual Cost: {listingData.actualCost}</Typography>
        <Typography>Discounted Cost: {listingData.cost}</Typography>
        <Typography>Featured: {listingData.featured === 'true' ? 'Yes' : 'No'}</Typography>

        {listingData.mapUrl && (
          <Box mt={2}>
            <Typography variant="h6">Map Preview:</Typography>
            <iframe
              src={listingData.mapUrl}
              width="100%"
              height="300"
              style={{ border: "1px solid #ccc", marginTop: 8, borderRadius: 8 }}
              allowFullScreen
              loading="lazy"
            />
          </Box>
        )}

        <Box my={2}>
          <Typography variant="h6">Opening Hours</Typography>
          {Array.isArray(listingData.openingHours) ? (
            listingData.openingHours.map((slot, idx) => (
              <Box key={idx} mb={1}>
                <Typography>Days: {slot.days}</Typography>
                <Typography>Time: {slot.time}</Typography>
              </Box>
            ))
          ) : (
            <Box>
              <Typography>Days: {listingData.openingHours?.days}</Typography>
              <Typography>Time: {listingData.openingHours?.time}</Typography>
            </Box>
          )}
        </Box>

        <Box my={2}>
          <Typography variant="h6">Uploaded Images:</Typography>
          {listingData.uploadedImages.length === 0 ? (
            <Typography>No images uploaded</Typography>
          ) : (
            <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
              {listingData.uploadedImages.map((file, idx) => (
                <img
                  key={idx}
                  src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                  alt={`Uploaded ${idx}`}
                  style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }}
                />
              ))}
            </Box>
          )}
        </Box>

        <Box my={2}>
          <Typography variant="h6" gutterBottom>Filters:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1.5}>
            {Object.entries(
              transformFilters(
                extractOnlyFilters(listingData.selectedFiltersByCategory, listingData.categories)
              )
            ).flatMap(([_, values]) =>
              (values as string[]).map((value, index) => (
                <Chip key={index} label={value} variant="outlined"
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    fontWeight: 500
                  }}
                />
              ))
            )}
          </Stack>
        </Box>

        <Box my={2}>
          <Typography variant="h6" gutterBottom>
            {listingData.menuList[0]?.menu_type === 'activity' ? 'Activities' : 'Menu Details'}
          </Typography>
          {listingData?.menuList.length === 0 && listingData?.buggyLists.length===0 ? (
            <Typography>No data provided for this listing type.</Typography>
          ) : (
            <table style={{ backgroundColor: '#18202d', width: '100%', borderRadius: '8px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd', color: '#fff' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    {listingData?.menuList[0]?.menu_type === 'activity' ? 'Activity' : 'Menu Title'}
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    {listingData?.menuList[0]?.menu_type === 'activity' ? 'Activity Name' : 'Menu Sub Title'}
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    {listingData.categories === DESERT_SAFARI_CATEGORY_ID ? 'Price (30m / 1hr)' : 'Price'}
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    {listingData.categories === DESERT_SAFARI_CATEGORY_ID ? 'Discounted (30m / 1hr)' : 'Discounted Price'}
                  </th>
                  {listingData?.menuList.some((item: MenuItemType) => item.menu_type ) && (
                    <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                  )}
                  {/* <th style={{ padding: '12px', textAlign: 'left' }}>
                    {listingData?.menuList[0]?.menu_type === 'activity' ? 'Category' : 'Menu Type'}
                  </th> */}
                </tr>
              </thead>
              <tbody>
  {(listingData?.categories === DESERT_SAFARI_CATEGORY_ID
    ? listingData?.buggyLists
    : listingData?.menuList
  )?.map((item: MenuItemType, idx: number) => {
    const isDesertSafari = listingData.categories === DESERT_SAFARI_CATEGORY_ID;
    const isActivity = item.menu_type === 'activity';

    const getPriceByTime = (list: any[], time: string) =>
      list?.find((p) => p.time === time)?.price ?? 0;

    return (
      <tr
        key={idx}
        style={{
          borderBottom: '1px solid #ddd',
          color: '#000',
          background: '#fff',
          borderRadius: '8px',
        }}
      >
        <td style={{ padding: '12px' }}>{item.menu_title}</td>
        <td style={{ padding: '12px' }}>{item.menu_sub_title}</td>

        {isDesertSafari ? (
          <>
            <td style={{ padding: '12px' }}>
              ₹{getPriceByTime(item.tour_durations_price, '30_minutes')} / ₹
              {getPriceByTime(item.tour_durations_price, '1_Hour')}
            </td>
            <td style={{ padding: '12px' }}>
              ₹{getPriceByTime(item.tour_durations_discounted_price, '30_minutes')} / ₹
              {getPriceByTime(item.tour_durations_discounted_price, '1_Hour')}
            </td>
          </>
        ) : (
          <>
            <td style={{ padding: '12px' }}>₹{item.actual_price}</td>
            <td style={{ padding: '12px' }}>₹{item.discounted_price}</td>
          </>
        )}

        {/* Uncomment if needed */}
        {/* {!isActivity && !isDesertSafari && (
          <td style={{ padding: '12px', color: item.type === 'Veg' ? 'green' : 'red' }}>
            {item.type}
          </td>
        )} */}

        <td style={{ padding: '12px' }}>
          {isDesertSafari ? 'Desert Safari' : item.menu_type || '-'}
        </td>
      </tr>
    );
  })}
</tbody>
            </table>
          )}
        </Box>

        <Box my={2}>
          <Typography variant="h6">Contact Info:</Typography>
          <Typography>Email: {listingData.contactList.email}</Typography>
          <Typography>Phone: {listingData.contactList.phone}</Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isAdding || isUpdating}>Close</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isAdding || isUpdating}
        >
          {(isAdding || isUpdating) ? 'Submitting...' : 'Confirm & Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ListingPreviewModal;