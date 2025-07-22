import React from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from "@mui/material/InputAdornment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';

const MonthCalendar = () => {
    const [open, setOpen] = React.useState<boolean>(false)

    const handleOpen: () => void = () => {
        setOpen(true)
    };

    const handleClose: () => void = () => {
        setOpen(false)
    }
    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer
                    sx={{ p: 0,overflow:'hidden' }}
                    components={[
                        'DatePicker',
                    ]}
                >
                    <DemoItem label="">
                        <DatePicker
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            sx={{
                                textTransform: 'capitalize',
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    InputProps: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarTodayIcon onClick={handleOpen} sx={{ color: "#fff", width: '10px', height: '11px' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{ p: 0 }}
                                                    onClick={handleOpen}
                                                >
                                                    <KeyboardArrowDownIcon sx={{ color: "#fff", }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                    sx: {
                                        minWidth: "108px !important",
                                        border: '1px solid #CFC8C8',
                                        borderRadius: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        "& .MuiInputBase-root": {
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            fontFamily: 'poppins',
                                            lineHeight: '16.5px',
                                            height: '23px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '155px !important',
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "transparent !important",
                                        },
                                        "& .MuiSvgIcon-root": { color: "#fff", fontSize: '16px' },
                                        "& .Mui-error .MuiOutlinedInput-notchedOutline": {
                                            borderColor: 'transparent'
                                        },
                                        "& .MuiButtonBase-root": {
                                            p: 0
                                        }
                                    }
                                }
                                // yyyy-mm-dd format of the date.
                            }} defaultValue={dayjs('this month')} />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
        </React.Fragment>
    )
}

export default MonthCalendar