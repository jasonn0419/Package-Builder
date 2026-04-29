export type ReportType = "Offering Memorandum" | "Broker Opinion of Value";

export interface UnitMixLine { unitType: string; units: number; avgSize: number; avgRent: number; }
export interface RentRollLine { unit: string; tenant: string; currentRent: number; marketRent: number; sf: number; }
export interface FinancialSummary {
  listingPrice: number; capRate: number; noi: number; pricePerUnit: number; pricePerSf: number;
  rentPerSfAnnual: number; downPaymentPct: number; returnAssumptionPct: number;
  otherIncome: number; incomeAssumptions: string; expenseAssumptions: string;
  proFormaNotes: string; rentRoll: RentRollLine[]; unitMix: UnitMixLine[];
}
export interface Property {
  name: string; address: string; city: string; state: string; zip: string; assetType: string;
  units: number; buildings: number; floors: number; grossSf: number; rentableSf: number; lotSize: string;
  yearBuilt: number; yearRenovated: number; occupancy: number; zoning: string; amenities: string;
  investmentHighlights: string[]; executiveOverview: string; locationOverview: string;
}
export interface Agent { id: string; name: string; title: string; phone: string; email: string; license: string; office: string; headshotUrl: string; }
export interface Brokerage { name: string; logoUrl: string; legalDisclaimer: string; officeFooterText: string; }
export interface SaleComparable { id: string; propertyName: string; address: string; saleDate: string; salePrice: number; ppu: number; ppsf: number; capRate: number; units: number; yearBuilt: number; buildingSize: number; lotSize: string; distance: number; notes: string; imageUrl: string; featured: boolean; }
export interface LeaseComparable { id: string; propertyName: string; address: string; unitType: string; avgUnitSize: number; avgRent: number; rentPerSf: number; renovation: string; amenities: string; distance: number; notes: string; imageUrl: string; featured: boolean; }
export interface BrandingTheme { primary: string; secondary: string; accent: string; fontFamily: string; headerStyle: string; footerStyle: string; pageNumberingStyle: string; }
export interface MapAsset { id: string; type: "regional" | "local" | "aerial" | "retailer"; title: string; imageUrl: string; labels: string[]; include: boolean; }
export interface MediaAsset { id: string; category: string; title: string; url: string; caption?: string; focalPoint?: { x: number; y: number }; }
export interface NarrativeSection { id: string; title: string; content: string; include: boolean; layout: "text" | "two-column" | "hero"; }
export interface ChartConfig { id: string; type: "bar" | "line"; title: string; xKey: string; series: { key: string; color: string; label: string; visible: boolean }[]; showLegend: boolean; }
export interface PageTemplate { id: string; type: string; name: string; }
export interface ReportPage { id: string; templateType: string; title: string; include: boolean; sectionLabel: string; }
export interface ExportConfig { pageSize: "Letter"; orientation: "portrait"; bleed: boolean; includeCrops: boolean; dpi: number; }
export interface Deal {
  id: string; activityId: string; reportType: ReportType; propertyType: string; template: string;
  confidentiality: string; includePricingGuidance: boolean; branding: BrandingTheme; property: Property;
  financials: FinancialSummary; agents: Agent[]; brokerage: Brokerage; saleComps: SaleComparable[];
  leaseComps: LeaseComparable[]; maps: MapAsset[]; media: MediaAsset[]; narratives: NarrativeSection[];
  charts: ChartConfig[]; pages: ReportPage[]; exportConfig: ExportConfig;
}
