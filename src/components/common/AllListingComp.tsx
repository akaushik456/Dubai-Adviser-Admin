import React, { FC } from 'react'
import { Box, Typography } from "@mui/material";
import AllListingPage from '../../pages/AllListing/AllListing';

interface AllListingCompProps {
    title?: string
    subtitle?: string
}

const AllListingComp: FC<AllListingCompProps> = ({ title, subtitle }) => {
    return (
        <>
            <Box>
                <Typography component={'h1'} sx={{
                    fontSize: (theme) => theme.fontSize.lgH, fontWeight: '600',
                    fontFamily: (theme) => theme.fontFamily.poppins,
                    lineHeight: (theme) => theme.custom.lhxl
                }}>
                    {title}
                </Typography>

                <Typography component='p' sx={{
                    fontSize: (theme) => theme.fontSize.smP,
                    lineHeight: (theme) => theme.custom.lhxl,
                    fontFamily: (theme) => theme.fontFamily.calibri
                }}>
                    {subtitle}
                </Typography>


            </Box>
        </>
    )
}
export default AllListingComp;