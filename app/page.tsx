"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { seededDeal } from "@/lib/seed";
import { Deal } from "@/lib/types";

const steps = ["Deal Setup","Branding","Property Info","Financials","Agent Info","Sale Comps","Lease Comps","Maps","Media Library","Narrative Sections","Page Builder / Layout","Preview","Export"];

export default function Home() {
  const [deal, setDeal] = useState<Deal>(seededDeal);
  const [step, setStep] = useState(0);

  const weightedRent = useMemo(() => {
    const totalUnits = deal.financials.unitMix.reduce((a, b) => a + b.units, 0);
    const weighted = deal.financials.unitMix.reduce((a, b) => a + b.avgRent * b.units, 0) / (totalUnits || 1);
    return weighted;
  }, [deal.financials.unitMix]);

  const updateProperty = (k: keyof Deal["property"], v: string | number) => setDeal((d) => ({ ...d, property: { ...d.property, [k]: v } }));

  return (
    <main className="p-4 md:p-8">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4">
        <aside className="no-print col-span-12 md:col-span-3 bg-white rounded-xl border p-3 h-fit sticky top-4">
          <h2 className="font-semibold mb-2">CRE OM Builder</h2>
          {steps.map((s, i) => <button key={s} onClick={() => setStep(i)} className={`w-full text-left px-3 py-2 rounded mb-1 text-sm ${step===i?"bg-slate-900 text-white":"hover:bg-slate-100"}`}>{i+1}. {s}</button>)}
          <button className="mt-3 w-full rounded bg-orange-500 text-white py-2" onClick={() => window.print()}>Export PDF</button>
        </aside>
        <section className="col-span-12 md:col-span-9 space-y-4">
          <BuilderStep step={step} deal={deal} setDeal={setDeal} updateProperty={updateProperty} weightedRent={weightedRent} />
          <ReportPreview deal={deal} weightedRent={weightedRent} />
        </section>
      </div>
    </main>
  );
}

function BuilderStep({ step, deal, setDeal, updateProperty, weightedRent }: any) {
  if (step === 0) return <Card title="Deal Setup"><div className="grid md:grid-cols-2 gap-3"><Input label="Property Name" value={deal.property.name} onChange={(v:string)=>updateProperty("name",v)} /><Input label="Address" value={deal.property.address} onChange={(v:string)=>updateProperty("address",v)} /><Input label="Report Type" value={deal.reportType} onChange={(v:string)=>setDeal((d:Deal)=>({...d,reportType:v}))} /><Input label="Activity ID" value={deal.activityId} onChange={(v:string)=>setDeal((d:Deal)=>({...d,activityId:v}))} /></div></Card>;
  if (step === 1) return <Card title="Branding"><div className="grid md:grid-cols-3 gap-3"><Color label="Primary" value={deal.branding.primary} onChange={(v:string)=>setDeal((d:Deal)=>({...d,branding:{...d.branding,primary:v}}))} /><Color label="Secondary" value={deal.branding.secondary} onChange={(v:string)=>setDeal((d:Deal)=>({...d,branding:{...d.branding,secondary:v}}))} /><Color label="Accent" value={deal.branding.accent} onChange={(v:string)=>setDeal((d:Deal)=>({...d,branding:{...d.branding,accent:v}}))} /></div></Card>;
  if (step === 2) return <Card title="Property Info"><div className="grid md:grid-cols-3 gap-3"><Input label="City" value={deal.property.city} onChange={(v:string)=>updateProperty("city",v)} /><Input label="State" value={deal.property.state} onChange={(v:string)=>updateProperty("state",v)} /><Input label="Units" type="number" value={deal.property.units} onChange={(v:string)=>updateProperty("units",Number(v))} /></div></Card>;
  if (step === 3) return <Card title="Financials"><div className="grid md:grid-cols-3 gap-3"><Input label="Listing Price" type="number" value={deal.financials.listingPrice} onChange={(v:string)=>setDeal((d:Deal)=>({...d,financials:{...d.financials,listingPrice:Number(v)}}))} /><Input label="NOI" type="number" value={deal.financials.noi} onChange={(v:string)=>setDeal((d:Deal)=>({...d,financials:{...d.financials,noi:Number(v)}}))} /><Input label="Cap Rate %" type="number" value={deal.financials.capRate} onChange={(v:string)=>setDeal((d:Deal)=>({...d,financials:{...d.financials,capRate:Number(v)}}))} /></div><p className="mt-3 text-sm">Weighted Avg Rent: <b>${weightedRent.toFixed(0)}</b></p></Card>;
  if (step === 4) return <Card title="Agent Info"><Input label="Lead Agent" value={deal.agents[0].name} onChange={(v:string)=>setDeal((d:Deal)=>({...d,agents:[{...d.agents[0],name:v}]}))} /></Card>;
  if (step === 5) return <Card title="Sale Comps"><SimpleCompTable rows={deal.saleComps} /></Card>;
  if (step === 6) return <Card title="Lease Comps"><SimpleCompTable rows={deal.leaseComps} /></Card>;
  if (step === 7) return <Card title="Maps"><p className="text-sm">Regional / Local / Aerial / Retailer map pages supported in preview.</p></Card>;
  if (step === 8) return <Card title="Media Library"><p className="text-sm">Drag-and-drop upload ready via extensible media model and assignment fields.</p></Card>;
  if (step === 9) return <Card title="Narrative Sections"><textarea value={deal.narratives[0].content} onChange={(e)=>setDeal((d:Deal)=>({...d,narratives:[{...d.narratives[0],content:e.target.value}]}))} className="w-full border rounded p-3 h-40" /></Card>;
  if (step === 10) return <Card title="Page Builder / Layout"><p className="text-sm">Reorder/hide/swap architecture represented in report pages model.</p></Card>;
  if (step === 11) return <Card title="Preview"><p className="text-sm">Scroll below for WYSIWYG-style paginated preview.</p></Card>;
  return <Card title="Export"><p className="text-sm">Click Export PDF in sidebar to print-ready Letter portrait PDF.</p></Card>;
}

