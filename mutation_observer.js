// Listen for changes to the HTML of the page using a MutationObserver
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    // Process any new LaTeX equations that are added to the page
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        processLaTeXEquations(node);
      }
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });

// Extract the LaTeX code from the HTML using a regular expression
const latexRegex = /\$\$(.+?)\$\$/g;
function extractLaTeXCode(html) {
  const matches = [...html.matchAll(latexRegex)];
  return matches.map(match => match[1]);
}

// Process any LaTeX equations found in the given node
function processLaTeXEquations(node) {
  // Extract the LaTeX code from the node's innerHTML
  const latexCodes = extractLaTeXCode(node.innerHTML);

  // Send the LaTeX code to the server to be rendered as a PNG image
  latexCodes.forEach(latexCode => {
    fetch('https://latex-renderer.com/render', {
      method: 'POST',
      body: JSON.stringify({ latex: latexCode }),
    })
      .then(response => response.json())
      .then(data => {
        // Replace the raw LaTeX code with the rendered PNG image
        node.innerHTML = node.innerHTML.replace(
          `$$${latexCode}$$`,
          `<img src="${data.pngUrl}" alt="${latexCode}">`
        );
      });
  });
}
