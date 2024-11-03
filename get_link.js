async function parseWikipediaHeadings() {
    const url=document.getElementById("link").value;
    try {
        // Fetch the HTML content
        const response = await fetch(url);
        const html = await response.text();

        // Parse HTML with DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Array to store headings
        const headings = [];

        // Select and iterate through all headings (h1 to h6)
        for (let i = 1; i <= 6; i++) {
            const headingTags = doc.querySelectorAll(`h${i}`);
            headingTags.forEach((element) => {
                const headingText = element.textContent.trim();
                headings.push({ level: `H${i}`, text: headingText });
            });
        }

        // Output the parsed headings
        console.log('Parsed Headings:', headings);
    } catch (error) {
        console.error('Error fetching or parsing the page:', error);
    }
}

// Run the function with the Wikipedia page URL
// parseWikipediaHeadings('https://en.wikipedia.org/wiki/The_Terminator');
