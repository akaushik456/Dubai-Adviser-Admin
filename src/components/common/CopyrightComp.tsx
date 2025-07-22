import React from 'react'
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface CopyrightComp {
  props?:any
  collapsed?:boolean
}
export const CopyrightComp:React.FC<CopyrightComp> = ({ props,collapsed }) => {
  const currentDate = new Date();
  const [currentyear, setCurrentYear] = useState<number>();

  useEffect(() => {
    setCurrentYear(currentDate.getFullYear());
  }, [currentDate.getFullYear()]);

  return (
    <Box
      sx={{
        position: { ...props },
        textAlign: "center",
        bottom: 16,
        width: "100%",
      }}
    >
      <Typography
        sx={{ fontSize: "1rem", fontWeight: "700", color: "info.main", fontFamily:'Inter' }}
        variant="caption"
        component={"p"}
      >
        © {currentyear} {!collapsed && "Listing, All Rights Reserved."}
      </Typography>
    </Box>
  );
};
