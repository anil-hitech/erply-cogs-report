import { useState } from "react";
import { Box } from "@mui/material";

// import { data } from "./data";
import Table from "./Table";
import { useAppContext } from "../../context/AppContext";
import LoadPanel from "devextreme-react/load-panel";

const Dashboard = () => {
  const {
    data: { isLoading },
    chartRef,
  } = useAppContext();

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        visible={isLoading}
        showIndicator={true}
        shading={true}
      />

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"15px"}
        alignItems={"center"}
        ref={chartRef}
        padding={"30px"}
        paddingTop={"10px"}
      >
        <Table />
      </Box>
    </Box>
  );
};

export default Dashboard;
