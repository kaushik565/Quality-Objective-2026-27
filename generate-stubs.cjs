const fs = require('fs');
const path = require('path');

const slides = [
  { name: 'QMSSummarySlide', title: 'QMS Summary' },
  { name: 'QMSSiteDrillDownSlide', title: 'QMS Site Drill-Down' },
  { name: 'IPQAOverviewSlide', title: 'IPQA Overview' },
  { name: 'LabQAOverviewSlide', title: 'Lab QA Overview' },
  { name: 'CustomerComplaintsOverviewSlide', title: 'Complaints Overview' },
  { name: 'QualityObjectivesSlide', title: 'Quality Objectives' },
  { name: 'AuditOverviewSlide', title: 'Audit Overview' },
  { name: 'ProcessImprovementsSlide', title: 'Process Improvements' },
  { name: 'ImprovementsBySiteSlide', title: 'Improvements by Site' },
  { name: 'ClosingSlideNew', title: 'Closing Slide' }
];

slides.forEach(slide => {
  const content = `import React from 'react';

const ${slide.name} = () => {
  return (
    <section>
      <div className="slide-content p-8 h-full bg-white flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-6">${slide.title}</h2>
        <div className="text-xl text-slate-600 bg-slate-100 p-8 rounded-xl border border-slate-200">
          <p>Content for ${slide.title} will go here.</p>
        </div>
      </div>
    </section>
  );
};

export default ${slide.name};
`;
  fs.writeFileSync(path.join(__dirname, 'src', 'slides', `${slide.name}.jsx`), content);
});

console.log('Stubs created.');
