/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";

import {
  Box,
  Button,
  // FormControl,
  // FormLabel,
  // InputLabel,
  // MenuItem,
} from "@mui/material";
import { DateBox } from "devextreme-react";
import Select from "react-select";

import { useAppContext } from "../../context/AppContext";
import formatDate from "../../utilities/formatDate";
// import ExportPDF from "../ExportPDF";

const FilterSection = () => {
  const {
    locations,
    filters: { filters, setFilters, initialFilters },
  } = useAppContext();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilter = useCallback(() => {
    setFilters(localFilters);
  }, [localFilters]);

  const keys = Object.keys(locations);
  const options = keys.map((key) => ({
    label: key,
    options: locations[key].map((loc) => ({ value: loc.id, label: loc.name })),
  }));

  const handleGroupClick = (props) => {
    //check if all items of the group is selected
    const isAllSelected = props.options.every((obj1) => {
      if (localFilters.locationID.length !== 0)
        return localFilters.locationID?.some(
          (obj2) => obj2.value === obj1.value
        );
      else return false;
    });

    if (isAllSelected) {
      //if all are selected remove the group from the selected list
      const filteredArrayB = localFilters.locationID.filter(
        (objB) => !props.options.some((objA) => objA.value === objB.value)
      );
      setLocalFilters((prev) => ({ ...prev, locationID: filteredArrayB }));
    } else {
      //making the selected arrays unique
      const uniqueArray = [...localFilters.locationID, ...props.options].filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.value === obj.value)
      );
      setLocalFilters((prev) => ({ ...prev, locationID: uniqueArray }));
    }
  };

  // useEffect(() => console.log("lcFilter", localFilters), [localFilters]);

  return (
    <Box
      // position={"absolute"}
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"20px"}
      alignSelf={"center"}
      flexWrap={"wrap"}
      py="10px"
    >
      <Select
        id="location"
        isMulti
        // menuIsOpen
        closeMenuOnSelect={false}
        placeholder="Select Locations..."
        value={localFilters.locationID}
        options={options}
        hideSelectedOptions={false}
        onChange={(value) => {
          setLocalFilters((prev) => ({
            ...prev,
            locationID: value.map((item) => item),
          }));
        }}
        styles={{
          control: (baseStyles) => {
            return {
              ...baseStyles,

              width: 500,
              wordWrap: "break-word",
            };
          },

          menuList: (baseStyles) => {
            return {
              ...baseStyles,
              maxHeight: "500px",
            };
          },

          option: (baseStyles, state) => ({
            ...baseStyles,
            color: "black",
            backgroundColor: state.isSelected ? "#e3e9ff" : "white",
            cursor: "pointer",
            ":hover": {
              backgroundColor: state.isSelected ? "#e3e9ff" : "#efefef",
            },
          }),

          groupHeading: (baseStyles) => ({
            ...baseStyles,
            // backgroundColor: "#bdcaff",
            padding: "0",
            fontSize: "larger",
            textAlign: "center",
            color: "black",
            cursor: "pointer",
            // borderTop: "1px solid black",
            // borderBottom: "3px solid  silver",
            marginBottom: 0,
            // ":hover": { backgroundColor: "PaleTurquoise" },
            // textDecoration: "underline",
          }),

          multiValue: (baseStyles) => ({
            ...baseStyles,
            flex: "1 0 auto",
            backgroundColor: "white",
            border: "1px solid silver",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }),

          multiValueRemove: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "salmon",
            margin: "2px",
            cursor: "pointer",
          }),

          valueContainer: (baseStyles) => ({
            ...baseStyles,
            overflowX: "auto",
            flexWrap: "nowrap",
            scrollbarWidth: 0,
          }),
        }}
        formatGroupLabel={(props) => (
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleGroupClick(props)}
            sx={{ borderRadius: "0", fontWeight: "bold", fontSize: "large" }}
          >
            {props.label}
          </Button>
        )}
      />

      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <label style={{ width: "50px", color: "black", opacity: 0.7 }}>
          From :
        </label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={
            localFilters.fromDate !== ""
              ? new Date(localFilters.fromDate)
              : null
          }
          onValueChange={(value) => {
            setLocalFilters((prev) => ({
              ...prev,
              fromDate: formatDate(value),
            }));
          }}
          type="date"
          displayFormat="dd/MM/yyyy"
        />
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <label style={{ width: "50px", color: "black", opacity: 0.7 }}>
          To :
        </label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={
            localFilters.toDate !== "" ? new Date(localFilters.toDate) : null
          }
          onValueChange={(value) => {
            setLocalFilters((prev) => ({
              ...prev,
              toDate: formatDate(value),
            }));
          }}
          type="date"
          displayFormat="dd/MM/yyyy"
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
        <Button
          variant="contained"
          sx={{ width: "120px" }}
          onClick={handleFilter}
        >
          Filter
        </Button>

        <Button
          variant="contained"
          color="warning"
          sx={{ width: "120px" }}
          onClick={() => {
            setLocalFilters(initialFilters);
            setFilters(initialFilters);
          }}
        >
          Reset
        </Button>

        {/* <ExportPDF /> */}
      </Box>
    </Box>
  );
};

export default FilterSection;
