import { Box, Button, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { RxCaretDown } from "react-icons/rx";

interface PaginationCompProps {
    handlerLimitToShowOfData: (e: any) => void
    someIntitalLimits: number[]
    limitOfData: number
    page: number
    allStatusData: any
    handleSelectedPage: (selectedPage: any) => void
    totalPages: number
    selectedValues: (string | number)[]
}

const PaginationComp: FC<PaginationCompProps> = ({ selectedValues, handlerLimitToShowOfData, someIntitalLimits, limitOfData, page, allStatusData, handleSelectedPage, totalPages }) => {
    const disable = page === allStatusData?.totalPage;

    return (
        <>
            <Box sx={{
                padding: '17px 37px 0 67px',
                my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }} className="pagination-comp">
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'info.main', fontFamily: theme => theme.fontFamily.poppins }}>
                    {selectedValues?.length} {" "} of {" "}{limitOfData}{" "} row(s) selected out of {limitOfData} entries.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#fff', fontSize: '11px', fontWeight: '600', fontFamily: theme => theme.fontFamily.poppins }}>
                        Rows per page
                    </Typography>
                    <FormControl size="small" variant="outlined"
                        sx={{
                            p: 0,
                            m: 1,
                            minWidth: 46,
                            maxWidth: 50,
                            color: '#fff',
                            fontSize: '13px',
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '& .MuiInputBase-root': {
                                outline: 'none',
                                border: 'none',
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        <Select
                            onChange={handlerLimitToShowOfData}
                            IconComponent={RxCaretDown}
                            value={limitOfData}
                            sx={{
                                p: 0,
                                borderRadius: '2px',
                                border: '1px solid #5B5B5B',
                                fontSize: '13px',
                                outline: 'none',
                                color: '#fff',
                                '&:focus': { outline: 'none' },
                                '&:hover': { border: 'none' },
                                '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #5B5B5B' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #5B5B5B' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid #5B5B5B' },
                                '& .MuiSelect-outlined': {
                                    px: '16px',
                                    py: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    height: '23px',
                                },
                                "& .MuiSelect-icon": {
                                    color: "#fff",
                                    fontSize: "1rem",
                                },
                            }}
                        >
                            {someIntitalLimits?.map((limit, i) => (
                                <MenuItem key={`${i + 1}numberOfLimit-${limit}`} value={limit} sx={{ fontSize: '13px' }}>{limit}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {allStatusData?.listing?.length > 0 && <Box className="pagination-holder" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2px', border: '1px solid #5B5B5B', height: '23px' }}>
                        <Button
                            onClick={!(page > 1) ? () => { } : () => handleSelectedPage(page - 1)}
                            size='small'
                            sx={{
                                cursor: `${page > 1 ? 'default' : 'not-allowed !important'}`,
                                height: 'auto',
                                p: 0,
                                fontSize: '11px',
                                fontWeight: '600',
                                color: !(page > 1) ? '#a2a1a1 ' : 'info.main',
                                fontFamily: theme => theme.fontFamily.poppins
                            }}>Previous</Button>


                        {(allStatusData?.listing?.length > 0) && [...Array(totalPages)]?.map((_, i) => (
                            <Button
                                onClick={(page === totalPages) ? () => { } : () => handleSelectedPage(i + 1)}
                                key={i}
                                sx={{
                                    minHeight: '21px',
                                    minWidth: '23px',
                                    backgroundColor: page === i + 1 ? '#6FA018' : '#6E6E6E',
                                    borderRadius: 0,
                                    p: 0,
                                    color: 'info.main',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    fontFamily: theme => theme.fontFamily.poppins
                                }}>
                                {i + 1}
                            </Button>
                        ))}


                        <Button
                            onClick={(page + 1 < 1) ? () => { } : () => handleSelectedPage(page + 1)}
                            size='small'
                            sx={{
                                cursor: disable ? 'not-allowed !important' : 'default',
                                p: 0,
                                height: 'auto',
                                color: disable ? '#a2a1a1 ' : 'info.main',
                                fontSize: '11px',
                                fontWeight: '600',
                                fontFamily: theme => theme.fontFamily.poppins
                            }}>Next</Button>
                    </Box>}
                </Box>
            </Box >
        </>
    )
}

export default PaginationComp;
