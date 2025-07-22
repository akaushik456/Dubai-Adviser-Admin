import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { SlCallIn } from "react-icons/sl";
import { CiCamera } from "react-icons/ci";
import { TbBed } from "react-icons/tb";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Typography } from '@mui/material';
import Detail from './Detail/Detail'; 
import PhotoGallery from './PhotoGallery/PhotoGallery';
import TuneIcon from '@mui/icons-material/Tune';
import Filter from './Filter/Filter';
import MenuListing from './MenuListing/Menu'
import type { MenuItemType } from './MenuListing/Menu';
import ContactListing from "./Contact/ContactListing"
import ListingPreviewModal from './ListingPreviewModal';
import { RESTAURANTS_CATEGORY_ID, DESERT_SAFARI_CATEGORY_ID, TOP_ACTIVITY_CATEGORY_ID } from '../../constant/constant';
import { useEffect, useState } from 'react';
import DesertExetreme, { ActivityItemType } from './DubaiAdventures/DesertExtereme';
import { toPascalCase } from '../../utils/utility';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  categories: string;
  setCategory: (value: string) => void;
}

interface EditDataType {
  filters: any;
  listing_name: string;
  category_id: Record<string, string>;
  featured: string;
  address: string;
  map_url: string;
  meta_keyword: string;
  description: string;
  actual_cost: string;
  cost: string;
  opening_Hours: { days: string; time: string; }[];
  image: File[];
  menu: MenuItemType[];
  // tour_durations_price: {
  //   time: "30_minutes" | "1_Hour";
  //   price: number;
  // }[];
  // tour_durations_discounted_price: {
  //   time: "30_minutes" | "1_Hour";
  //   price: number;
  // }[];
  topActivity: ActivityItemType[];
  contact_info: {
    phone: string;
    email: string;
  };
  selectedFiltersByCategory: Record<string, Record<string, string[]>>;
  listingId: string | null;
  _id: string
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AddNewListingTabs({ editData = null }: { editData?: EditDataType | null }) {
  const [value, setValue] = React.useState(0);
  const [categories, setCategory] = React.useState('');
  const [featured, setFeatured] = React.useState('');
  const [listingName, setListingName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [mapUrl, setIframe] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [actualCost, setActualCost] = React.useState('');
  const [metaKeyword, setMetaKeyword] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [uploadedImages, setUploadedImages] = React.useState<File[]>([]);
  const [prefilledImageUrls, setPrefilledImageUrls] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [menuList, setMenuList] = useState<MenuItemType[]>([]);
  const [buggyLists, setBuggyLists] = useState<ActivityItemType[]>([]);
  const [contactList, setContactList] = React.useState({
    phone: '',
    email: ''
  });

  // const [openingHours, setOpeningHours] = React.useState({
  //   days:'',
  //   time:''
  // })
  const [selectedFiltersByCategory, setSelectedFiltersByCategory] = React.useState<Record<string, Record<string, string[]>>>({});
  const resetFormFields = () => {
    setListingName('');
    setCategory('');
    setFeatured('');
    setAddress('');
    setIframe('');
    setMetaKeyword('');
    setDescription('');
    setActualCost('');
    setCost('');
    setTimeSlots({});
    setMenuList([]);
    setBuggyLists([]);
    setContactList({ phone: '', email: '' });
    setSelectedFiltersByCategory({});
    setUploadedImages([]);
    setPrefilledImageUrls?.([]);
    setValue(0);
  };

  useEffect(() => {
    if (location.pathname === "/home/newlisting") {
      resetFormFields();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (editData) {
      setListingName(editData.listing_name || '');
      setCategory(editData.category_id?.id || '');
      setFeatured(editData.featured ? "False" : "True");
      setAddress(editData.address || '');
      setIframe(editData.map_url || '');
      setMetaKeyword(editData.meta_keyword || '');
      setDescription(editData.description || '');
      setActualCost(editData.actual_cost || '');
      setCost(editData.cost || '');
      setTimeSlots(editData.opening_Hours || '');
      if (editData?.menu) {
        const patchedMenu = editData.menu.map((item: any) => {
          if (item?._id) {
            delete item._id;
          }
          if (item?.tour_durations_discounted_price && item?.tour_durations_discounted_price.length>0) {
            item?.tour_durations_discounted_price.map((iter:any)=>(
              delete iter?._id
            ))
          }
          if (item?.tour_durations_price && item?.tour_durations_price.length>0) {
            item?.tour_durations_price.map((iter:any)=>(
              delete iter?._id
            ))
          }
          return { ...item };
        });
        setMenuList(patchedMenu);
      }
      if (editData?.menu) {
        const buggyTour = editData.menu.map((item: any) => {
          if (item?._id) {
            return item._id;
          }
          return { ...item };
        });
        setBuggyLists(buggyTour);
      }

      setContactList(
        Array.isArray(editData.contact_info) && editData.contact_info.length > 0
          ? {
            phone: editData.contact_info[0].number || '',
            email: editData.contact_info[0].email || '',
          }
          : { phone: '', email: '' }
      );

      setValue(0);
      window.scrollTo(0, 0);

      if (editData.opening_Hours) {
        const converted: Record<string, any> = {};
        for (let i = 0; i < editData.opening_Hours.length; i++) {
          const hours: { days: string; time: string; } = editData.opening_Hours[i];
          if (typeof hours["time"] === 'string' && hours["time"].includes('-')) {
            const [start, end] = hours["time"].split('-').map((s) => s.trim());
            converted[hours["days"]] = { start, end };
          } else if (typeof hours["time"] === 'object' && 'start' in hours["time"] && 'end' in hours["time"]) {
            converted[hours.days] = hours["time"];
          }
        }
        setTimeSlots(converted)
      }

      if (Array.isArray(editData.image)) {
        if (typeof editData.image[0] === 'string') {
          setPrefilledImageUrls?.(editData.image as unknown as string[]);
        } else if (editData.image[0] instanceof File) {
          setUploadedImages(editData.image as File[]);
        }
      }

      const filters: Record<string, Record<string, string[]>> = {};
      const tempFilters: Record<string, string[]> = {};
      
      Object.entries(editData?.filters).forEach(([k, v]) => {
        const key = toPascalCase(k);

        if (Array.isArray(v) && typeof v[0] === 'string') {
          try {
            const parsed = JSON.parse(v[0]);
            tempFilters[key] = Array.isArray(parsed) ? parsed : [];
          } catch (err) {
            console.error(`Failed to parse filter for key ${k}:`, v[0]);
            tempFilters[key] = [];
          }
        }
      });
      filters[editData.category_id?.id || ''] = tempFilters;
      setSelectedFiltersByCategory(filters);
    }
  }, [editData]);

  const tabs = [
    { label: 'detail', idx: 0, ico: <IoIosInformationCircleOutline /> },
    { label: 'photo gallery', idx: 1, ico: <CiCamera /> },
    { label: 'Filters', idx: 2, ico: <TuneIcon fontSize='small' /> },
    ...(categories === RESTAURANTS_CATEGORY_ID
      ? [{ label: 'menu', idx: 3, ico: <TbBed /> }]
      : categories === DESERT_SAFARI_CATEGORY_ID
      ? [{ label: 'buggy tour', idx: 3, ico: <TbBed /> }]
      : categories === TOP_ACTIVITY_CATEGORY_ID
      ? [{ label: 'top activity', idx: 3, ico: <TbBed /> }]
      : []),
      { label: 'contact info', idx: 6, ico: <SlCallIn /> },
    ];
  const [openPreview, setOpenPreview] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        sx={{
          position: "relative",
          "& .MuiTabs-indicator": {
            height: "100%",
            backgroundColor: "#18202d",
            zIndex: -1,
            position: "absolute",
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label="listing tabs"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.idx + tab.label}
            sx={{
              margin: '0 2px',
              backgroundColor: "#18202d",
              color: "#fff",
              "&.Mui-selected": {
                backgroundColor: "#270E5F",
                color: "#fff",
              },
              borderRadius: '2px',
              transition: "background-color 0.3s",
            }}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Typography sx={{ height: '24px', width: '24px', fontSize: '1.3rem', color: '#fff' }}>
                  {tab.ico}
                </Typography>
                <Typography sx={{
                  fontSize: '13px', color: '#fff',
                  fontFamily: (theme) => theme.fontFamily?.poppins ?? 'Poppins', fontWeight: 600
                }}>
                  {tab.label}
                </Typography>
              </Box>
            }
            {...a11yProps(tab.idx)}
          />
        ))}
      </Tabs>

      <ListingPreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        onSubmit={() => {
          setOpenPreview(false);
        }}
        listingData={{
          listingName,
          address,
          metaKeyword,
          description,
          categories,
          cost,
          actualCost,
          openingHours: Object.entries(timeSlots).map(([day, time]) => {
            const t = time as { start: string; end: string };
            return {
              days: day,
              time: `${t.start} - ${t.end}`
            };
          }),
          featured,
          mapUrl,
          uploadedImages,
          selectedFiltersByCategory,
          menuList,
          contactList,
          buggyLists
        }}
        listingId={editData?._id ?? null}
      />

      {tabs.map((tab, tabIndex) => (
        <CustomTabPanel
          key={tab.label}
          categories={categories}
          setCategory={setCategory}
          value={value}
          index={tabIndex}
        >
          {tab.label === 'detail' && (
            <Detail
              editData={editData}
              categories={categories}
              setCategories={setCategory}
              featured={featured}
              setFeatured={setFeatured}
              listingName={listingName}
              setListingName={setListingName}
              cost={cost}
              setCost={setCost}
              actualCost={actualCost}
              setActualCost={setActualCost}
              mapUrl={mapUrl}
              setIframe={setIframe}
              address={address}
              setAddress={setAddress}
              metaKeyword={metaKeyword}
              setMetaKeyword={setMetaKeyword}
              description={description}
              setDescription={setDescription}
              onNext={() => setValue(value + 1)}
              onBack={() => setValue(value - 1)}
              currentStep={value}
              totalSteps={tabs.length}
              setTimeSlots={setTimeSlots}
              timeSlots={timeSlots}
            />
          )}
          {tab.label === 'photo gallery' && (
            <PhotoGallery
              listingId={editData?._id ?? null}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
              prefilledImageUrls={prefilledImageUrls}
              setPrefilledImageUrls={setPrefilledImageUrls}
              onNext={() => setValue(value + 1)}
              onBack={() => setValue(value - 1)}
            />
          )}
          {tab.label === 'Filters' && (
            <Filter
              categories={categories}
              selectedByCategory={selectedFiltersByCategory}
              setSelectedByCategory={setSelectedFiltersByCategory}
              onNext={() => setValue(value + 1)}
              onBack={() => setValue(value - 1)}
            />
          )}
          {tab.label === 'menu' && categories === RESTAURANTS_CATEGORY_ID && (
            <MenuListing
              menuList={menuList}
              setMenuList={setMenuList}
              currentStep={value}
              onNext={() => setValue(value + 1)}
              onBack={() => setValue(value - 1)}
              categoryId={RESTAURANTS_CATEGORY_ID}
            />
          )}
          {tab.label === 'buggy tour' && (
            <DesertExetreme
              buggyLists={buggyLists}
              setBuggyLists={setBuggyLists}
              onNext={() => setValue(value + 1)}
              onBack={() => setValue(value - 1)}
            />
          )}
          {tab.label === 'top activity' && (
              <MenuListing
              menuList={menuList}
              setMenuList={setMenuList}
              currentStep={value}
              onNext={() => setValue(value + 1)}
              onBack={() => setValue(value - 1)}
              titleOverride="Activity"
              subtitleOverride="Activity Name"
              categoryId={TOP_ACTIVITY_CATEGORY_ID}
              />
            )}
          {tab.label === 'contact info' && (
            <ContactListing
              contactList={contactList}
              setContactList={setContactList}
              currentStep={value}
              onBack={() => setValue(value - 1)}
              onSubmit={() => setOpenPreview(true)}
            />
          )}
        </CustomTabPanel>
      ))}

    </Box>
  );
}
