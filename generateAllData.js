const fs = require('fs');
const path = require('path');

// Utility to generate points
function generatePoints(range, count, prefix) {
  const mult = range === '30d' ? 1.2 : range === '10d' ? 1.1 : range === '3d' ? 0.9 : 1;
  const points = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round((50 + Math.random() * 350) * mult);
    const y = Math.round((40 + Math.random() * 220) * mult);
    const size = Math.round((10 + Math.random() * 50) * mult);
    points.push({ x, y, size, name: `${prefix} ${i + 1}` });
  }
  return points;
}

// Generate clients.json
const clientsData = { points: generatePoints('7d', 18, 'Client') };
fs.writeFileSync(path.join('data', 'clients.json'), JSON.stringify(clientsData, null, 2));

// Generate mis.json
const misData = { points: generatePoints('7d', 12, 'MIS') };
fs.writeFileSync(path.join('data', 'mis.json'), JSON.stringify(misData, null, 2));

// Generate sip-business.json
const sipBusinessData = { points: generatePoints('7d', 10, 'SIP Business') };
fs.writeFileSync(path.join('data', 'sip-business.json'), JSON.stringify(sipBusinessData, null, 2));

// Generate stats.json
const statsData = { points: generatePoints('7d', 15, 'Stat') };
fs.writeFileSync(path.join('data', 'stats.json'), JSON.stringify(statsData, null, 2));

// Generate summary.json
const summaryData = { points: generatePoints('7d', 8, 'Summary') };
fs.writeFileSync(path.join('data', 'summary.json'), JSON.stringify(summaryData, null, 2));

console.log('All JSON files generated successfully in the data/ folder!');
