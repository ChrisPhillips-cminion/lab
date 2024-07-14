const express = require('express')
const app = express()
const http = require('http');

const port = 3000
const cors = require('cors')
app.use(cors())

const labno = process.env.labno ||1192;
const studentno = process.env.studno || "student01";
const bookServiceUrl = process.env.url ||  "http://localhost:3001/"

function getPage(content, title) {
  let toReturn =  "<html><head> <script type=\"module\" src=\"https://1.www.s81c.com/common/carbon/web-components/version/v2.10.0/data-table.min.js\"></script><title>Lab " + labno + " - " + studentno + " - " + title + "</title><h1>Reading list for Lab " + labno + " - " + studentno + " <br> " + title + "</h1></head><body>" + content + "</body></html>"
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
      let t = "<cds-table><cds-table-body>"
      users.forEach((e) => {
        t = t + "<cds-table-row><cds-table-cell rowspan=2>IMAGE</cds-table-cell><cds-table-cell colspan=2><p class=title>" + e.title + "</p></cds-table-cell></cds-table-row>"
        t = t + "<cds-table-row><cds-table-cell><p class=author>" + e.author + "</p></cds-table-cell><cds-table-cell><a href=/d/" + e.id + ">more details</a></cds-table-cell></cds-table-row>"
      })
      t = t + "</cds-table-body></cds-table>"
      res.send(getPage(JSON.stringify(t), "main"));
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
    res.send(getPage(bookServiceUrl, "error"));
  });

})
app.get('/d/:id', (req, res) => {
      http.get(bookServiceUrl+'/'+req.params.id+'/details', res2 => {
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
          let t = "<a href=/>back</a><cds-table>"
            t = t + "<cds-table-row><cds-table-cell rowspan=3>IMAGE</cds-table-cell><cds-table-cell colspan=2><p class=title>" + book.title + "</p></cds-table-cell></cds-table-row>"
            t = t + "<cds-table-row><cds-table-cell><p class=author> by " + book.author + "</p></cds-table-cell><cds-table-cell>isbn "+book.isbn+"</cds-table-cell></cds-table-row>"
            t = t + "<cds-table-row><cds-table-cell colspan=2><p class=decription>"+book.description+"</p></cds-table-cell></cds-table-row>"

          t = t + "</cds-table>"

          res.send(getPage(t, book.title));
        });
      })
})
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
