


function listenForResponse() {
  const responseElement = document.querySelector('.chat-response')
  if (responseElement) {
    javascript: (function () {
      var timeout = null;
      var delay = 1000;

      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      document.head.appendChild(script);

      script.addEventListener('load', function () {
        var mathJaxConfig = {
          jax: ["input/TeX", "output/HTML-CSS"],
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true,
          },
          options: {
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
          }
        };

        window.MathJax.config = mathJaxConfig;

        (function () {
          function typeset() {
            try {
              window.MathJax.typeset();
            } catch (err) {
              console.error(err);
            }
          }

          typeset();
          var timeout = null;
          var delay = 1000;

          var observer = new MutationObserver(function () {
            if (timeout) {
              clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
              typeset();
            }, delay);
          });
          observer.observe(document.body, { childList: true, subtree: true });

        })();
      });
    })();
    console.log('Language model responded!')
  } else {
    setTimeout(listenForResponse, 100)
  }
}

listenForResponse()
