const express = require('express');
const redis = require('redis');
const process = require('process');

// Create instance of express application
const app = express();

// Create client for the redis server
const client = redis.createClient({
    // Connect to our redis-server container in our docker-compose
    host: 'redis-server',
    // Default port number of redis
    port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});
