import React, { FC, useEffect } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  // Grid,
  Skeleton
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MonthCalendar from "../MonthCalendar/MonthCalendar";
import { LuSearch } from "react-icons/lu";
import snackBarUtil from "../../utils/snackbar";
import { useGetDataByclickStatusQuery } from "../../services/mainApiSlice";
import Grid from '@mui/material/Grid2';
type currentClrType = {
  all: string;
  active: string;
  pending: string;
  inactive: string;
  block: string
}

interface AllSalesHistoryCompProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setSearchData: React.Dispatch<React.SetStateAction<any[]>>
  handleChangeStatus: (e: any) => void
  searchDataError: any
}

export const AllSalesHistoryComp: FC<AllSalesHistoryCompProps> = ({ search, setSearch, setSearchData, handleChangeStatus, searchDataError }) => {
  const { data: statusQueryData, isLoading: statusQueryLoading } = useGetDataByclickStatusQuery()
  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value === "") {
      setSearchData([]);
    }
  };

  const sm = useMediaQuery("(min-width:600px)");
  const lg = useMediaQuery("(min-width:1024px)");
  const xl = useMediaQuery("(min-width:1441px)");

  function clr(currentClrText: keyof currentClrType): string {
    let currentClr: currentClrType = {
      all: '#ffffff',
      active: '#457226',
      pending: '#9D6316',
      inactive: '#F63B4E',
      block: '#151515'
    }

    const finalclr = currentClr[currentClrText] || '#000'
    return finalclr
  }

  useEffect(() => {
    if (searchDataError) {
      snackBarUtil.error(searchDataError?.data?.message)
    }
  }, [searchDataError])
  return (
    <Box sx={{ mt: 4, }}>
      <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px' }}>
        <Grid
        >
          <Typography
            component='p'
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: 'center',
              height: "100%",
              width: '100%',
              fontFamily: (theme) => theme.fontFamily.poppins,
              fontSize: { xl: "16px" },
              fontWeight: { xl: "600" },
              lineHeight: (theme) => ({
                xl: theme.lineHeight.lhxl2,
              }),
            }}
          >
            All Sales History
          </Typography>
        </Grid>

        <Grid

        >
          <TextField
            value={search}
            onChange={handlerSearch}
            placeholder="Search by Name"
            size="small"
            sx={{
              border: "0px solid transparent",
              ":focus-visible": {
                border: "1px solid #966CAC",
              },
              ":focus-within": {
                border: "0px solid transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "red",
                boxShadow: "none",
              },
              "& .MuiInputBase-input": {
                width: "93px",
                p: 0,
                color: '#fff',
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF99",
                fontSize: "11px",
                fontFamily: (theme) => theme.fontFamily.poppins,
              },

              "& .MuiOutlinedInput-root": {
                p: '0 0 0 10px',
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "0.2px solid #966CAC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "0.2px solid #966CAC",
                },
              },

              minHeight: "23px",
              fontFamily: (theme) => ({
                xl: theme.fontFamily.poppins,
              }),
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disableFocusRipple
                      disableTouchRipple
                      disableRipple
                    >
                      <LuSearch
                        style={{
                          color: "#FFFFFF99",
                          height: '11.33px',
                          width: '11.33px'
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>


        <Grid
          sx={{ display: 'flex', alignItems: 'center', border: '1px solid #966CAC', height: '23px', p: '13px 10px', borderRadius: '2px' }}
        >
          {statusQueryData?.data?.status && statusQueryData?.data?.status?.length > 0 ?
            (<Grid container sx={{ display: "flex", flexWrap: "nowrap", gap: '10px' }}>
              {statusQueryData?.data?.status.map((item) => (
                <Grid key={item.status} onClick={() => handleChangeStatus(item?.status)} className={`tabvalue-${item?.status}`} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <Typography component='p' sx={{
                    fontSize: { xl: '11px' }, fontWeight: '600', fontFamily: (theme) => theme.fontFamily.poppins,
                    color: '#FFFFFF99',
                    textTransform: 'capitalize'
                  }}>
                    {item.status}
                  </Typography>

                  <Typography component='p' sx={{
                    backgroundColor: clr(item.status as keyof currentClrType),
                    fontSize: { xl: '8px' },
                    fontWeight: '600',
                    textAlign: 'center',
                    fontFamily: (theme) => theme.fontFamily.poppins,
                    lineHeight: { xl: '12px' },
                    height: '12px',
                    borderRadius: '2px',
                    color: item.status === 'all' ? '#000' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0.5
                  }}>
                    {Object.values(item)?.[0]}
                  </Typography>
                </Grid>
              ))}
            </Grid>)
            :
            (<Grid container sx={{ display: "flex", flexWrap: "nowrap", gap: '10px', width: '329px' }}>
              <Skeleton animation='wave' variant="text" sx={{ fontSize: '1rem', width: '100%', }} />
            </Grid>)}
        </Grid>
        <Grid sx={{ ml: 'auto' }} >
          <MonthCalendar />
        </Grid>
      </Grid>
    </Box >
  );
};
