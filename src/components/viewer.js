import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReportViewer } from "realreport";

const Viewer = () => {
  const reportRef = useRef(null);
  const location = useLocation();
  //Object.fromEntries(new URLSearchParams(location.search.split("?")[1]).entries());
  const [report, setReport] = useState(null);

  const getJson = async () => {
    const json = await (await fetch(`/report/report-2.json`)).json();
    setReport(json);
  };

  useEffect(() => {
    getJson();
  }, []);

  useEffect(() => {
    const viewer = new ReportViewer(reportRef.current);

    const pageCallback = (ctx, page, pageNo) => {
      console.log(`${pageNo} 페이지 미리보기 완료`);
    };

    const endCallback = (ctx, pages) => {
      console.log("모든 페이지 미리보기 완료");
    };

    if (viewer && report) {
      viewer.reportForm = report.form;
      viewer.dataSet = report.dataSet;
      viewer.preview({
        async: true,
        pageMark: false,
        noScroll: true,
        callback: pageCallback,
        endCallback,
      });
    }
  }, [report]);

  return (
    <div ref={reportRef} style={{ height: "100%" }} id="reportViewer"></div>
  );
};

export default Viewer;
