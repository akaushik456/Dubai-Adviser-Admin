import React, { FC, ReactNode, useState } from 'react'
import { Box, Typography } from "@mui/material";
import { TableComp } from '../../components/Table/TableComp';
// import { TableComp } from '../../components/Table/TableComp.tsx_old';

interface AllListingPageProps { }

const AllListingPage: FC<AllListingPageProps> = () => {
    return (
        <Box className="alllistingpage">
            <TableComp />
        </Box>
    )
}
export default AllListingPage;