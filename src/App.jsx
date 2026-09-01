import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AnalyzerPage from "./pages/AnalyzerPage";
import SharedReportPage from "./pages/SharedReportPage";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/report.css";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<AnalyzerPage />} />
        <Route path="/report/:id" element={<SharedReportPage />} />
      </Routes>
      <footer className="footer-note">
        TRACE analyses message metadata you provide and produces an
        automated, evidence-based assessment. It supports — and does not
        replace — analyst judgement. No data is stored in a database;
        reports live in server memory until exported.
      </footer>
    </div>
  );
}
