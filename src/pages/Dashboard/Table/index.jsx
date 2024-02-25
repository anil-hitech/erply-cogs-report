import { DataGrid } from "devextreme-react";
import tableColumns, { excludedColumns, summaryRow } from "./tableColumns";
import "devextreme/dist/css/dx.light.css";
import {
  FilterRow,
  Scrolling,
  Selection,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import ExcelJS from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import saveAs from "file-saver";

import { priceFormatter } from "./helpers";
// import { data } from "../data";
import { useAppContext } from "../../../context/AppContext";
import { useRef } from "react";

//used to define the columns with currancy format so as to display in summary
const columnsWithCurrency = [
  "stockNetValues",
  "profit",
  "costOfGoods",
  "netSales",
  "gstTotal",
  "salesWithGst",
  "netStockValues",
];

const Table = () => {
  const dataGridRef = useRef();
  const {
    data: { salesData },
  } = useAppContext();

  let columns = [];

  columns = tableColumns.filter(
    (col) => !excludedColumns.includes(col.dataField) //removing unnecessary columns for lineItem type
  );

  const exportGridData = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Cost_of_Goods");

    exportDataGrid({
      component: dataGridRef.current.instance,
      worksheet: worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `Cost_of_goods_${new Date().getTime()}.xlsx`
        );
      });
    });
  };

  // const customizeColumns = (columns) => {
  //   // Add a new column for serial numbers
  //   const serialNumberColumn = {
  //     caption: "SN",
  //     calculateCellValue: (rowData, rowIndex) => console.log(rowIndex),
  //     width: 50, // Adjust width as needed
  //   };

  //   // Insert the new column as the first column
  //   columns.unshift(serialNumberColumn);

  //   return columns;
  // };

  return (
    <div className="cogsTable">
      <DataGrid
        ref={dataGridRef}
        width={"100%"}
        // height={"500px"}
        // className="cogsTable"
        export={{ enabled: true }}
        onExporting={exportGridData}
        dataSource={salesData || []}
        showBorders={true}
        // customizeColumns={customizeColumns}
        columns={columns}
        allowColumnResizing={true}
        rowAlternationEnabled={true}
        paging={{ pageSize: 25 }}
      >
        {/* {columns.map((column, index) => (
          <Column  key={index} {...column} />
        ))} */}
        <FilterRow visible={true} />
        <Scrolling />
        <Selection mode="" />

        <Summary>
          {summaryRow.map((col, index) => (
            <TotalItem
              key={index}
              column={col}
              summaryType="sum"
              displayFormat={(value) =>
                columnsWithCurrency.includes(col)
                  ? priceFormatter(value)
                  : Number(value).toLocaleString()
              } // Optional formatting
            />
          ))}

          <TotalItem
            key={""}
            column={"profitPer"}
            summaryType="avg"
            displayFormat={(value) => Number(value).toLocaleString() + "%"}
          />
        </Summary>
      </DataGrid>
    </div>
  );
};

export default Table;
