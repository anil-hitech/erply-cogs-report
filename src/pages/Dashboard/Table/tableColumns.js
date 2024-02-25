import { handleNullValue, priceFormatter } from "./helpers";

// const numColWidth = "30%";
// const nameColWidth = "20%";

const columns = [
  // {
  //   dataField: "",
  //   caption: "SN",
  //   width: "auto",
  //   alignment: "left",
  //   calculateCellValue: (rowData, rowIndex) => console.log(rowIndex),
  // },
  {
    dataField: "name",
    caption: "Locations",
    width: "auto",
    alignment: "left",
  },
  {
    dataField: "soldQuantity",
    caption: "Sold Quantity",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
  {
    dataField: "salesWithGst",
    caption: "Sales total with GST",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },

  {
    dataField: "netSales",
    caption: "Net Sales total",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "costOfGoods",
    caption: "Cost of Goods",
    width: "auto",
    alignment: "center",
    calculateCellValue: (rowData) => handleNullValue(rowData.costOfGoods),
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "profit",
    caption: "Sales Profit",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },

  {
    dataField: "profitPer",
    caption: "Profit %",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => value.toLocaleString() + "%",
  },
  {
    dataField: "stock",
    caption: "Stock Quantity",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
  {
    dataField: "netStockValues",
    caption: "Stock Net Value",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
];

export const summaryRow = [
  "stockNetValues",
  "stock",
  "profit",
  "costOfGoods",
  "netSales",
  "gstTotal",
  "salesWithGst",
  "soldQuantity",
  "netStockValues",
];

export const excludedColumns = ["gstTotal", "discountTotal", "discountPercent"];

export default columns;

//some fields to rem:
//   calculateCellValue: (rowData) => handleNullValue(rowData.received),
// customizeText: (data) => data.value.toLocaleString(),
// flex:1,
// dataType: "number",
// format: {
//   type: "currency",
//   precision: 2,
// },
// cellTemplate: (cellElement, cellInfo) => {
//   cellElement.style.cursor = "pointer";
//   return { ...cellElement, cellInfo };
// },
