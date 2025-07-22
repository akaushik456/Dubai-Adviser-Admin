import { Label } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FC } from "react";

interface ListingInformationProps {
    title: string
    categories: string;
    setCategory?: (value: string) => void;
}

const ListingInformation: FC<ListingInformationProps> = ({ title,categories }) => {
    return (
        <>
            <Typography sx={{
                fontSize: '14px',
                textAlign: 'left',
                fontWeight: '600',
                fontFamily: (theme) => theme.fontFamily.poppins
            }}>
                {title}
            </Typography>
           
        </>
    )

}

export default ListingInformation;