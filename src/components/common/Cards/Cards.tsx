import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { bottomlisting, sidebarlisting } from '../../sideBarListing';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomeCardComp = () => {
    const nav = useNavigate()
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: '100%'
            }}>

                {/* {sidebarlisting?.map((listing) => (
                    <Box
                        key={listing?.list}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 1

                        }}>
                        {listing?.subcategory?.map((sub) => (
                            <Card sx={{ maxWidth: 345, backgroundColor: 'formbg.main', }} key={sub.list + 1} >
                                <CardActionArea onClick={() => nav(`${sub.pathname}`)}>
                                    <CardContent sx={{
                                        fontSize: '1rem', textTransform: 'capitalize',
                                    }}>
                                        <Typography variant="body1" sx={{
                                            color: 'info.main',
                                            fontWeight: '600'
                                        }}>
                                            {sub?.list}
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}


                    </Box >
                ))} */}

                        {bottomlisting
                        .filter((item) =>
                            ["Restaurants", "Top Activities", "Dubai Desert"].includes(item.list)
                        )
                        .map((listing) => (
                            <Box
                            key={listing?.list}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: 1,
                            }}
                            >
                            <Card sx={{ backgroundColor: "formbg.main" }}>
                                <CardActionArea onClick={() => nav(listing.pathname)}>
                                <CardContent
                                    sx={{
                                    fontSize: "1rem",
                                    textTransform: "capitalize",
                                    }}
                                >
                                    <Typography
                                    variant="body1"
                                    sx={{
                                        color: "info.main",
                                        fontWeight: "600",
                                    }}
                                    >
                                    {listing.list}
                                    </Typography>
                                </CardContent>
                                </CardActionArea>
                            </Card>
                            </Box>
                        ))}

            </Box>
        </>
    );
}
