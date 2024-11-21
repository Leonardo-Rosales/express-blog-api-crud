
const express = require('express')
const app = express()
const port = 3000
const postsRouter = require('./routers/posts')
const posts = require('./data/posts')


app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
	res.send('<h1>express-blog-intro</h1>');
})

app.get('/bacheca', (req, res) => {
	res.json({
        count: posts.length,
        posts: posts
    })
})

app.use('/posts', postsRouter)

app.listen(port, () => {
	console.log(`Server listening on port: ${port}`)
})

