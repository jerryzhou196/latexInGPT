function replaceLatex() {
  // find all elements with the class "latex"
  let latexElements = document.getElementsByClassName('latex');

  // iterate through all elements and replace the latex with a rendered png
  for (let i = 0; i < latexElements.length; i++) {
    let latex = latexElements[i].innerHTML;
    let pngUrl = `http://latex.codecogs.com/png.latex?${latex}`;
    let imgElement = `<img src="${pngUrl}" />`;
    latexElements[i].innerHTML = imgElement;
  }
}

// run the replaceLatex function when the page loads
replaceLatex();
