import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReportViewer } from "realreport";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";
import { VscFilePdf } from "react-icons/vsc";

const Viewer = () => {
  const reportRef = useRef(null);
  const location = useLocation();

  const [report, setReport] = useState(null);
  const [dataSet, setDataSet] = useState([]);

  const [viewer, setViewer] = useState(null);

  const getJson = async () => {
    const json = await (await fetch(`/report/ar/AR9001-1.json`)).json();

    const iterator = new URLSearchParams(
      location.search.split("?")[1]
    ).entries();

    const arr = iterator.next().value[0];

    setDataSet(JSON.parse(arr));
    setReport(json);
  };

  useEffect(() => {
    getJson();
    return () => {
      setViewer(null);
    };
  }, []);

  useEffect(() => {
    const viewer = new ReportViewer(reportRef.current);
    setViewer(viewer);

    const pageCallback = (ctx, page, pageNo) => {
      // console.log(`${pageNo} 페이지 미리보기 완료`);
    };

    const endCallback = (ctx, pages) => {
      // console.log("모든 페이지 미리보기 완료");
    };

    if (viewer && report) {
      viewer.reportForm = report;
      viewer.dataSet = {
        tableInfo: {
          values: dataSet,
        },
        headerInfo: {
          values: {
            swCode: "99 전체",
            jpCode: "99 전체",
            date: "2023-06-01 ~ 2023-06-02",
            cuJyCode: "99 전체",
          },
        },
      };
      viewer.preview({
        async: true,
        pageMark: false,
        noScroll: true,
        callback: pageCallback,
        endCallback,
      });
    }
  }, [report]);

  const onClickPrevPage = function () {
    if (viewer) {
      viewer.prev();
    }
  };

  const onClickNextPage = function () {
    if (viewer) {
      viewer.next();
    }
  };

  const onClickFirstPage = function () {
    if (viewer) {
      viewer.first();
    }
  };

  const onClickLastPage = function () {
    if (viewer) {
      viewer.last();
    }
  };

  const onClickPrintHiddenFrame = function () {
    if (viewer) {
      function closePrint() {
        document.body.removeChild(this.__container__);
      }

      function setPrint() {
        this.contentWindow.__container__ = this;
        this.contentWindow.onbeforeunload = closePrint;
        this.contentWindow.onafterprint = closePrint;
        const dom = this.contentWindow.document.getElementById("realreport");
        if (viewer) dom.innerHTML = viewer.reportHtml;

        setTimeout(() => {
          this.contentWindow.focus(); // Required for IE
          this.contentWindow.print();
        }, 1);
      }

      function printPage(sURL) {
        var oHideFrame = document.createElement("iframe");
        oHideFrame.onload = setPrint;
        oHideFrame.style.position = "";
        oHideFrame.style.right = "0";
        oHideFrame.style.bottom = "0";
        oHideFrame.style.width = "0";
        oHideFrame.style.height = "0";
        oHideFrame.style.border = "0";
        oHideFrame.src = sURL;
        document.body.appendChild(oHideFrame);
      }

      printPage("./print.html");
    }
  };

  async function base64convert(url, split) {
    const data = await fetch(url);
    const blob = await data.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(split ? base64data.split(",")[1] : base64data);
      };
    });
  }

  const onClickExportPdf = async function () {
    base64convert("/js/pdffonts/NanumGothic.otf", true).then((regularFont) => {
      base64convert("/js/pdffonts/NanumGothicBold.otf", true).then(
        (boldFont) => {
          const fonts = [
            {
              name: "regular",
              content: regularFont,
              style: "normal",
              weight: "normal",
            },
            {
              name: "bold",
              content: boldFont,
              style: "normal",
              weight: "bold",
            },
          ];
          console.log(viewer);
          if (viewer) {
            viewer.exportPdf({
              fonts,
              filename: "sample-pdf-filename.pdf",
              preview: false,
            });
          }
        }
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          height: "55px",
          width: "100%",
          backgroundColor: "#fbfbfb",
          border: "1px solid rgb(231, 231, 231)",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "0 15px",
          }}
        >
          <div
            style={{ fontSize: "24px", color: "#2b2b2b" }}
            onClick={onClickFirstPage}
          >
            <HiChevronDoubleLeft />
          </div>
          <div
            style={{ fontSize: "24px", color: "#2b2b2b" }}
            onClick={onClickPrevPage}
          >
            <HiChevronLeft />
          </div>

          <div
            style={{ fontSize: "24px", color: "#2b2b2b" }}
            onClick={onClickNextPage}
          >
            <HiChevronRight />
          </div>
          <div
            style={{ fontSize: "24px", color: "#2b2b2b" }}
            onClick={onClickLastPage}
          >
            <HiChevronDoubleRight />
          </div>

          <div
            style={{
              display: "flex",
              margin: "5px 0 5px 20px",
              cursor: "pointer",
            }}
            onClick={onClickPrintHiddenFrame}
          >
            <BsPrinter style={{ fontSize: "24px", color: "#2b2b2b" }} />
          </div>

          <div
            style={{
              display: "flex",
              margin: "5px 0 5px 20px",
              cursor: "pointer",
            }}
            onClick={onClickExportPdf}
          >
            <VscFilePdf style={{ fontSize: "24px", color: "#2b2b2b" }} />
          </div>

          <button
            style={{
              marginLeft: "20px",
              height: "30px",
              width: "50px",
              alignSelf: "center",
            }}
            onClick={() => window.close()}
          >
            Close
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          overflow: "auto",
          backgroundColor: "#f5f7fb",
          height: "100vh",
          width: "100%",
          position: "relative",
          marginTop: "10px",
        }}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <div
            ref={reportRef}
            style={{ height: "100%" }}
            id="reportViewer"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
