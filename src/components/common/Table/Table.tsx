import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import {
    useDeleteListingMutation,
} from "../../../services/mainApiSlice";
import { CircularProgress } from "@mui/material";
import snackBarUtil from "../../../utils/snackbar";
import { columns } from "./columns";
import { TableRowComp } from "./TableRowComp";


const CustomTableCell = styled(TableCell)({
    backgroundColor: "#18202d",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    fontFamily: "Poppins",
    textTransform: "capitalize",
    border: 0,
});

interface StickyHeadTableProps {
    searchData: any
    searchLoading: boolean
    allStatusData: any
    statusDataLoading: boolean
    limitOfData: number
    page: number
    setCheckedItems: React.Dispatch<React.SetStateAction<Record<string | number, boolean>>>
    setSelectedValues: React.Dispatch<React.SetStateAction<(string | number)[]>>
    checkedItems: Record<string | number, boolean>
    setAllStatusData: React.Dispatch<any>
}

export const StickyHeadTable: React.FC<StickyHeadTableProps> = ({ setAllStatusData, checkedItems, setSelectedValues, setCheckedItems, searchData, searchLoading, allStatusData, statusDataLoading, limitOfData, page }) => {
    const [deleteTrigger, { data: deleteData, isLoading: deleteLoading, error }] = useDeleteListingMutation();
    const isLoading = searchLoading || deleteLoading || statusDataLoading;
    const [editData, setEditData] = React.useState<any>(null);
    const handlerDeleteRow = async (currRowId: string | number) => {
        try {
            await deleteTrigger(currRowId).unwrap();
            setAllStatusData((prev: any) => prev.listing.filter((item: any) => item._id !== currRowId))
        } catch (error) {
            snackBarUtil.error(`${error || 'Something went wrong!'}`)
        }
        // deleteTrigger(currRowId);
    };

    React.useEffect(() => {
        if (deleteData?.success) {
            if (deleteData?.message) {
                snackBarUtil.success(deleteData?.message)
            }
        } else if (error) {
            if ('data' in error) {
                const errorMessage = (error.data as { message?: string })?.message || "No data found";
                snackBarUtil.error(errorMessage);
            } else {
                snackBarUtil.error("An unknown error occurred");
            }
        }
    }, [deleteData, error])

    return (
        <React.Suspense fallback={<CircularProgress sx={{ backgroundColor: 'info.main' }} />}>
            <Paper
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 0,
                    mt: 3,
                    boxShadow: "0",
                    backgroundColor: 'transparent'
                }}
            >
                <TableContainer sx={{ maxHeight: 560 }} className="mui-table-data">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "transparent" }}>
                                {columns.map((column) => (
                                    <CustomTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </CustomTableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody
                            sx={{
                                backgroundColor: "transparent",
                            }}
                        >
                            {(isLoading || searchLoading) &&
                                <TableRow>
                                    <TableCell
                                        colSpan={12}
                                        sx={{ backgroundColor: 'transparent', textAlign: 'center' }}
                                    >
                                        <CircularProgress sx={{ color: 'info.main' }} />
                                    </TableCell>
                                </TableRow>
                            }

                            {searchData?.data?.length > 0 ? searchData?.data?.map((listingData: any, idx: number, arr: any) => {

                                return(
                                <TableRowComp
                                 setEditData={setEditData}
                                 name={listingData?._id} 
                                 checkedItems={checkedItems} 
                                 setSelectedValues={setSelectedValues} 
                                 setCheckedItems={setCheckedItems} 
                                 key={idx} 
                                 arr={arr} 
                                 handlerDeleteRow={handlerDeleteRow} 
                                 idx={idx} 
                                 listingData={listingData} />
                            )}) : searchData?.data?.length < 0 ?
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        No data Found
                                    </TableCell>
                                </TableRow>
                                :
                                allStatusData?.listing
                                    ?
                                    allStatusData?.listing && allStatusData?.listing?.map((listingData: any, idx: number, arr: any) => {
                                        return (
                                            <TableRowComp setEditData={setEditData} name={listingData?._id} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setSelectedValues={setSelectedValues} key={idx} handlerDeleteRow={handlerDeleteRow} listingData={listingData} idx={idx} arr={arr} />
                                        )
                                    }) :
                                    <TableRow>
                                        <TableCell colSpan={12} sx={{ textAlign: 'center', fontWeight: '600', fontFamily: theme => theme.fontFamily.poppins, backgroundColor: 'info.main' }}>
                                            No data Found
                                        </TableCell>
                                    </TableRow>
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </React.Suspense>
    );
};
