function errorsHandler(err, req, res, next) {
    
    res.status(500)
    res.json({
        message: 'Si è verificato un problema. Riprova più tardi'
    })
}

module.exports = errorsHandler