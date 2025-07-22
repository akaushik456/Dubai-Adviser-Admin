import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {useLocation} from "react-router-dom"
import { StickyHeadTable } from "../components/common/Table/Table";
import AllListingComp from "../components/common/AllListingComp";
import PaginationComp from "../components/Pagination/PaginationComp";
import { useCategoryListsQuery } from "../services/mainApiSlice";

interface CategoryListProps {
  id: string;
}

const CategoryList: FC<CategoryListProps> = ({ id }) => {
  const [page, setPage] = useState<number>(1);
  const [limitOfData, setLimitOfData] = useState<number>(20);
  const [allStatusData, setAllStatusData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string | number, boolean>>({});
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);
  const someIntitalLimits = [20, 40, 60, 80, 100];
  const location = useLocation();
    const path = location.pathname.split("/").pop();
  const { data: dataCategoryList, isLoading } = useCategoryListsQuery({ id, page, limit: limitOfData });

  useEffect(() => {
    if (dataCategoryList) {
      setAllStatusData(dataCategoryList.data || []);
      // const totalCount = dataCategoryList.totalCount || 0;
      setTotalPages(Math.ceil(dataCategoryList?.totalData / limitOfData) || dataCategoryList?.data?.totalPage)
    }
  }, [dataCategoryList, limitOfData,page]);

  const handleSelectedPage = (selectedPage: number) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };
    const handlerLimitToShowOfData = (e: any) => {
        setLimitOfData(e.target.value)
    }

      const categoryMap: Record<string, string> = {
    Restaurants: "Restaurants",
    TopActivities: "Top Activities",
    DubaiDesert: "Dubai Desert Safari",
  };

  const categoryName = categoryMap[path || ""] || "Listing";
  
  return (
    <>
      <Box
        sx={{
          borderRadius: "4px",
          padding: "37px 37px 0 67px",
          backgroundColor: "formbg.main",
          width: "100%",
          height: "auto",
          marginTop: "0px",
          color: "info.main",
        }}
      >
        <AllListingComp
          title={`All ${categoryName}`}
          subtitle={`All ${categoryName}`}
        /> 

        <StickyHeadTable
          setAllStatusData={setAllStatusData}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          setSelectedValues={setSelectedValues}
          page={page}
          limitOfData={limitOfData}
          statusDataLoading={isLoading}
          allStatusData={allStatusData}
          searchData={searchData}
          searchLoading={false}
        />
      </Box>
        
      <PaginationComp
        selectedValues={selectedValues}
        totalPages={totalPages}
        handleSelectedPage={handleSelectedPage}
        allStatusData={allStatusData}
        page={page}
        handlerLimitToShowOfData={handlerLimitToShowOfData}
        someIntitalLimits={someIntitalLimits}
        limitOfData={limitOfData}
      />
    </>
  );
};

export default CategoryList;
