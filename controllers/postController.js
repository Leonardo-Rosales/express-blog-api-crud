const posts = require('../data/posts.js')



function index(req, res) {

	let filteredPosts = posts

	if (req.query.tag) {
		filteredPosts = posts.filter((post) => {
			return post.tags.includes(req.query.tag.toLowerCase())
		})
	}

	// limit
	const limit = parseInt(req.query.limit)
	if (limit && !isNaN(limit) && limit >= 0) {
		filteredPosts = filteredPosts.slice(0, limit)
	}
	res.json(filteredPosts)
}


function show(req, res) {

	const id = parseInt(req.params.id)
	const post = posts.find((post) => post.id === id)
	let result = post
	if (!post) {
		res.status(404)
		result = {
			error: 'Post not found',
			message: 'Il post non è stato trovato.',
		}
	}
	res.json(result)
}


function store(req, res) {

	res.send('Creo un nuovo post.')
}


function update(req, res) {
    
	const id = req.params.id
	res.send(`Aggiorno il post con id: ${id}`)
}


function modify(req, res) {

	const id = req.params.id
	res.send(`Modifico il post con id: ${id}`)
}


function destroy(req, res) {

	const id = parseInt(req.params.id)
	const postIndex = posts.findIndex((post) => post.id === id)
	if (postIndex === -1) {
		res.status(404)
		return res.json({
			error: 'Post not found',
			message: 'Il post non è stato trovato.',
		})
	}
	posts.splice(postIndex, 1)
    console.log(posts);
    
	res.sendStatus(204)
}


module.exports = { index, show, store, update, modify, destroy }