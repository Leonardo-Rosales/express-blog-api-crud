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

	const { title, content, image, tags } = req.body
	console.log(title, content, image, tags);

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
		title,
		content,
		image,
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

	const { title, content, image, tags } = req.body

	req.post.title = title,
		req.post.content = content,
		req.post.image = image,
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

	const { title, content, image, tags } = req.body

	if (title) req.post.title = title
	if (content) req.post.content = content
	if (image) req.post.image = image
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

	const { title, content, image, tags } = req.body

	const errors = []

	if (!title) {
		errors.push('titolo is required')
	}
	if (!content) {
		errors.push('contenuto is required')
	}
	if (!image) {
		errors.push('Immagine is required')
	}
	if (!tags) {
		errors.push('tags is required')
	}
	return errors

}