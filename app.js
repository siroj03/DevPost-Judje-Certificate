const jsPDF = window.jspdf;

function generatePDF() {
    console.log('generatePDF called');
    const formData = {
        hackathonName: document.getElementById('hackathon_name').value,
        hackathonDate: document.getElementById('hackathon_date').value,
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('last_name').value,
        judgingDate: document.getElementById('judging_date').value,
        numProjects: document.getElementById('num_projects').value,
        winner1: document.getElementById('winner1').value,
        winner2: document.getElementById('winner2').value,
        winner3: document.getElementById('winner3').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        creatorName: document.getElementById('creator_name').value,
        creatorEmail: document.getElementById('creator_email').value
    };

    console.log('formData:', formData);

    const doc = new jsPDF();
    console.log('doc:', doc);
    doc.setFontSize(12);

    Object.keys(formData).forEach((key, index) => {
        console.log(`key: ${key}, index: ${index}, value: ${formData[key]}`);
        doc.text(`${key}: ${formData[key]}`, 10, 10 + (index * 10));
    });

    console.log('saving pdf...');
    doc.save('Devpost_Judge_Certificate.pdf', { returnPromise: true }).then(() => {
        const pdfUrl = doc.output('bloburl');
        console.log('pdfUrl:', pdfUrl);
        window.open(pdfUrl, '_blank');
    });
}


