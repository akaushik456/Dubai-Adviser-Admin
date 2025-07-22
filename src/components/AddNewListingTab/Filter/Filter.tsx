import React, { useEffect, useState } from "react";
import { Box, Chip, Typography, Collapse, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  restaurantFilters,
  dubaiAdventureFilters,
  thingsToDoFilters,
} from "../../../constant/filtersConstant";
import {
  DESERT_SAFARI_CATEGORY_ID,
  RESTAURANTS_CATEGORY_ID,
  TOP_ACTIVITY_CATEGORY_ID,
} from "../../../constant/constant";
import { CustomButtonCompTwo } from "../../common/Button";

interface FilterProps {
  categories: string;
  selectedByCategory: Record<string, Record<string, string[]>>;
  setSelectedByCategory: React.Dispatch<
    React.SetStateAction<Record<string, Record<string, string[]>>>
  >;
  onNext: (convertedFilters?: Record<string, Record<string, string[]>>) => void;
  onBack: () => void;
}

function Filter({
  onNext,
  onBack,
  selectedByCategory,
  setSelectedByCategory,
  categories = RESTAURANTS_CATEGORY_ID,
}: FilterProps) {
  const [expandedByCategory, setExpandedByCategory] = useState<
    Record<string, Record<string, boolean>>
  >({});

  console.log(selectedByCategory,"check")

  const categoryIdToName: Record<string, string> = {
    [RESTAURANTS_CATEGORY_ID]: "Restaurant",
    [DESERT_SAFARI_CATEGORY_ID]: "Desert Safari",
    [TOP_ACTIVITY_CATEGORY_ID]: "Top Activity",
  };

  const handleSelect = (group: string, filters: string) => {
    setSelectedByCategory((prev) => {
      const current = prev[categories] || {};
      const prevGroup = current[group] || [];
      if (prevGroup.includes(filters)) return prev;
      return {
        ...prev,
        [categories]: {
          ...current,
          [group]: [...prevGroup, filters],
        },
      };
    });
  };

  const handleDelete = (group: string, filters: string) => {
    setSelectedByCategory((prev) => ({
      ...prev,
      [categories]: {
        ...prev[categories],
        [group]: prev[categories][group].filter((f) => f !== filters),
      },
    }));
  };

  const toggleGroup = (group: string) => {
    setExpandedByCategory((prev) => ({
      ...prev,
      [categories]: {
        ...prev[categories],
        [group]: !prev[categories]?.[group],
      },
    }));
  };

  const propsNext = {
    height: "46px",
    width: "150px",
    borderRadius: "3px",
    color: "#000000",
    backgroundColor: "#34BE66",
    fontFamily: "poppins",
    fontweight: "600",
    fontSize: "20px",
  };
  const propsBack = {
    height: "46px",
    width: "150px",
    borderRadius: "3px",
    backgroundColor: "#7A4F97",
    color: "#B2B2B2",
    fontFamily: "poppins",
    fontweight: "600",
    fontSize: "20px",
  };

  const filtersData = (category: string): Record<string, string[]> => {
    if (category === RESTAURANTS_CATEGORY_ID) return restaurantFilters;
    if (category === TOP_ACTIVITY_CATEGORY_ID) return dubaiAdventureFilters;
    if (category === DESERT_SAFARI_CATEGORY_ID) return thingsToDoFilters;
    return {};
  };

  const filters = filtersData(categories);

  useEffect(() => {
    const groups = Object.keys(filters);
    const firstGroup = groups[0];

    setSelectedByCategory((prev) => ({
      ...prev,
      [categories]: prev[categories] || {},
    }));

    setExpandedByCategory((prev) => ({
      ...prev,
      [categories]:
        prev[categories] ||
        Object.fromEntries(groups.map((g) => [g, g === firstGroup])),
    }));
  }, [categories]);

  const selectedFilters = selectedByCategory[categories] || {};
  const expandedGroups = expandedByCategory[categories] || {};

  const convertFiltersToNamedCategories = (
    filters: Record<string, Record<string, string[]>>
  ) => {
    const namedFilters: Record<string, Record<string, string[]>> = {};
    Object.entries(filters).forEach(([categoryId, groupFilters]) => {
      const categoryName = categoryIdToName[categoryId];
      if (categoryName && Object.keys(groupFilters).length > 0) {
        namedFilters[categoryName] = groupFilters;
      }
    });
    return namedFilters;
  };

  const handleNext = () => {
    const converted = convertFiltersToNamedCategories(selectedByCategory);
    onNext(converted);
  };

  return (
    <Box sx={{ p: 2 }}>
      {Object.entries(filters).map(([group, groupFilters]) => {
        const selectedInGroup = selectedFilters[group] || [];
        const isExpanded = expandedGroups[group];

        return (
          <Box key={group} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "c0enter",
                cursor: "pointer",
                width: "20%",
              }}
              onClick={() => toggleGroup(group)}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1 }}>
                {group}
              </Typography>
              <IconButton size="small" sx={{ color: "#fff" }}>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            {selectedInGroup.length > 0 && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1, mb: 1 }}>
                {selectedInGroup.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    onDelete={() => handleDelete(group, filter)}
                    color="primary"
                  />
                ))}
              </Box>
            )}

            <Collapse in={isExpanded}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                {groupFilters.map((filter: string) => (
                  <Chip
                    key={filter}
                    label={filter}
                    clickable
                    onClick={() => handleSelect(group, filter)}
                    disabled={selectedInGroup.includes(filter)}
                    variant={selectedInGroup.includes(filter) ? "filled" : "outlined"}
                    sx={{ color: "#fff" }}
                  />
                ))}
              </Box>
            </Collapse>
          </Box>
        );
      })}

      <Box
        sx={{
          my: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <CustomButtonCompTwo props={propsNext} title="next" onClick={handleNext} />
        <CustomButtonCompTwo props={propsBack} title="back" onClick={onBack} />
      </Box>
    </Box>
  );
}

export default Filter;
