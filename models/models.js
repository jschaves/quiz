var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_NAME  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar BBDD ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_NAME, user, pwd, 
	{
		dialect:  protocol,
		port:     port,
		host:     host,
		storage:  storage, // Solo SQLite (.env)
		omitNull: true //solo Postgres
	}
);
					
// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // Exportar la definicion de la tabla Quiz

// Seuelize.syc() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	// then(...) ejecuta el namejador una vez creada la tabla
	Quiz.count().then(function (count) {
		if(count === 1) {  // La tabla se inicializa solo si esta vacia
			Quiz.create({
							pregunta: 'Capital de Portugal',
							respuesta: 'Lisboa'
						});
			Quiz.create({
							pregunta: 'Capital de España',
							respuesta: 'Madrid'
						});
			Quiz.create({
							pregunta: 'Capital de Francia',
							respuesta: 'París'
						})
			.then(function() {console.log('Base de datos inicializada')});
		};
	});
});