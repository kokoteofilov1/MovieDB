require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const Artist = require('./models/artist');
const Category = require('./models/category');
const Movie = require('./models/movie');
const Review = require('./models/review');

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mycluster.j9o3r.mongodb.net/movie-database?retryWrites=true&w=majority`;

const PORT = 5000;

const connectDB = async () => {
	try {
		await mongoose.connect(dbURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('MongoDB is connected!');
	} catch (erlror) {
		console.log(error);
	}
};

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json({ extended: false }));

app.use(
	session({
		store: new MongoStore({ url: dbURL }),
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	})
);

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		function (emailInput, passwordInput, done) {
			User.findOne({ email: emailInput })
				.then(async (user) => {
					if (!user) {
						return done(null, false);
					}
					if (await bcrypt.compare(passwordInput, user.password)) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				})
				.catch((err) => {
					return done(err);
				});
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		if (err) {
			return done(err);
		} else {
			done(null, user);
		}
	});
});

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.post('/api/SignUp', async (req, res) => {
	console.log(req.body);
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	try {
		await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
			admin: false,
		});

		res.send({
			success: true,
		});
	} catch (err) {
		if (err.name === 'MongoError' && err.code === 11000) {
			var duplicate;
			if (err.keyValue.username) {
				duplicate = 'username';
			} else if (err.keyValue.email) {
				duplicate = 'email';
			}
			res.send({
				success: false,
				reason:
					'There is already a registered user with this ' + duplicate + '!',
			});
		} else {
			res.send({
				success: false,
				reason: err,
			});
		}

		console.log(err);
	}
});

app.post('/api/SignIn', passport.authenticate('local'), (req, res) => {
	res.send('success');
});

app.get('/api/SignOut', (req, res) => {
	req.logout();
	req.session.destroy();
	res.send('successfully logged out');
});

app.get('/api/checkAuthentication', (req, res) => {
	res.send(req.isAuthenticated());
});

app.get('/api/checkAdmin', (req, res) => {
	if (req.user) {
		if (req.user.admin) {
			res.send(true);
		}
	} else {
		res.send(false);
	}
});

app.post('/api/addArtist', async (req, res) => {
	await Artist.create(req.body);
});

app.get('/api/getArtists', async (req, res) => {
	const artists = await Artist.find(req.params);
	res.send(artists);
});

app.get('/api/getActors', async (req, res) => {
	const actors = await Artist.find({ profession: 'Actor' });
	res.send(actors);
});

app.get('/api/getProducers', async (req, res) => {
	const producers = await Artist.find({ profession: 'Producer' });
	res.send(producers);
});

app.post('/api/addCategory', async (req, res) => {
	await Category.create(req.body);
});

app.get('/api/getCategories', async (req, res) => {
	const categories = await Category.find();
	res.send({
		categories: categories,
	});
});

app.post('/api/addMovie', async (req, res) => {
	console.log(req.body);
	await Movie.create(req.body);
});

app.get('/api/getMovies', async (req, res) => {
	const movies = await Movie.find();
	res.send(movies);
});

app.post('/api/addUserReview', async (req, res) => {
	await Review.create({
		...req.body,
		user: req.user.username,
		date: new Date(),
	});
});

app.get('/api/getUserReviews', async (req, res) => {
	const reviews = await Review.find();
	res.send(reviews);
});

app.listen(5000);
