import { IconButton } from "@mui/material";
// import { Button } from "@mui/material";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { useAppContext } from "../../context/AppContext";
// import * as htmlToImage from "html-to-image";
import ReactToPrint from "react-to-print";
import { PictureAsPdf } from "@mui/icons-material";

const ExportPDF = () => {
  const { chartRef } = useAppContext();

  // const handleDownload = () => {
  //   // htmlToImage
  //   //   .toPng(boxRef.current)
  //   //   .then(async function (dataUrl) {
  //   //     const doc = new jsPDF({
  //   //       compress: false,
  //   //       orientation: "portrait",
  //   //       unit: "px",
  //   //     });
  //   //     await doc.addImage(dataUrl, "PNG", 0, 0, 500, 500);
  //   //     doc.save("erplyChart.pdf");
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.error("oops, something went wrong!", error);
  //   //   });

  //   html2canvas(chartRef.current)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF();
  //       const imgWidth = 210;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //       pdf.save("erplyChart.pdf");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <>
      {/* <Button
        variant="contained"
        onClick={handleDownload}
        sx={{
          backgroundColor: "YellowGreen",
          fontWeight: "bold",
          ":hover": {
            backgroundColor: "SeaGreen",
          },
        }}
      >
        PDF
      </Button> */}
      <ReactToPrint
        bodyClass="print-agreement cogsTable"
        content={() => chartRef.current}
        documentTitle={`cost_of_goods_${new Date().getTime()}`}
        trigger={() => (
          // <Button
          //   variant="outlined"
          //   onClick={handleDownload}
          //   sx={{
          //     color: "white",
          //     backgroundColor: "YellowGreen",
          //     fontWeight: "bold",
          //     ":hover": {
          //       backgroundColor: "SeaGreen",
          //     },
          //   }}
          // >
          //   PDF
          // </Button>
          <IconButton
            aria-label="Example"
            sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "5px" }}
            size="small"
          >
            <PictureAsPdf />
          </IconButton>
        )}
      />
    </>
  );
};

export default ExportPDF;
