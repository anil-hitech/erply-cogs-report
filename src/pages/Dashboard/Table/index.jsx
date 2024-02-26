import { DataGrid } from "devextreme-react";
import tableColumns, { excludedColumns, summaryRow } from "./tableColumns";
import "devextreme/dist/css/dx.light.css";
import {
  FilterRow,
  Scrolling,
  Summary,
  TotalItem,
  // Toolbar,
  // ToolbarItem,
} from "devextreme-react/data-grid";
import ExcelJS from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import saveAs from "file-saver";

import { priceFormatter } from "./helpers";
// import { data } from "../data";
import { useAppContext } from "../../../context/AppContext";
import { useRef } from "react";

import ExportPDF from "../../../components/ExportPDF";

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

  return (
    <div className="cogsTable">
      <DataGrid
        // toolbar={{
        //   visible: true,
        //   disabled: false,
        //   items: [
        //     "exportButton",
        //     // "searchPanel",
        //     // {
        //     //   // location: "before",
        //     //   widget: "dxAutocomplete",
        //     //   options: { icon: "refresh" },
        //     // },
        //   ],
        // }}
        ref={dataGridRef}
        width={"100%"}
        // height={"500px"}
        // className="cogsTable"
        export={{ enabled: true }}
        // searchPanel={{ visible: true }}
        onExporting={exportGridData}
        dataSource={salesData || []}
        showBorders={true}
        columns={columns}
        allowColumnResizing={true}
        rowAlternationEnabled={true}
        paging={{ pageSize: 25 }}
      >
        <ExportPDF />

        <FilterRow visible={true} />
        <Scrolling />

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
