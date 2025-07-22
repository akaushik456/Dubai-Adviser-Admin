import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

// function handleClick(event) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

interface BreadCrumbProps {
    currentPath: string
}

const BreadCrumb:React.FC<BreadCrumbProps> = ({currentPath })=> {
    const nav = useNavigate()
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" sx={{
                margin: '20px 0px 20px 20px',
                '& .MuiBreadcrumbs-separator': {
                    color: '#fff'
                }
            }}>
                <Link onClick={()=>nav('/home')} underline="hover" color="inherit" href="#" sx={{ fontSize: '14px', color: 'info.main', fontWeight: '600' }}>
                    Home
                </Link>

                <Link
                    sx={{
                        fontSize: '14px',
                        color: 'info.main',
                        cursor: 'default',
                        fontWeight: '600',
                        ":hover": {
                            textDecoration: 'none'
                        }
                    }}
                    color="text.primary"
                    aria-current="page"
                >
                    {currentPath}
                </Link>
            </Breadcrumbs>
        </div>
    );
}

export default BreadCrumb;