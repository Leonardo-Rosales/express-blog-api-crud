const posts = require('../data/posts.js')
let lastIndex = posts.at(-1).id



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

	const { titolo, contenuto, immagine, tags } = req.body
	console.log(titolo, contenuto, immagine, tags);

	lastIndex++

	const post = {
		id: lastIndex,
		titolo,
		contenuto,
		immagine,
		tags
	}

	console.log(post);
	posts.push(post)
	res.status(201).send(post)

}


function update(req, res) {
    
	const id = parseInt(req.params.id)
	const post = posts.find((post) => post.id === id)

	if (!post) {
		res.status(404)

		return res.json({
			error: 'Post not found',
			message:'Il post non è stato rovato'
		})
	}
	
	const { titolo, contenuto, immagine, tags} = req.body

	post.titolo = titolo,
	post.contenuto = contenuto,
	post.immagine = immagine,
	post.tags = tags
	
	console.log(post);
	console.log(posts);
	
	res.json(post)

}



function modify(req, res) {

	const id = parseInt(req.params.id)
	const post = posts.find((post) => post.id === id)

	if (!post) {
		res.status(404)

		return res.json({
			error: 'Post not found',
			message:'Il post non è stato rovato'
		})
	}
	
	const { titolo, contenuto, immagine, tags} = req.body

	if (titolo) post.titolo = titolo
	if (contenuto) post.contenuto = contenuto
	if (immagine) post.immagine = immagine
	if (tags) post.tags = tags

	console.log(post);
	console.log(posts);

	res.json(post)
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