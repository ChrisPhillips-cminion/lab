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
  let toReturn = "<!--@licenseCopyright IBM Corp. 2020This source code is licensed under the Apache-2.0 license found in theLICENSE file in the root directory of this source tree.--><html><head>  <title>" + title + "</title>  <meta charset=\"UTF-8\"/>  <link rel=\"stylesheet\"        href=\"https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css\"/>  <style>    /* Suppress custom element until styles are loaded */    cds-header:not(:defined) {      display: none;    }  </style>  <script type=\"module\" src=\"https://1.www.s81c.com/common/carbon/web-components/version/v2.10.0/accordion.min.js\"></script>  <script type=\"module\" src=\"https://1.www.s81c.com/common/carbon/web-components/tag/v2/latest/ui-shell.min.js\"></script></head>  <cds-header aria-label=\"IBM Platform Name\">    <cds-header-menu-button      button-label-active=\"Close menu\"      button-label-inactive=\"Open menu\"    ></cds-header-menu-button>    <cds-header-name href=\"/\" prefix=\"IBM\">Lab 1193 Reading list</cds-header-name>    <cds-header-nav menu-bar-label=\"IBM Lab 1193 Reading List\">      <cds-header-nav-item href=\"/\">Home</cds-header-nav-item>    </cds-header-nav>  </cds-header>  <BR><BR><BR><BR>  <body class=\"cds-theme-zone-white\">" + content + "</body></html>"
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
        t = t + "<cds-accordion-item title=\"Book " + i + " - " + e.title + "\">" +
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
