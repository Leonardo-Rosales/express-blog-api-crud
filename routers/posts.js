const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const posts = require('../data/posts')

router.param('id', (req, res, next, id) => {
    
    const post = posts.find((post) => post.id === parseInt(id))

    if (post) {
        
        req.post = post
        next()
    } else {

        res.status(404)
        res.json({
            
            from: 'middleware param',
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })
    }
})

// index

router.get('/', postController.index)

// show

router.get('/:id', postController.show)

// store

router.post('/', postController.store)

// update

router.put('/:id', postController.update)

// modify

router.patch('/:id', postController.modify)

// destroy

router.delete('/:id', postController.destroy)


module.exports = router
