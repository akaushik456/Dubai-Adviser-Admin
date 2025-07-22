import { Box } from "@mui/material";
import AllListingComp from "../../components/common/AllListingComp";
import AddNewListingTabs from "../../components/AddNewListingTab/AddNewListingTabs";
import { useLocation } from "react-router-dom";

const AddNewListing = () => {
  const location = useLocation()
  const data = location.state
    return (
        <Box
            sx={{
                borderRadius: '4px', padding: '37px 37px 0 67px',
                backgroundColor: 'formbg.main', width: '100%', height: 'auto',
                marginTop: '0px',
                color: 'info.main',
                overflow: 'scroll'
            }}>
            <AllListingComp title={location.pathname === "/home/newlisting" ? "Add New Listing": "Edit Your Listing"} subtitle="The .table class adds basic styling (light padding and only horizontal dividers) to a table:" />
            <AddNewListingTabs editData={data?.listingToEdit ?? null}/>
        </Box>
    )
}
export default AddNewListing;