import { Box, Typography, IconButton } from "@mui/material";
import ListingInformation from "../ListingInformation/ListingInformation";
import { CustomButtonCompTwo } from "../../common/Button";
import React, { useEffect, useRef, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { useDeleteSingleImageMutation } from "../../../services/mainApiSlice";
import snackBarUtil from "../../../utils/snackbar";

interface PhotoGalleryProps {
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
  prefilledImageUrls?: string[]; // new
  setPrefilledImageUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  onNext: () => void;
  onBack: () => void;
  listingId: string|null;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ uploadedImages,  prefilledImageUrls = [], setPrefilledImageUrls, setUploadedImages, onNext, onBack,listingId }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
    const [deleteImageTrigger, { isLoading: isUpdating }] = useDeleteSingleImageMutation();

  useEffect(() => {
    const newPreviews = uploadedImages
      .filter(file => file instanceof File) // ✅ this prevents errors
      .map(file => URL.createObjectURL(file));

    setImagePreviews(newPreviews);

    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [uploadedImages]);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedImages(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((element,index) => index !== indexToRemove));
  };

  const deletePrefilledImage = async (url: string) => {
    try {
      await deleteImageTrigger({id:listingId,image:url}).unwrap();
      snackBarUtil.success("Image deleted successfully");
    } catch (error:any) {
        snackBarUtil.error(error.message);
    }
  };

  const propsNext = {
    height: '46px',
    width: '150px',
    borderRadius: '3px',
    color: '#000000',
    backgroundColor: '#34BE66',
    fontFamily: 'poppins',
    fontweight: '600',
    fontSize: '20px'

  }
  const propsBack = {
    height: '46px',
    width: '150px',
    borderRadius: '3px',
    backgroundColor: '#7A4F97',
    color: '#B2B2B2',
    fontFamily: 'poppins',
    fontweight: '600',
    fontSize: '20px'

  }

  return (
    <>
      <ListingInformation title="Photo Gallery" categories={""} />

      <Box sx={{ color: '#fff', mb: 1 }}>
       <Typography variant="h6">
        Photo Gallery ({uploadedImages.length + prefilledImageUrls.length}{' '}
        {(uploadedImages.length + prefilledImageUrls.length) === 1 ? 'image' : 'images'} uploaded)
      </Typography>
      </Box>
      <Box
        sx={{
          border: '1px solid #fff',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '662px',
          height: '83px',
          p: 2,
          my: 2
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Box
          onClick={handleFileButtonClick}
          sx={{
            backgroundColor: '#951EE4',
            height: '55px',
            width: '250px',
            borderRadius: '3px',
            color: '#fff',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'poppins',
            letterSpacing: 0,
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Select Images
        </Box>

        <Typography
          sx={{
            marginLeft: '10px',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: '500',
            fontFamily: theme => theme.fontFamily.poppins,
            lineHeight: '22.5px'
          }}
        >
          Upload One or More Files
        </Typography>
      </Box>


      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 2 }}>
        {(prefilledImageUrls || []).map((url, index) => (
          <Box key={`prefilled-${index}`} sx={{
            position: 'relative',
            width: 100,
            height: 100,
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid #fff',
          }}>
            <img
              src={url}
              alt={`prefilled-${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <IconButton
              onClick={() => {
                setPrefilledImageUrls?.(prev => prev.filter((element, i) => i !== index));
                deletePrefilledImage(url)
              }}
              size="small"
              sx={{
                position: 'absolute',
                top: 3,
                right: 3,
                backgroundColor: '#fff',
                width: '25px',
                height: '25px',
                '&:hover': {
                  backgroundColor: '#f44336',
                  color: '#fff',
                },
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        {imagePreviews.map((previewUrl, index) => (
          <Box key={index} sx={{
            position: 'relative',
            width: 100,
            height: 100,
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid #fff',
          }}>
            <img
              src={previewUrl}
              alt={`preview-${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <IconButton
              onClick={() => handleDeleteImage(index)}
              size="small"
              sx={{
                position: 'absolute',
                top: 3,
                right: 3,
                backgroundColor: '#fff',
                width: '25px',
                height: '25px',
                '&:hover': {
                  backgroundColor: '#f44336',
                  color: '#fff',
                },
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>


      <Box sx={{ my: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
        <CustomButtonCompTwo props={propsNext} title="next" onClick={onNext} />
        <CustomButtonCompTwo props={propsBack} title="back" onClick={onBack} />
      </Box>
    </>
  );
};

export default PhotoGallery;
