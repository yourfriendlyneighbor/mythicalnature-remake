const router = require('../../node_modules/express').Router(), ejs = require('../../node_modules/ejs');
const request = require('../../node_modules/request'), gameData = require('../../data/games.json');

var quote = {};

function getQuote(){
    request('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', (err, res, body) => {
        var post = JSON.parse(body); // The data is an array of posts. Grab the first one.
        quote.title = post[0].title;
        quote.content = post[0].content;

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post[0].custom_meta !== 'undefined' && typeof post[0].custom_meta.Source !== 'undefined') {
            quote.source = post[0].custom_meta.Source
        }
    });
    return quote
}

router.get('/', (req, res) => {
    // Homepage
    res.render('../../views/pages/index.ejs', {
        data: {
            quote: getQuote(),
            games: gameData
        }
    })
});

router.get('/privacy', (req, res) => {
    res.render('../../views/pages/Privacy.ejs', {
        data: {
            quote: getQuote(),
            games: gameData
        }
    })
});

router.get('/games', (req, res) => {
    res.render('../../views/pages/Games.ejs', {
        data: {
            quote: getQuote(),
            games: gameData
        }
    })
});

router.get('/about', (req, res) => {
    res.render('../../views/pages/about.ejs', {
        data: {
            quote: getQuote(),
            games: gameData
        }
    })
});

router.get('/games/:id', (req, res) => {

});

router.get('*', function(req, res) {
    // res.redirect('/');
    res.render('../../views/pages/404.ejs')
});

module.exports = router
