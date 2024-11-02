const userName = document.getElementById("user_name");
const hackathon = document.getElementById("hackathon");
console.log(hackathon.innerText);
const date = document.getElementById("date");
const date_issue = document.getElementById("date_issue");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);
  const hackathon_name = hackathon.innerText;
  const date_value = date.value;
  const date_issue_value = date_issue.value;

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val, hackathon_name, date_value, date_issue_value);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (name, hackathon_name, date_value, date_issue_value) => {
  const existingPdfBytes = await fetch("./new_temp.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./font/Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // find length of userName
  const len = userName.value.length;
  // console.log(len);

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 500 - (len / 2)*20,
    y: 400,
    size: 58,
    font: SanChezFont,
    color: rgb(0.2, 0.84, 0.67),
  });


  firstPage.drawText(hackathon_name, {
    x: 600 - (len / 2)*20,
    y: 270,
    size: 30,
    font: SanChezFont,
    color: rgb(0.2, 0.84, 0.67),
  });


  firstPage.drawText(date_value, {
    x: 693 - (len / 2)*20,
    y: 226,
    size: 20,
    font: SanChezFont,
    color: rgb(0.2, 0.84, 0.67),
  });

  firstPage.drawText(date_issue_value, {
    x: 1040 - (len / 2)*20,
    y: 105,
    size: 20,
    font: SanChezFont,
    color: rgb(0.2, 0.84, 0.67),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "DevPost Judge Certificate.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();

// Add or Remove Winners
const addWinnersBtn = document.getElementById("add-winners-btn");
const winnersContainer = document.querySelector(".winners-container");

addWinnersBtn.addEventListener("click", () => {
  if (addWinnersBtn.innerText === "Add Winners") {
    winnersContainer.style.display = "block";
    addWinnersBtn.innerText = "Remove Winners";
  } else {
    winnersContainer.style.display = "none";
    addWinnersBtn.innerText = "Add Winners";
  }
});