// Using ES module imports since vendor_rejections is ES module
import { VENDOR_REJECTIONS } from './src/data/vendor_rejections.js';

let totalRejected = 0;
let totalSamples = 0;

const vendorMap = {};
const materialMap = {};

VENDOR_REJECTIONS.forEach(item => {
  totalRejected += item.rejected;
  totalSamples += item.total;
  
  // Aggregate by vendor
  if (!vendorMap[item.vendor]) {
    vendorMap[item.vendor] = { name: item.vendor, rejected: 0, total: 0, hits100: 0 };
  }
  vendorMap[item.vendor].rejected += item.rejected;
  vendorMap[item.vendor].total += item.total;
  if (item.rejected === item.total && item.total > 0) vendorMap[item.vendor].hits100 += 1;

  // Aggregate by material
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

const bestVendor = vendors.filter(v => v.rejected === 0).sort((a, b) => b.total - a.total)[0];
console.log("bestVendor is:", bestVendor);
