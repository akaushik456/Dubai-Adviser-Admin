import { IconButton, TableCell, TableRow, CircularProgress } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { CustomizedCheckbox } from "../Checkbox/Checkbox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useNavigate } from "react-router-dom";
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@mui/material';
import { FaRegStar } from "react-icons/fa";
import eyeimg from "/Eye-Icon.svg";
import editimg from "/Edit.svg";
import deleteimg from "/Delet.svg";

interface TableRowCompProps {
    listingData?: any;
    idx?: number;
    arr?: any;
    handlerDeleteRow: (currRowId: string | number) => void;
    setSelectedValues: React.Dispatch<React.SetStateAction<(string | number)[]>>
    setCheckedItems: React.Dispatch<React.SetStateAction<Record<string | number, boolean>>>
    checkedItems: Record<string | number, boolean>
    name?: any;
    description?:string;
    setEditData: (data: any) => void;
}

export const tableCell = {
    color: "info.main",
    border: "none",
};

export const TableRowComp: FC<TableRowCompProps> = ({ name, checkedItems, listingData, arr, idx, handlerDeleteRow,setEditData , setSelectedValues, setCheckedItems }) => {
    const rowRef = useRef<HTMLTableRowElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setCheckedItems((prev) => ({
            ...prev,
            [name]: checked,
        }));

        setSelectedValues((prevValues) =>
            checked ? [...prevValues, name] : prevValues.filter((item: any) => item !== name)
        );
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasLoaded(true);
                }
            },
            { threshold: 0.1, rootMargin: "100px" }
        );

        if (rowRef.current) observer.observe(rowRef.current);

        return () => {
            if (rowRef.current) observer.unobserve(rowRef.current);
        };
    }, []);

        const navigate = useNavigate();
        const handleEdit = (rowData: any) => {
        navigate("/home/editlisting", { state: { listingToEdit: rowData } });
        }; 

    return (
        <TableRow ref={rowRef} key={listingData?._id} sx={{ backgroundColor: "formbg.main", boxShadow: "none" }}>

            {/* {!isVisible && !hasLoaded ? (
                <TableCell colSpan={11} sx={{ textAlign: "center", padding: "20px", borderBottom: "none" }}>
                    <CircularProgress size={20} sx={{ color: 'info.main' }} />
                </TableCell>
            ) : ( */}
            <>
                <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    <CustomizedCheckbox name={name} handleChange={handleCheckboxChange} checked={checkedItems[listingData?._id!]} />
                </TableCell>
                <TableCell sx={{ ...tableCell, borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    {listingData?.listing_name}
                </TableCell>

                {listingData?.contact_info?.map((contact: any) => (
                    <TableCell key={contact?._id} sx={{ ...tableCell, borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                        {contact?.number}
                    </TableCell>
                ))}
                {listingData?.contact_info?.map((email: any) => (
                    <TableCell key={email?._id} sx={{ ...tableCell, borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                        {email?.email}
                    </TableCell>
                ))}

               <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    {listingData?.listing_name ? (
                        <Check sx={{ color: '#fff' }} />
                    ) : (
                        <CloseIcon sx={{ color: '#fff' }} />
                    )}
                    </TableCell>

                    <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    {listingData?.description ? (
                        <Check sx={{ color: '#fff' }} />
                    ) : (
                         <CloseIcon sx={{ color: '#fff' }} />
                    )}
                    </TableCell>

                    <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    {listingData?.meta_keyword ? (
                        <Check sx={{ color: '#fff' }} />
                    ) : (
                         <CloseIcon sx={{ color: '#fff' }} />
                    )}
                    </TableCell>

                <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    {listingData?.category_id?.name}
                </TableCell>
                <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    {[1, 2, 3, 4].map((data, idx) => (
                        <FaRegStar key={data + idx} />
                    ))}
                </TableCell>
                <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    <IconButton disableFocusRipple disableTouchRipple disableRipple aria-label="view" sx={{ backgroundColor: "primary.main", height: "28px", width: "30px", borderRadius: 1 }}>
                        <img src={eyeimg} alt="Eye" />
                    </IconButton>
                </TableCell>
               <TableCell
                    sx={{
                        ...tableCell,
                        textAlign: "center",
                        borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5"
                    }}
                    >
                    <IconButton
                        onClick={() =>  handleEdit(listingData)}    
                        disableFocusRipple
                        disableTouchRipple
                        disableRipple
                        aria-label="edit"
                        sx={{
                        backgroundColor: "primary.main",
                        borderRadius: 1,
                        height: "28px",
                        width: "30px"
                        }}
                    >
                        <img src={editimg} alt={"Edit"} />
                    </IconButton>
                    </TableCell>

                <TableCell sx={{ ...tableCell, textAlign: "center", borderBottom: idx === arr?.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                    <IconButton onClick={() => handlerDeleteRow(listingData?._id)} disableFocusRipple disableTouchRipple disableRipple aria-label="delete" sx={{ backgroundColor: "primary.main", height: "28px", width: "30px", borderRadius: 1 }}>
                        <img src={deleteimg} alt="Delete" />
                    </IconButton>
                </TableCell>
            </>
        </TableRow>
    );
};
