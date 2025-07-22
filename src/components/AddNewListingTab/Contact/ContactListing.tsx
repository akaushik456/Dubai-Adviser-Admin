import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { CustomButtonCompTwo } from '../../common/Button';

interface ContactListProps {
  contactList: {
    phone: string;
    email: string;
  };
  onBack: () => void;
  currentStep: number;
  setContactList: React.Dispatch<React.SetStateAction<{
    phone: string;
    email: string;
  }>>;
  onSubmit: () => void;
}

function ContactListing({ contactList, setContactList, onBack, currentStep, onSubmit }: ContactListProps) {
  const [emailError, setEmailError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactList(prev => ({ ...prev, email: value }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? '' : 'Invalid email address');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setContactList(prev => ({ ...prev, phone: value }));
    }
    const phoneRegex = /^[0-9]{10}$/;
    setPhoneError(phoneRegex.test(value) ? '' : 'Phone must be 10 digits');
  };

  const handleNext = () => {
    if (!emailError && !phoneError && contactList.email && contactList.phone) {
      onSubmit(); // call the prop to open the preview modal
    } else {
      alert("Please fix errors before submitting.");
    }
  };

  const propsnext = {
    height: '46px',
    width: '150px',
    borderRadius: '3px',
    color: '#000000',
    backgroundColor: '#34BE66',
    fontFamily: 'poppins',
    fontweight: '600',
    fontSize: '20px'
  };

  const propsback = {
    height: '46px',
    width: '150px',
    borderRadius: '3px',
    backgroundColor: '#7A4F97',
    color: '#B2B2B2',
    fontFamily: 'poppins',
    fontweight: '600',
    fontSize: '20px'
  };

  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight={600} mb={2} color="white">
        Contact Information
      </Typography>

      <Grid container spacing={2} sx={{ width: '60%' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            variant="standard"
            fullWidth
            value={contactList.phone}
            onChange={handlePhoneChange}
            error={!!phoneError}
            helperText={phoneError}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiInput-underline:before': {
                borderBottom: '1px dashed #fff !important',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '1px dashed #fff !important',
              },
              '& .MuiInput-underline:after': {
                borderBottom: '1px dashed #fff !important',
              },
            }}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 10
            }}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Address"
            fullWidth
            variant="standard"
            value={contactList.email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiInput-underline:before': {
                borderBottom: '1px dashed #fff !important',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '1px dashed #fff !important',
              },
              '& .MuiInput-underline:after': {
                borderBottom: '1px dashed #fff !important',
              },
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ my: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
        <CustomButtonCompTwo props={propsnext} title="submit" onClick={handleNext} />
        {currentStep > 0 && (
          <CustomButtonCompTwo props={propsback} title="back" onClick={onBack} />
        )}
      </Box>
    </Box>
  );
}

export default ContactListing;
