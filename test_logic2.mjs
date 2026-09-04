import { VENDOR_REJECTIONS } from './src/data/vendor_rejections.js';

let totalRejected = 0;
let totalSamples = 0;

const vendorMap = {};
const materialMap = {};

VENDOR_REJECTIONS.forEach(item => {
  totalRejected += item.rejected;
  totalSamples += item.total;
  
  if (!vendorMap[item.vendor]) {
    vendorMap[item.vendor] = { name: item.vendor, rejected: 0, total: 0, hits100: 0 };
  }
  vendorMap[item.vendor].rejected += item.rejected;
  vendorMap[item.vendor].total += item.total;
  if (item.rejected === item.total && item.total > 0) vendorMap[item.vendor].hits100 += 1;

  if (!materialMap[item.material]) {
    materialMap[item.material] = { name: item.material, rejected: 0, total: 0 };
  }
  materialMap[item.material].rejected += item.rejected;
  materialMap[item.material].total += item.total;
});

const vendors = Object.values(vendorMap).map(v => ({
  ...v,
  accepted: v.total - v.rejected,
  rejectionPct: v.total > 0 ? (v.rejected / v.total) * 100 : 0
}));

const materials = Object.values(materialMap).map(m => ({
  ...m,
  rejectionPct: m.total > 0 ? (m.rejected / m.total) * 100 : 0
}));

const topVendorRisk = vendors.sort((a, b) => b.hits100 - a.hits100 || b.rejectionPct - a.rejectionPct)[0];
const highestVolumeLoss = materials.sort((a, b) => b.rejected - a.rejected)[0];
const bestVendor = vendors.filter(v => v.rejected === 0).sort((a, b) => b.total - a.total)[0];

console.log("topVendorRisk:", topVendorRisk);
console.log("highestVolumeLoss:", highestVolumeLoss);
console.log("bestVendor:", bestVendor);

const scatterData = vendors.filter(v => v.total > 0).map(v => ({
  name: v.name, x: v.total, y: v.rejectionPct, z: v.rejected
}));
// console.log("scatter length:", scatterData.length);

const vendorBarData = [...vendors].sort((a, b) => b.rejected - a.rejected).slice(0, 5).map(v => ({
  name: v.name, Rejected: v.rejected, Accepted: v.accepted, total: v.total
}));
// console.log("bar length:", vendorBarData.length);
