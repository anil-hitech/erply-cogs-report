import { Button } from "@mui/material";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAppContext } from "../../context/AppContext";
// import * as htmlToImage from "html-to-image";
import ReactToPrint from "react-to-print";

const ExportPDF = () => {
  const { chartRef } = useAppContext();

  const handleDownload = () => {
    // htmlToImage
    //   .toPng(boxRef.current)
    //   .then(async function (dataUrl) {
    //     const doc = new jsPDF({
    //       compress: false,
    //       orientation: "portrait",
    //       unit: "px",
    //     });
    //     await doc.addImage(dataUrl, "PNG", 0, 0, 500, 500);
    //     doc.save("erplyChart.pdf");
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });

    html2canvas(chartRef.current)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("erplyChart.pdf");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        bodyClass="print-agreement"
        content={() => chartRef.current}
        documentTitle="chart_erply"
        trigger={() => (
          <Button
            variant="outlined"
            onClick={handleDownload}
            sx={{
              color: "white",
              backgroundColor: "YellowGreen",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: "SeaGreen",
              },
            }}
          >
            PDF
          </Button>
        )}
      />
    </>
  );
};

export default ExportPDF;
