"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import type { RangeKey } from "@/lib/utils";
import KpiCard from "@/components/cards/KpiCard";
import StatCard from "@/components/cards/StatCard";
import TimeRange from "@/components/TimeRange";
import ClientsBubble from "@/components/charts/ClientsBubble";
import SipBusiness from "@/components/charts/SipBusiness";
import MonthlyMIS from "@/components/charts/MonthlyMIS";

export default function Page() {
  
  const [range, setRange] = useState<RangeKey>("7d");

  // ✅ stats state
  const [stats, setStats] = useState({
    aum: { value: "12.19 Cr", mom: 0.77 },
    sip: { value: "1.39 Lakh", mom: 0 },
    purchases: "0.00 INR",
    redemptions: "0.00 INR",
    rejections: "0.00 INR",
    sipRejections: "0.00 INR",
    newSip: "0.00 INR",
  });

  // ✅ update stats dynamically when range changes
  const updateStats = (newRange: string) => {
    switch (newRange) {
      case "3d":
        setStats({
          aum: { value: "10.00 Cr", mom: 0.5 },
          sip: { value: "1.20 Lakh", mom: 0.1 },
          purchases: "5,000 INR",
          redemptions: "2,000 INR",
          rejections: "50 INR",
          sipRejections: "80 INR",
          newSip: "10 INR",
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
          aum: { value: "13.00 Cr", mom: 1.0 },
          sip: { value: "1.45 Lakh", mom: 0.15 },
          purchases: "20,000 INR",
          redemptions: "8,000 INR",
          rejections: "150 INR",
          sipRejections: "250 INR",
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
      case "90d":
        setStats({
          aum: { value: "18.00 Cr", mom: 1.5 },
          sip: { value: "1.70 Lakh", mom: 0.2 },
          purchases: "1,20,000 INR",
          redemptions: "80,000 INR",
          rejections: "400 INR",
          sipRejections: "500 INR",
          newSip: "120 INR",
        });
        break;
      default:
        setStats({
          aum: { value: "12.19 Cr", mom: 0.77 },
          sip: { value: "1.39 Lakh", mom: 0 },
          purchases: "0.00 INR",
          redemptions: "0.00 INR",
          rejections: "0.00 INR",
          sipRejections: "0.00 INR",
          newSip: "0.00 INR",
        });
    }
  };

  // ✅ PDF generation with live stats
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Financial Dashboard Report", 14, 20);

    // KPI Section
    doc.setFontSize(14);
    doc.text("KPIs", 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [["Metric", "Value", "Change"]],
      body: [
        ["AUM", stats.aum.value, `${stats.aum.mom}% MoM`],
        ["SIP", stats.sip.value, `${stats.sip.mom}% MoM`],
      ],
    });

    // Stats Section
    doc.setFontSize(14);
    doc.text("Major Stats", 14, (doc as any).lastAutoTable.finalY + 20);

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 25,
      head: [["Category", "Value"]],
      body: [
        ["Purchases", stats.purchases],
        ["Redemptions", stats.redemptions],
        ["Rej. Transactions", stats.rejections],
        ["SIP Rejections", stats.sipRejections],
        ["New SIP", stats.newSip],
      ],
    });

    // Example chart (placeholder)
    const chartY = (doc as any).lastAutoTable.finalY + 40;
    doc.setFontSize(14);
    doc.text("Charts (Sample Representation)", 14, chartY);

    doc.setFillColor(59, 130, 246); // blue
    doc.rect(20, chartY + 10, 30, 40, "F");
    doc.setFillColor(34, 197, 94); // green
    doc.rect(60, chartY + 20, 30, 30, "F");
    doc.setFillColor(239, 68, 68); // red
    doc.rect(100, chartY + 5, 30, 45, "F");

    // Save PDF
    doc.save("financial-dashboard.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      {/* PDF Button */}
      <div className="flex justify-end">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KpiCard title="AUM" value={stats.aum.value} mom={stats.aum.mom} />
        <KpiCard title="SIP" value={stats.sip.value} mom={stats.sip.mom} />
      </div>

      {/* TimeRange with update logic */}
      <TimeRange
        value={range as any}
        onChange={(r) => {
          setRange(r);
          updateStats(r);
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Purchases" value={stats.purchases} />
        <StatCard label="Redemptions" value={stats.redemptions} />
        <StatCard label="Rej. Transactions" value={stats.rejections} />
        <StatCard label="SIP Rejections" value={stats.sipRejections} />
        <StatCard label="New SIP" value={stats.newSip} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="pdf-chart">
                <ClientsBubble range={range} />
                </div>
                <div className="pdf-chart">
        <SipBusiness range={range} />
        </div>
        <div className="pdf-chart">

        <MonthlyMIS range={range} />
      </div>
    </div>
  </div>
  );
}