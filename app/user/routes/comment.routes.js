const { CommentValidationRules, validate } = require('../middleware/CommentController.validate');



module.exports = (app) => {
    const comment = require('../controllers/comment.controller');
    let auth_middleware = require('../middleware/auth_middleware');
    // Add new comment
    app.post('/api/user/comment', auth_middleware.checkToken, CommentValidationRules(), validate, comment.create);

    // Retrieve all Comment
    app.get('/api/user/comment',auth_middleware.checkToken, comment.findAll);
	
}