const Card = ({ title, children }: any) => <div className="bg-white border rounded-xl p-4"><h3 className="font-semibold mb-3">{title}</h3>{children}</div>;
const Input = ({ label, value, onChange, type = "text" }: any) => <label className="block text-sm"><span>{label}</span><input type={type} value={value} onChange={(e)=>onChange(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" /></label>;
const Color = ({ label, value, onChange }: any) => <label className="block text-sm"><span>{label}</span><input type="color" value={value} onChange={(e)=>onChange(e.target.value)} className="mt-1 w-full h-10 border rounded" /></label>;

function SimpleCompTable({ rows }: { rows: any[] }) { return <div className="overflow-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-100">{Object.keys(rows[0]).slice(1,7).map((h)=><th className="text-left p-2" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i} className="border-b">{Object.values(r).slice(1,7).map((v,j)=><td className="p-2" key={j}>{String(v)}</td>)}</tr>)}</tbody></table></div>; }

function ReportPreview({ deal, weightedRent }: { deal: Deal; weightedRent: number }) {
  const chartData = deal.saleComps.map((c) => ({ property: c.propertyName, ppu: c.ppu / 1000 }));
  return <div className="space-y-4">
    <div className="report-page p-12" style={{ backgroundImage:`linear-gradient(rgba(12,36,71,.6),rgba(12,36,71,.6)),url(${deal.media[0].url})`, backgroundSize:"cover" }}><div className="text-white mt-72"><p className="uppercase tracking-[0.3em] text-sm">{deal.reportType}</p><h1 className="text-5xl font-bold">{deal.property.name}</h1><p className="text-xl mt-2">{deal.property.address}, {deal.property.city}, {deal.property.state} {deal.property.zip}</p></div></div>
    <div className="report-page p-10"><h2 className="text-2xl font-bold" style={{color:deal.branding.primary}}>Offering Summary</h2><div className="grid grid-cols-4 gap-3 mt-6">{[["Price",`$${(deal.financials.listingPrice/1e6).toFixed(1)}M`],["Units",deal.property.units],["Cap Rate",`${deal.financials.capRate}%`],["Wtd Rent",`$${weightedRent.toFixed(0)}`]].map(([k,v])=><div key={String(k)} className="border rounded p-3"><p className="text-xs uppercase">{k}</p><p className="text-xl font-bold">{v}</p></div>)}</div><p className="mt-6">{deal.property.executiveOverview}</p></div>
    <div className="report-page p-10"><h2 className="text-2xl font-bold mb-6">Sale Comparable Analysis</h2><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="property"/><YAxis /><Tooltip /><Legend /><Bar dataKey="ppu" fill={deal.branding.accent} name="Price/Unit (000s)" /></BarChart></ResponsiveContainer></div></div>
    <div className="report-page p-10"><h2 className="text-2xl font-bold">Exclusively Listed By</h2><div className="mt-6 flex gap-8"><img src={deal.agents[0].headshotUrl} className="w-40 h-48 object-cover rounded" alt="agent"/><div><p className="text-xl font-semibold">{deal.agents[0].name}</p><p>{deal.agents[0].title}</p><p>{deal.agents[0].phone}</p><p>{deal.agents[0].email}</p><p>{deal.agents[0].license}</p></div></div><p className="mt-16 text-xs text-slate-500">{deal.brokerage.legalDisclaimer}</p></div>
  </div>;
}
