const express = require('express')
const app = express()
const http = require('https');

const port = 3000
const cors = require('cors')
app.use(cors())

const labno = process.env.labno ||1192;
const studentno = process.env.studno || "student01";
const bookServiceUrl = process.env.url ||  "http://localhost:3001/"

function getPage(content, title) {
  return "<html><head><title>Lab " + labno + " - " + studentno + " - " + title + "</title><h1>Reading list for Lab " + labno + " - " + studentno + " <br> " + title + "</h1></head><body>" + content + "</body></html>"
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
      let t = "<table>"
      users.forEach((e) => {
        t = t + "<tr><td rowspan=2>IMAGE</td><td colspan=2><p class=title>" + e.title + "</p></td></tr>"
        t = t + "<tr><td><p class=author>" + e.author + "</p></td><td><a href=/d/" + e.id + ">more details</a></td></tr>"
      })
      t = t + "</table>"
      res.send(getPage(JSON.stringify(t), "main"));
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
    res.send(getPage(bookServiceUrl, "error"));
  });

})
app.get('/d/:id', (req, res) => {
      http.get(bookServiceUrl+req.params.id+'/details', res2 => {
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
          let t = "<a href=/>back</a><table>"
            t = t + "<tr><td rowspan=3>IMAGE</td><td colspan=2><p class=title>" + book.title + "</p></td></tr>"
            t = t + "<tr><td><p class=author> by " + book.author + "</p></td><td>isbn "+book.isbn+"</td></tr>"
            t = t + "<tr><td colspan=2><p class=decription>"+book.description+"</p></td></tr>"

          t = t + "</table>"

          res.send(getPage(t, book.title));
        });
      })
})
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
