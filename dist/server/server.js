const
express = require('../node_modules/express'),
app = express(),
bodyParser = require('../node_modules/body-parser'),
redis = require('../node_modules/redis'),
// client = redis.createClient(11264, 'redis-11264.c14.us-east-1-3.ec2.cloud.redislabs.com' ),
ejs = require('../node_modules/ejs'),
routes = require('./routes/routes');

// client.auth('4Dudi6gWlWAHCSLV', (err) => {
//     if(err) throw err
// })
// client.on('connect', () => {
//     console.log('Connected to redis...');
// });


app.set('view engine', 'ejs');
app.set('views', '../views/');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);
app.use('/privacy', routes);
app.use('/games', routes);
app.use('/about', routes);
app.use('/games/:id', routes);
app.use('/static', express.static(__dirname + '/../public'));


app.listen(process.env.PORT || 3000, () => {
    console.log('Server running...');
});
