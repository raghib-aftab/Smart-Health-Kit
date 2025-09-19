
// PDF demo with jsPDF generating a simple report
(function(){
  const { jsPDF } = window.jspdf;
  const steps = [...document.querySelectorAll('.step')];
  let current = 0;
  function show(i){ steps.forEach((s,idx)=> s.style.display = idx===i ? 'block':'none'); current=i; window.scrollTo({top:0,behavior:'smooth'}) }
  document.getElementById('toStep2').addEventListener('click', ()=> show(1) );
  document.getElementById('backTo1').addEventListener('click', ()=> show(0) );
  document.getElementById('toStep3').addEventListener('click', ()=> show(2) );
  document.getElementById('backTo2').addEventListener('click', ()=> show(1) );

  document.getElementById('generatePdf').addEventListener('click', ()=> {
    // gather values
    const name = document.getElementById('fullName').value || '—';
    const age = document.getElementById('age').value || '—';
    const gender = document.getElementById('gender').value || '—';

    const chips = [...document.querySelectorAll('#kitChips .chip')].filter(c=> c.classList.contains('selected')).map(c=>c.textContent) ;
    const selectedSymptoms = [...document.querySelectorAll('.checkbox-grid input[type=checkbox]')].filter(i=>i.checked).map(i=> {
      const lab = i.nextElementSibling ? i.nextElementSibling.textContent : i.id; return lab;
    });

    const tests = [...document.querySelectorAll('#suggestedList input[type=checkbox]')].filter(i=>i.checked).map(i=> i.nextElementSibling.textContent );
    const notes = document.getElementById('notes').value || '';
    const yoga = document.getElementById('yogaBox').innerText || '';

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let y = 50;

    doc.setFontSize(18);
    doc.setTextColor(10,200,255);
    doc.text('Smart Health Kit — Demo Report', margin, y);
    y += 24;
    doc.setDrawColor(40,60,80);
    doc.line(margin, y, 595-margin, y);
    y += 18;

    doc.setFontSize(12);
    doc.setTextColor(220,220,230);
    doc.text(`Name: ${name}`, margin, y); y += 16;
    doc.text(`Age: ${age}`, margin, y); y += 16;
    doc.text(`Gender: ${gender}`, margin, y); y += 24;

    if (chips.length){
      doc.text('Selected Kit Tests: ' + chips.join(', '), margin, y); y += 18;
    }

    if (selectedSymptoms.length){
      doc.text('Symptoms: ' + selectedSymptoms.join(', '), margin, y); y += 18;
    }

    if (tests.length){
      doc.text('Suggested Tests: ' + tests.join(', '), margin, y); y += 18;
    }

    if (notes){
      doc.text('Notes:', margin, y); y += 14;
      const split = doc.splitTextToSize(notes, 595 - margin*2);
      doc.text(split, margin, y);
      y += split.length * 14 + 6;
    }

    if (yoga){
      doc.text('Yoga / Pranayama Recommendations:', margin, y); y += 14;
      const split2 = doc.splitTextToSize(yoga, 595 - margin*2);
      doc.text(split2, margin, y); y += split2.length * 12 + 6;
    }

    // Footer note
    doc.setFontSize(10);
    doc.setTextColor(150,150,160);
    doc.text('This is a demo report generated offline. Not a medical diagnosis.', margin, 820);

    // Save PDF
    doc.save(`SmartHealthKit_DemoReport_${name.replace(/\s+/g,'_') || 'anon'}.pdf`);
  });

  // chips toggle
  document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', ()=> c.classList.toggle('selected')));
})();
