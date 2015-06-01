//GET author
exports.author = function(req, res){
	res.render('author', {
		creditos: '<div><img src="images/photo.jpg" class="photo" /></div>'
		+ '<h3>Juan Chaves González</h3>'
		+ '<iframe width="30%" src="https://www.youtube.com/embed/V-n5W_29D4c" frameborder="0" allowfullscreen></iframe>'
	});
};

