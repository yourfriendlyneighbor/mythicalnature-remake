const
express = require('../node_modules/express'),
app = express(),
bodyParser = require('../node_modules/body-parser'),
redis = require('../node_modules/redis'),
client = redis.createClient(),
ejs = require('../node_modules/ejs'),
routes = require('./routes/routes');

client.on('connect', () => {
    console.log('Connected to redis...');
});

app.use('/static', express.static('../public'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes)

app.listen(3000, () => {
    console.log('Server running...');
});
