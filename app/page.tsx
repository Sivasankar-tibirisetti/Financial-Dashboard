"use client";

import { useState } from "react";

import KpiCard from "@/components/cards/KpiCard";
import StatCard from "@/components/cards/StatCard";
import TimeRange from "@/components/TimeRange";
import ClientsBubble from "@/components/charts/ClientsBubble";
import SipBusiness from "@/components/charts/SipBusiness";
import MonthlyMIS from "@/components/charts/MonthlyMIS";

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import { Capacitor } from "@capacitor/core";

type RangeKey = "3d" | "7d" | "10d" | "30d";

export default function Page() {
  const [range, setRange] = useState<RangeKey>("7d");
  const [stats, setStats] = useState({        
    aum: { value: "12.19 Cr", mom: 0.77 },
    sip: { value: "1.39 Lakh", mom: 0 },
    purchases: "10,000 INR",
    redemptions: "5,000 INR",
    rejections: "100 INR",
    sipRejections: "200 INR",
    newSip: "20 INR",
  });

  const updateStats = (r: RangeKey) => {
    switch (r) {
      case "3d":
        setStats({
          aum: { value: "11.92 Cr", mom: 0.42 },
          sip: { value: "1.32 Lakh", mom: 0.05 },
          purchases: "8,000 INR",
          redemptions: "3,000 INR",
          rejections: "90 INR",
          sipRejections: "120 INR",
          newSip: "15 INR",
        });
        break;
      case "7d":
        setStats({
          aum: { value: "12.19 Cr", mom: 0.77 },
          sip: { value: "1.39 Lakh", mom: 0 },
          purchases: "10,000 INR",
          redemptions: "5,000 INR",
          rejections: "100 INR",
          sipRejections: "200 INR",
          newSip: "20 INR",
        });
        break;
      case "10d":
        setStats({
          aum: { value: "12.70 Cr", mom: 0.95 },
          sip: { value: "1.42 Lakh", mom: 0.08 },
          purchases: "18,000 INR",
          redemptions: "7,500 INR",
          rejections: "130 INR",
          sipRejections: "230 INR",
          newSip: "30 INR",
        });
        break;
      case "30d":
        setStats({
          aum: { value: "15.00 Cr", mom: 1.2 },
          sip: { value: "1.50 Lakh", mom: 0.1 },
          purchases: "50,000 INR",
          redemptions: "20,000 INR",
          rejections: "200 INR",
          sipRejections: "400 INR",
          newSip: "50 INR",
        });
        break;
    }
  };


const generatePDF = async () => {
  try {
    // Dynamically import jsPDF and autotable (client-side only)
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();

    // --- Title ---
    doc.setFontSize(18);
    doc.text("Financial Dashboard Report", 14, 20);

    // --- KPI Table ---
    doc.setFontSize(14);
    doc.text("KPIs", 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [["Metric", "Value", "MoM"]],
      body: [
        ["AUM", stats.aum.value, `${stats.aum.mom}%`],
        ["SIP", stats.sip.value, `${stats.sip.mom}%`],
      ],
    });

    // --- Major Stats ---
    const afterKpiY = (doc as any).lastAutoTable?.finalY || 60;
    doc.text("Major Stats", 14, afterKpiY + 10);

    autoTable(doc, {
      startY: afterKpiY + 15,
      head: [["Category", "Value"]],
      body: [
        ["Purchases", stats.purchases],
        ["Redemptions", stats.redemptions],
        ["Rejections", stats.rejections],
        ["SIP Rejections", stats.sipRejections],
        ["New SIP", stats.newSip],
      ],
    });

    // --- Charts ---
    const afterStatsY = (doc as any).lastAutoTable?.finalY || 120;
    doc.setFontSize(14);
    doc.text("Charts (Example)", 14, afterStatsY + 10);

    // --- Bar Chart ---
    doc.setFillColor(59, 130, 246); doc.rect(20, afterStatsY + 20, 15, 40, "F");
    doc.setFillColor(34, 197, 94); doc.rect(40, afterStatsY + 30, 15, 30, "F");
    doc.setFillColor(239, 68, 68); doc.rect(60, afterStatsY + 15, 15, 50, "F");
    doc.text("Bar Chart", 20, afterStatsY + 15);

    // --- Line Chart ---
    const lineChartY = afterStatsY + 80;
    doc.text("Line Chart", 14, lineChartY);
    doc.setDrawColor(0);
    doc.line(20, lineChartY + 10, 40, lineChartY + 5);
    doc.line(40, lineChartY + 5, 60, lineChartY + 15);
    doc.line(60, lineChartY + 15, 80, lineChartY + 8);

// --- Pie Chart ---
const pieX = 140;   
const pieY = lineChartY -40;   // ⬆️ moved higher
const pieR = 25;

doc.text("Pie Chart", pieX - 10, pieY - 30);

doc.setFillColor(59, 130, 246);
doc.circle(pieX, pieY, pieR, "F");

doc.setFillColor(239, 68, 68);
doc.triangle(pieX, pieY, pieX + pieR, pieY, pieX, pieY - pieR, "F");

doc.setFillColor(34, 197, 94);
doc.triangle(pieX, pieY, pieX, pieY - pieR, pieX - pieR, pieY, "F");


// --- Area Chart ---
const areaChartX = 110;   
const areaChartY = pieY + 30; // closer to Pie chart

doc.text("Area Chart", areaChartX, areaChartY);

// baseline
doc.setDrawColor(0);
doc.line(areaChartX, areaChartY + 20, areaChartX + 60, areaChartY + 20);

// filled area
const startX = areaChartX;
const startY = areaChartY + 20;
doc.setFillColor(59, 130, 246);
doc.lines(
  [
    [20, -15],
    [20, 10],
    [20, -7],
    [0, 12],
    [-60, 0],
  ],
  startX,
  startY,
  null,
  "F",
  true
);

// trend line
doc.setDrawColor(0);
doc.line(areaChartX, areaChartY + 20, areaChartX + 20, areaChartY + 5);
doc.line(areaChartX + 20, areaChartY + 5, areaChartX + 40, areaChartY + 15);
doc.line(areaChartX + 40, areaChartY + 15, areaChartX + 60, areaChartY + 8);


// --- Legend (directly below Area Chart) ---
const legendX = areaChartX;           // align left with Area Chart
const legendY = areaChartY + 30;      // just below area chart
doc.setFontSize(10);
doc.text("Legend:", legendX, legendY);

// box size
const boxSize = 6;

// Blue
doc.setFillColor(59, 130, 246);
doc.rect(legendX, legendY + 5, boxSize, boxSize, "F");
doc.text("AUM / Blue", legendX + boxSize + 4, legendY + 10);

// Green
doc.setFillColor(34, 197, 94);
doc.rect(legendX, legendY + 18, boxSize, boxSize, "F");
doc.text("SIP / Green", legendX + boxSize+4 ,legendY + 23);

// Red
doc.setFillColor(239, 68, 68);
doc.rect(legendX, legendY + 31, boxSize, boxSize, "F");
doc.text("Other Stats / Red", legendX + boxSize+4, legendY + 36);


   // --- Save PDF ---
   //mobile
 // --- Save PDF ---
if (Capacitor.isNativePlatform()) {
  // Mobile / Capacitor environment
  const pdfBlob = doc.output("blob");
  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = (reader.result as string).split(",")[1];

    await Filesystem.writeFile({
      path: "financial_dashboard.pdf",
      data: base64,
      directory: Directory.Documents,
    });

    await Toast.show({
      text: "PDF saved to Documents folder!",
      duration: "long",
    });
  };
  reader.readAsDataURL(pdfBlob);
} else {
  // Browser fallback
  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "filename"; // filename
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

} catch (error) {
    console.error("PDF generation failed:", error);
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>Financial Dashboard</h1>

      {/* PDF download button */}
      <button
        onClick={generatePDF}
        style={{
          marginBottom: "30px",
          padding: "10px 20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Download PDF
      </button>

      {/* Time range selector */}
      <TimeRange
        value={range}
        onChange={(r: RangeKey) => {
          setRange(r);
          updateStats(r);
        }}
      />

      {/* KPI Cards */}
      <KpiCard title="AUM" value={stats.aum.value} mom={stats.aum.mom} />
      <KpiCard title="SIP" value={stats.sip.value} mom={stats.sip.mom} />

      {/* Stat Cards */}
      <StatCard label="Purchases" value={stats.purchases} />
      <StatCard label="Redemptions" value={stats.redemptions} />
      <StatCard label="Rejections" value={stats.rejections} />
      <StatCard label="SIP Rejections" value={stats.sipRejections} />
      <StatCard label="New SIP" value={stats.newSip} />

      {/* Charts */}
      <ClientsBubble range={range} />
      <SipBusiness range={range} />
      <MonthlyMIS range={range} />
    </div>
  );
}
