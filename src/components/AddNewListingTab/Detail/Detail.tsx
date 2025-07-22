import React, { useState } from "react"
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from "@mui/material"
import ListingInformation from "../ListingInformation/ListingInformation"
import { RxCaretDown } from "react-icons/rx";
import { Link } from "@mui/material"
import { sanitizeIframe } from "../../../utils/utlis"
import DetailTimingsModal from './DetailTimingsModal';
import { CustomButtonCompTwo } from "../../common/Button";
import { DESERT_SAFARI_CATEGORY_ID, RESTAURANTS_CATEGORY_ID, TOP_ACTIVITY_CATEGORY_ID } from "../../../constant/constant";
import snackBarUtil from "../../../utils/snackbar";

interface DetailProps {
    editData: any;
    categories: string;
    setCategories: React.Dispatch<React.SetStateAction<string>>;
    listingName: string;
    setListingName: React.Dispatch<React.SetStateAction<string>>;
    featured: string;
    setFeatured: React.Dispatch<React.SetStateAction<string>>
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    mapUrl: string;
    setIframe: React.Dispatch<React.SetStateAction<string>>;
    metaKeyword: string;
    setMetaKeyword: React.Dispatch<React.SetStateAction<string>>;
    cost: string;
    setCost: React.Dispatch<React.SetStateAction<string>>;
    actualCost: string;
    setActualCost: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    onNext: () => void;
    onBack: () => void;
    currentStep: number;
    totalSteps: number;
    timeSlots: Record<string, { start: string; end: string }>;
    setTimeSlots: React.Dispatch<React.SetStateAction<Record<string, { start: string; end: string }>>>
}
const Detail: React.FC<DetailProps> = ({ categories,
    setCategories,
    listingName,
    setListingName,
    featured,
    setFeatured,
    address,
    setAddress,
    mapUrl,
    setIframe,
    metaKeyword,
    setMetaKeyword,
    cost,
    setCost,
    actualCost,
    setActualCost,
    description,
    setDescription,
    onNext,
    currentStep,
    totalSteps,
    setTimeSlots,
    timeSlots }) => {
    interface InputItem {
        label?: string;
        comp?: React.ReactNode;
    }

    const propsnext = {
        height: '46px',
        width: '150px',
        borderRadius: '3px',
        color: '#000000',
        backgroundColor: '#34BE66',
        fontFamily: 'poppins',
        fontweight: '600',
        fontSize: '20px'

    }

    type InputsProps = InputItem[];

    // const [sanitizedSrc, setSanitizedSrc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [savedTimings, setSavedTimings] = useState<Record<string, { start: string; end: string }>>({});
    const [errors, setErrors] = useState({
        listingName: '',
        categories: '',
        address: '',
        metaKeyword: '',
        description: '',
        cost: '',
        actualCost: '',
        mapUrl: '',
    });

    const handleNext = () => {
        if (validateFields()) {
            onNext();
        }
    };

    const handleIframeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        const src = sanitizeIframe(value);
        setIframe(src)
    };

    const validateFields = () => {
        let newErrors = {
            listingName: '',
            categories: '',
            address: '',
            metaKeyword: '',
            description: '',
            cost: '',
            actualCost: '',
            mapUrl: ''
        };

        let isValid = true;

        if (!listingName.trim()) {
            // newErrors.listingName = 'Listing name is required';
            snackBarUtil.error('Listing name is required');
            isValid = false;
        }
        if (!categories) {
            // newErrors.categories = 'Category is required';
            snackBarUtil.error('Category is required');
            isValid = false;
        }
        if (!address.trim()) {
            // newErrors.address = 'Address is required';
            snackBarUtil.error('Address is required');
            isValid = false;
        }
        if (!description.trim()) {
            // newErrors.description = 'Description is required';
            snackBarUtil.error('Description is required');
            isValid = false;
        }
        if (!metaKeyword.trim()) {
            // newErrors.metaKeyword = 'Meta keyword is required';
            snackBarUtil.error('Meta keyword is required');
            isValid = false;
        }
        if (!cost.trim()) {
            // newErrors.cost = 'Please fill the cost';
            snackBarUtil.error('Cost is required');
            isValid = false;
        }
        if (!actualCost.trim()) {
            // newErrors.actualCost = 'Actual cost is required';
            snackBarUtil.error('Actual cost is required');
            isValid = false;
        }
        if (mapUrl && (mapUrl.includes('<iframe') || mapUrl.includes('src='))) {
            snackBarUtil.error('Invalid iframe embed code');
            // newErrors.mapUrl = 'Invalid iframe embed code';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }
    const inputs: InputsProps = [

        {
        comp: (
            <TextField
                sx={{
                width: '100%',
                '& label': {
                    color: '#fff',
                },
                '& .MuiInputBase-input': {
                    color: '#fff',
                },
                '& label.Mui-focused': {
                    color: '#fff',
                },
                '& .MuiInputBase-root:before': {
                    borderBottom: '1px dashed #fff !important',
                },
                '& .MuiInputBase-root:hover:before': {
                    borderBottom: '1px dashed #fff !important',
                },
                '& .MuiInputBase-root:after': {
                    borderBottom: '1px dashed #fff !important',
                },
                }}
                InputLabelProps={{
                sx: {
                    color: '#fff',
                    '&.Mui-focused': {
                    color: '#fff',
                    },
                },
                }}
                id="standard-basic"
                label="Listing Name"
                variant="standard"
                value={listingName}
                onChange={(e) => setListingName(e.target.value)}
                error={!!errors.listingName}
                helperText={errors.listingName}
            />
        )
        },
        {
            // label: 'select category',
            comp: <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '100%' }}>
                <InputLabel
                    id="select-category-label"
                    sx={{
                        color: '#fff',
                        '&.Mui-focused': {
                            color: '#fff',
                        },
                    }}
                >
                    Select Category
                </InputLabel>
                <Select
                    labelId="select-category-label"
                    id="select-category"
                    value={categories}
                    IconComponent={RxCaretDown}
                    onChange={(e) => setCategories(e.target.value)}
                    error={!!errors.categories}
                    sx={{
                        '&:before': { borderBottom: '1px dashed #fff !important' },
                        '&:hover:before': { borderBottom: '1px dashed #fff !important' },
                        '&:after': { borderBottom: '1px dashed #fff !important' },
                        "& .MuiSelect-icon": {
                            color: "#fff",
                            fontSize: "1rem",
                        },
                        color: '#fff'
                    }}
                >
                    <MenuItem value={RESTAURANTS_CATEGORY_ID}>Restaurant</MenuItem>
                    <MenuItem value={TOP_ACTIVITY_CATEGORY_ID}>Top Activities</MenuItem>
                    <MenuItem value={DESERT_SAFARI_CATEGORY_ID}>Dubai Desert Safari</MenuItem>
                </Select>
            </FormControl>
        },
        {
            // label: 'select category',
            comp: <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '100%' }}>
                <InputLabel
                    id="select-category-label"
                    sx={{
                        color: '#fff',
                        '&.Mui-focused': {
                            color: '#fff',
                        },
                    }}
                >
                    Featured
                </InputLabel>
                <Select
                    labelId="select-category-label"
                    id="select-category"
                    value={featured}
                    onChange={(e) => setFeatured(e.target.value)}
                    IconComponent={RxCaretDown}
                    sx={{
                        '&:before': { borderBottom: '1px dashed #fff !important' },
                        '&:hover:before': { borderBottom: '1px dashed #fff !important' },
                        '&:after': { borderBottom: '1px dashed #fff !important' },
                        "& .MuiSelect-icon": {
                            color: "#fff",
                            fontSize: "1rem",
                        },
                        color: '#fff'

                    }}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="True">True</MenuItem>
                    <MenuItem value="False">False</MenuItem>
                </Select>
            </FormControl>
        },
        {
            label: 'Address',
            comp: <TextField
                variant="outlined"
                sx={{
                    borderRadius: '4px',
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "transparent !important",
                        },
                        "&:hover fieldset": {
                            borderColor: "transparent !important",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent !important",
                        },
                    },
                    width: '100%',
                    '& label': {
                        color: '#fff',
                    },
                    '& label.Mui-focused': {
                        color: '#fff',
                    },
                    border: '1px solid #fff',
                    '& .MuiInputBase-root:before': {
                        borderBottom: '1px dashed #fff !important',
                    },
                    '& .MuiInputBase-root:hover:before': {
                        borderBottom: '1px dashed #fff !important',
                    },
                    '& .MuiInputBase-root:after': {
                        borderBottom: '1px dashed #fff !important',
                    },
                }}
                slotProps={{
                    input: {
                        sx: {
                            color: '#fff',
                            '&.Mui-focused': {
                                color: '#fff',
                            },
                        },
                    }
                }}
                id="listing-page-title"
                // label="Listing Page Title"
                multiline
                maxRows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
            />
        },
        {
            label: 'map',
            comp: (
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', marginTop: '-16px' }}>
                        <Link
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener"
                            underline="hover"
                            sx={{ color: '#ccc', fontSize: '12px' }}
                        >
                            Open Google Maps
                        </Link>
                    </Box>

                    <TextField
                        variant="outlined"
                        multiline
                        maxRows={4}
                        placeholder="paste <iframe> link here"
                        id="iframe"
                        value={mapUrl}
                        onChange={handleIframeChange}
                        error={!!errors.mapUrl}
                        sx={{
                            borderRadius: '4px',
                            width: '100%',
                            border: '1px solid #fff',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent !important',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent !important',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'transparent !important',
                                },
                            },
                            '& label': {
                                color: '#fff',
                            },
                            '& label.Mui-focused': {
                                color: '#fff',
                            },
                        }}
                        slotProps={{
                            input: {
                                sx: {
                                    color: '#fff',
                                    '&.Mui-focused': {
                                        color: '#fff',
                                        border: 'none',
                                    },
                                },
                            },
                        }}
                    />
                    {/* <Box sx={{ mt: 2, color: '#ccc', fontSize: '12px',wordBreak:'break-all' }}>
                        Sanitized iframe src: {sanitizedSrc || 'No valid src found'}
                    </Box> */}
                </Box>
            )
        },
        {
            label: 'Meta Keyword',
            comp: <TextField
                variant="outlined"
                sx={{
                    borderRadius: '4px',
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "transparent !important",
                        },
                        "&:hover fieldset": {
                            borderColor: "transparent !important",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent !important",
                        },
                    },
                    width: '100%',
                    '& label': {
                        color: '#fff',
                    },
                    '& label.Mui-focused': {
                        color: '#fff',
                    },
                    border: '1px solid #fff',
                    // '& .MuiInputBase-root:before': {
                    //     borderBottom: '1px dashed #fff !important',
                    // },
                    '& .MuiInputBase-root:hover:before': {
                        borderBottom: '1px dashed #fff !important',
                    },
                    // '& .MuiInputBase-root:after': {
                    //     borderBottom: '1px dashed #fff !important',
                    // },
                }}
                slotProps={{
                    input: {
                        sx: {
                            color: '#fff',
                            '&.Mui-focused': {
                                border: 'none',
                                color: '#fff',
                            },
                        },
                    }
                }}
                id="meta"
                multiline
                maxRows={4}
                value={metaKeyword}
                onChange={(e) => setMetaKeyword(e.target.value)}
                error={!!errors.metaKeyword}
                helperText={errors.metaKeyword}
            />
        },
        {
            label: 'Description',
            comp: (
                <TextareaAutosize
                    minRows={3}
                    maxRows={6}
                    aria-label="minimum height"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                        width: '100%',
                        border: '1px solid #fff',
                        borderRadius: '4px',
                        padding: '8px',
                        color: '#fff',
                        backgroundColor: 'transparent',
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        outline: 'none',
                        resize:'none',
                        overflow:'auto',
                        maxHeight:'80px',
                    }}
                />
                /* {errors.description && (
              <p style={{color:'red'}}>{errors.description}</p>
            )} */
            )
        },
        {
            label: 'Pricing',
            comp: (
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Actual Price"
                        variant="outlined"
                        fullWidth
                        sx={{
                            borderRadius: '4px',
                            border: '1px solid #fff',
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "transparent !important" },
                                "&:hover fieldset": { borderColor: "transparent !important" },
                                "&.Mui-focused fieldset": { borderColor: "transparent !important" },
                            },
                            "& label": { color: "#fff" },
                            "& label.Mui-focused": { color: "#fff" },
                        }}
                        slotProps={{
                            input: {
                                sx: {
                                    color: '#fff',
                                    '&.Mui-focused': {
                                        border: 'none',
                                        color: '#fff',
                                    },
                                },
                            }
                        }}
                        value={actualCost}
                        onChange={(e) => setActualCost(e.target.value)}
                        error={!!errors.actualCost}
                        helperText={errors.actualCost}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Discounted Price"
                        variant="outlined"
                        fullWidth
                        sx={{
                            borderRadius: '4px',
                            border: '1px solid #fff',
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "transparent !important" },
                                "&:hover fieldset": { borderColor: "transparent !important" },
                                "&.Mui-focused fieldset": { borderColor: "transparent !important" },
                            },
                            "& label": { color: "#fff" },
                            "& label.Mui-focused": { color: "#fff" },
                        }}
                        slotProps={{
                            input: {
                                sx: {
                                    color: '#fff',
                                    '&.Mui-focused': {
                                        border: 'none',
                                        color: '#fff',
                                    },
                                },
                            }
                        }}
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        error={!!errors.cost}
                        helperText={errors.cost}
                    />
                </Grid>
            </Grid>
            )
        },
        {
            label: '',
            comp: (
                <><CustomButtonCompTwo
                    title="Pick your time and week"
                    props={{
                        height: '40px',
                        width: '220px',
                        borderRadius: '4px',
                        backgroundColor: '#34BE66',
                        color: '#fff',
                        fontFamily: 'poppins',
                        fontweight: '600',
                        fontSize: '14px'
                    }}
                    onClick={() => setIsModalOpen(true)} />
                    <DetailTimingsModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        setTimeSlots={setTimeSlots}
                        timeSlots={timeSlots}
                    />
                </>
            )
        }
    ];

    return (
        <>

            <ListingInformation title={'Listing Information'} categories={categories} setCategory={setCategories} />
            <Grid container sx={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'space-between' }}>
                {inputs?.map((input, idx) => (
                    <Grid item xl={3.9} sx={{}} key={idx}>
                        <Typography sx={{ textTransform: 'capitalize', mb: 1 }}>
                            {input?.label}
                        </Typography>
                        {input?.comp}
                    </Grid>

                ))}
            </Grid>

            <Box sx={{ my: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
                {currentStep < totalSteps - 1 &&
                    (<CustomButtonCompTwo props={propsnext} title="next" onClick={handleNext} />)}
            </Box>

        </>
    )
}
export default Detail;