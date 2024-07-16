const express = require('express')
const app = express()
const http = require('http');

const port = 3000
const cors = require('cors')
app.use(cors())

const labno = process.env.labno || 1192;
const studentno = process.env.studno || "student01";
const bookServiceUrl = process.env.url || "http://localhost:3001"

function getPage(content, title) {

  let toReturn = "<html>  <head>   " + title + "   <meta charset=\"UTF-8\">   <link rel=\"stylesheet\" href=\"https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css\">   <style>     /* Suppress custom element until styles are loaded */     cds-header:not(:defined) {       display: none;     }   </style>   <script type=\"module\" src=\"https://1.www.s81c.com/common/carbon/web-components/version/v2.10.0/accordion.min.js\"></script>   <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH\" crossorigin=\"anonymous\">   <script type=\"module\" src=\"https://1.www.s81c.com/common/carbon/web-components/version/v2.10.0/ui-shell.min.js\"></script>   <script type=\"module\" src=\"https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/grid/examples/preview/styles.scss\"></script> </head>  <body class=\"cds-theme-zone-white\">   <cds-header aria-label=\"IBM Platform Name\" role=\"banner\">     <cds-header-menu-button button-label-active=\"Close menu\" button-label-inactive=\"Open menu\" collapse-mode=\"responsive\"></cds-header-menu-button>     <cds-header-name href=\"/\" prefix=\"IBM\">Lab 1193 Reading list</cds-header-name>     <cds-header-nav menu-bar-label=\"IBM Lab 1193 Reading List\" role=\"navigation\">       <cds-header-nav-item href=\"/\" role=\"listitem\">Home</cds-header-nav-item>     </cds-header-nav>   </cds-header>    <div class=\"container\">     <div class=\"row-5\"><div class=\"col\">Header</div></div>     <div class=\"row-5\"><div class=\"col\">Header</div></div>     <div class=\"row\">       <div class=\"col\"> </div> <div class=\"col-10\"> " + content + "</div>   <div class=\"col\"> </div> </div> </div> </body>  </html>"


  console.log(toReturn);
  return toReturn;
}
app.get('/', (req, res) => {
  http.get(bookServiceUrl, res2 => {
    let data = [];
    const headerDate = res2.headers && res2.headers.date ? res2.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res2.on('data', chunk => {
      data.push(chunk);
    });

    res2.on('end', () => {
      console.log('Response ended: ');
      const users = JSON.parse(Buffer.concat(data).toString());

      let t = "<h1>Recommended Reading list for students of Lab1193</h1>" +
        "<cds-accordion>";
      users.forEach((e, i) => {
        console.log(e)
        t = t + "<cds-accordion-item title=\"Book " + (i+1) + " - " + e.title + "\">" +
          "<Div class=title><h3>" + e.title + "</H3></Div>" +
          "<Div class=author>Author(s): <B>" + e.author + "</B></Div>" +
          "<Div class=bookcover><img src=https://chrisphillips-cminion.github.io/images/blank.svg></Div>" +
          "<Div class=link><a href=/d/" + e.id + ">More info</a></Div>" +
          "</cds-accordion-item>"
      })
      t = t + "</cds-accordion>";
      console.log(t)
      res.send(getPage(t, "main"));
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
    res.send(getPage(bookServiceUrl, "error"));
  });

})
app.get('/d/:id', (req, res) => {
  http.get(bookServiceUrl + '/' + req.params.id + '/details', res2 => {
    let data = [];
    const headerDate = res2.headers && res2.headers.date ? res2.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res2.on('data', chunk => {
      data.push(chunk);
    });

    res2.on('end', () => {
      console.log('Response ended: ');
      console.log(Buffer.concat(data).toString())
      const book = JSON.parse(Buffer.concat(data).toString());
      let t = "<Div class=title><h3>" + book.title + "</H3></Div>" +
        "<Div class=author>Author(s): <B>" + book.author + "</B></Div>" +
        "<Div class=bookcover><img src=https://chrisphillips-cminion.github.io/images/blank.svg></Div>" +
        "<Div class=bookcover>" + book.description + "</Div>"

      res.send(getPage(t, book.title));
    });
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
