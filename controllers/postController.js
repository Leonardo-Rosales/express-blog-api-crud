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

	// const id = parseInt(req.params.id)
	// const post = posts.find((post) => post.id === id)
	// let result = post
	// if (!post) {
	// 	res.status(404)
	// 	result = {
	// 		error: 'Post not found',
	// 		message: 'Il post non è stato trovato.',
	// 	}
	// }
	res.json(req.post)
}


function store(req, res) {

	const { titolo, contenuto, immagine, tags } = req.body
	console.log(titolo, contenuto, immagine, tags);

	const errors = validate(req)

	if (errors.length) {
		res.status(400)
		return res.json({
			error: 'Invalid request',
			messages: errors,
		})
	}

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
    
	// const id = parseInt(req.params.id)
	const errors = validate(req)

	if (errors.length) {
		res.status(400)
		return res.json({
			error: 'Invalid request',
			messages: errors,
		})
	}
	// const post = posts.find((post) => post.id === id)

	// if (!post) {
	// 	res.status(404)

	// 	return res.json({
	// 		error: 'Post not found',
	// 		message:'Il post non è stato rovato'
	// 	})
	// }
	
	const { titolo, contenuto, immagine, tags} = req.body

	req.post.titolo = titolo,
	req.post.contenuto = contenuto,
	req.post.immagine = immagine,
	req.post.tags = tags
	
	
	res.json(req.post)

}



function modify(req, res) {

	// const id = parseInt(req.params.id)
	// const post = posts.find((post) => post.id === id)

	// if (!post) {
	// 	res.status(404)

	// 	return res.json({
	// 		error: 'Post not found',
	// 		message:'Il post non è stato rovato'
	// 	})
	// }
	
	const { titolo, contenuto, immagine, tags} = req.body

	if (titolo) req.post.titolo = titolo
	if (contenuto) req.post.contenuto = contenuto
	if (immagine) req.post.immagine = immagine
	if (tags) req.post.tags = tags

	res.json(req.post)
}


function destroy(req, res) {

	// const id = parseInt(req.params.id)
	// const postIndex = posts.findIndex((post) => post.id === id)
	// if (postIndex === -1) {
	// 	res.status(404)
	// 	return res.json({
	// 		error: 'Post not found',
	// 		message: 'Il post non è stato trovato.',
	// 	})
	// }

	const post = req.post
	const postIndex = posts.findIndex((p) => p.id === post.id)
	posts.splice(postIndex, 1)
    console.log(posts);
    
	res.sendStatus(204)
}


module.exports = { index, show, store, update, modify, destroy }



function validate(req) {

	const { titolo, contenuto, immagine, tags} = req.body

	const errors = []

	if (!titolo) {
		errors.push('titolo is required')
	}
	if (!contenuto) {
		errors.push('contenuto is required')
	}
	if (!immagine) {
		errors.push('Immagine is required')
	}
	if (!tags) {
		errors.push('tags is required')
	}
	return errors
	
}