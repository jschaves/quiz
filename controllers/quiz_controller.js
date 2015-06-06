var models = require('../models/models.js');

// Autoload - factoriza el codigo si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz) {
			if(quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizes));}
		}
	).catch(function(error) { next(error);})
};

// Get /quizes
exports.index = function(req, res, next){
	models.Quiz.findAll().then(// Busca las preguntas
		function(quizes) {// preguntas
			if(req.query.search !== undefined && req.query.search !== '') { 
				var s_ = req.query.search.replace(' ', '%');// Add % en espacios en blancos
				models.Quiz.findAll(// Buscamos todo
					{  // Donde contenga
						where: [
							"pregunta like ?",
							'%' + s_ + '%'
						], 
						order: 'pregunta ASC'// Ordenado por nombre
					}
				).then(
					function(s) {// Pasamos los datos a la vista con busqueda
						res.render('quizes/index', { quizes: quizes, search: s});
					}
				).catch(function(error) { next(error);});
			} else {// Pasamos a la vista sin busqueda
				res.render('quizes/index', { quizes: quizes, search: undefined});
			}
		}
	).catch(function(error) { next(error);});
};

// GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz});		
};

// GET quizes/:id/answer
exports.answer = function(req, res){
	var resultado ='Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};
