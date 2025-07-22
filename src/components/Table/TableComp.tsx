import React, { FC, useEffect, useState } from "react";
import { AllSalesHistoryComp } from "../AllSalesHistory/AllSalesHistoryComp";
import { StickyHeadTable } from "../common/Table/Table";
import { useGetDataBySearchListingQuery, useGetDataByStatusMutation } from "../../services/mainApiSlice";
import snackBarUtil from "../../utils/snackbar";
import { Box } from "@mui/material";
import AllListingComp from "../common/AllListingComp";
import PaginationComp from "../Pagination/PaginationComp";

interface TableCompProps { }

export const TableComp: FC<TableCompProps> = ({ }) => {
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [searchData, setSearchData] = useState<any[]>([])
    const { data: search_Data, isLoading: searchLoading, isFetching: searchFetching, error: searchDataError } =
        useGetDataBySearchListingQuery(debouncedSearch, { skip: !debouncedSearch });
    const [status, setStatus] = useState<string>('all');
    const [statusQueryTrigger, { data: everyStatusData, isLoading: statusDataLoading, error }] = useGetDataByStatusMutation()
    const handleChangeStatus = (currvalue: string) => {
        setStatus(currvalue)
    }
    const [allStatusData, setAllStatusData] = useState<any>([]);
    const someIntitalLimits = [20, 48, 60, 80, 100];
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState(0);
    const [limitOfData, setLimitOfData] = useState<number>(20)
    const [checkedItems, setCheckedItems] = useState<Record<string | number, boolean>>({});
    const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);
    const handlerLimitToShowOfData = (e: any) => {
        setLimitOfData(e.target.value)
    }
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        if (status) {
            statusQueryTrigger({ status: status, Page: page, perPage: limitOfData })
        }
    }, [status, limitOfData, page])

    useEffect(() => {
        if (search_Data) {
            setSearchData(search_Data as any);
        }
    }, [search_Data]);

    useEffect(() => {
        if (error && "status" in error) {
            if (error && error?.status == 400) {
                const errorMessage =
                    (error.data as { message?: string })?.message || "No matching data found.";
                snackBarUtil.error(errorMessage);
            }
        }
    }, [error])

    useEffect(() => {
        if (everyStatusData) {
            setAllStatusData(everyStatusData?.data)
            setTotalPages(Math.ceil(everyStatusData?.data?.totalData / limitOfData) || everyStatusData?.data?.totalPage)
        }
    }, [everyStatusData])

    const handleSelectedPage = (selectedPage: any) => {

        if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
            setPage(selectedPage)
        }
    }

    return (
        <React.Fragment>
            <React.Fragment>
                <Box
                    sx={{
                        borderRadius: '4px', padding: '37px 37px 0 67px',
                        backgroundColor: 'formbg.main',
                        width: '100%', height: 'auto',
                        marginTop: '0px',
                        color: 'info.main',
                    }}
                >
                    <AllListingComp title={'Listing All'} subtitle='Restaurant & Hotels The Right Way To List .' />
                    <AllSalesHistoryComp searchDataError={searchDataError} handleChangeStatus={handleChangeStatus} search={search} setSearch={setSearch} setSearchData={setSearchData} />
                    <StickyHeadTable setAllStatusData={setAllStatusData} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setSelectedValues={setSelectedValues} page={page} limitOfData={limitOfData} statusDataLoading={statusDataLoading} allStatusData={allStatusData} searchData={searchData} searchLoading={searchLoading} />
                </Box>
            </React.Fragment>
            <PaginationComp selectedValues={selectedValues} totalPages={totalPages} handleSelectedPage={handleSelectedPage} allStatusData={allStatusData} page={page} handlerLimitToShowOfData={handlerLimitToShowOfData} someIntitalLimits={someIntitalLimits} limitOfData={limitOfData} />
        </React.Fragment>
    );
};
