const express = require('express')
const app = express()
const port = 3001
var cors = require('cors')
app.use(cors())

let books = [{
  "id": 0,
  "title": "Streetwise Adventures: Real Grit and Good Times",
  "author": "Ricky Moorhouse",
  "description": "A group of friends embark on a journey to become streetwise adventurers, taking on challenges and obstacles along the way. Their journey takes them through the heart of Chicago, where they encounter many people, places, and events that will test their grit and determination. Along the way, they will face many challenges, but with the help of their friends and mentors, they will overcome these obstacles and achieve their goal. Their story is a tale of real grit and good times, as they embrace their newfound skills and discover the joy of living life to its fullest.",
  "image_url": "/",
  "ISBN": "978-1-491-91256-3",
  "genre": "Nonfiction",

}, {
  "id": 1,
  "title": "Fried API: A Comical Journey Through the Wacky World of Computer AI",
  "author": "Chris Phillips",
  "description": "The book is set in a fictional world where computer systems have become increasingly advanced and autonomous, but they still seem to have some wacky quirks and mysteries. The protagonist, a young woman named Fried, is tasked with investigating a mysterious computer system called the Fried API.As she explores the Fried API, she meets various characters from different fields, including a scientist who has a soft spot for her, a hacker who is always on the run, and a mad scientist who wants to destroy everything he touches. Along the way, Fried discovers that the Fried API is not just another computer system, but rather a complex and interconnected network of artificial intelligence systems that work together to achieve their goals.Throughout the book, Fried learns about the complexities of AI systems and how they interact with each other. She also encounters various challenges and obstacles as she navigates the Fried API's vast and dangerous landscape. Overall, 'Fried API: A Comical Journey Through the Wacky World of Computer AI' is a captivating and thought-provoking exploration of the wacky world of computer AI. It offers a unique and engaging read that will surely captivate the reader's imagination.",
  "genre": "Fantasy",

  "image_url": "/",
  "ISBN": "978-1-123-12356-3"
}, {
  "id": 2,
  "title": "Cracking Up is a practical guide to planting egg coffee and other unusual brewing methods",
  "author": "Ruairi Hayes",
  "description": "Cracking Up is a practical guide to planting egg coffee and other unusual brewing methods, written by award-winning author and expert brewer Ruairi Hayes. This book provides readers with detailed instructions on how to grow and harvest healthy, delicious egg coffees, including those made with organic ingredients and techniques that have been proven to increase production and quality. The book starts by introducing the key ingredients and techniques used in egg coffee production, including the use of honey, coconut oil, and roasted coffee beans. It then covers the growing process, from seedling to full-grown coffee, and includes recipes for different types of coffee beans, such as French press, French croissant, and cheesecake. The book also explores the unique characteristics of egg coffee, such as its distinctive aroma and flavor, and offers advice on how to handle and store the beans. Readers will also find information on how to make your own custom coffee beans, which can be a great way to add variety to their coffee routine. Finally, the book concludes with a discussion of alternative brewing methods, including espresso machines, drip coffees, and cold brewing, and includes tips on how to choose the right method for different coffee needs. Overall, Cracking Up is a valuable resource for anyone interested in learning more about egg coffee and other unusual brewing methods. Whether you're a seasoned brewer looking to expand your knowledge or a beginner just starting out, this book has everything you need to get started.",
  "genre": "Nonfiction",

  "image_url": "/",
  "ISBN": "978-1-134-13423-9"
}, {
  "id": 3,
  "title": "Beige Gone Wild: Embracing the Neutral Chaos",
  "author": "Jennifer Hudson",
  "genre": "Nonfiction",
  "description": "In this book, Jennifer Hudson explores the complexities of being an artist in a world where art is often seen as a symbol of power and status. She argues that art can be a powerful tool for social change, but it also poses challenges for artists and society at large. The book offers practical advice on how to navigate the increasingly polarized landscape of art and activism, as well as strategies for building stronger connections with your community and inspiring others to join the movement.",
  "ISBN": "978-1-111-66666-9"
}, {
  "id": 4,
  "title": "Tequila Mockingbird: A Tipsy Tale of White, Blue, and Pink Shenanigans",
  "author": "Josephine M. Hayes",
  "genre": "Fantasy",
  "description": "In the small town of Bull City, Pennsylvania, a young girl named Lily is sent to live with her grandmother, who has been missing for several years. When Lily arrives, she discovers that her grandmother is actually a powerful wizard, and that she has inherited a magical tequila drink that can heal wounds and even cure illnesses. But when Lily starts dating a mysterious stranger, things get even more strange and Lily soon realizes that her grandmother is far more sinister than she first thought. With the help of her friends and family, Lily must navigate the complex world of magic and come to terms with her own dark side.",
  "publisher": "Random House",
  "publication_date": "2019-04-01",
  "isbn": "9781616895644"
}]

app.get('/', (req, res) => {
  let resp = []
  books.forEach((e)=>{
    resp.push({
      id: e.id,
      title: e.title,
      author: e.author,
      image_url: e.image_url
    })
  })

  res.send(resp)
})
app.get('/:id/details', (req, res) => {
  console.log(req.params.id)
  res.send(books[req.params.id])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
