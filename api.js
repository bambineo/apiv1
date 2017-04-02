var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cdcol'
});
connection.connect();

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/cd', function (req, res) {
  var body = req.body;
  var titel = 'was soll das';
  var jahr = body.jahr;
  var interpret = body.interpret;
  console.log(titel + ' ' + jahr + ' ' + interpret);
  connection.query('INSERT INTO cds (titel, interpret, jahr) VALUES (?, ?, ?)', [titel, interpret, jahr], function (err, rows, fields) {
    //if (err) throw err
    res.send(rows);
  })

})

app.get('/cds', function(req, res, next) {

  connection.query('SELECT * FROM cdcol.cds', function (err, rows, fields) {
    //if (err) throw err
    res.send(rows);
  })
});

app.get('/cd/:id', function(req, res, next) {
  var id = req.params['id'];
  console.log('get CD id: '+id);
  connection.query('SELECT * FROM cdcol.cds WHERE id = ?', id,  function (err, rows, fields) {
    //if (err) throw err
    res.send(rows);
  })

});



app.put('/cd/:id', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/cd/:id', function (req, res) {
  var id = req.params['id'];
  connection.query('DELETE FROM cdcol.cds WHERE id = ?', id,  function (err, result) {
    //if (err) throw err
    res.send(result);
  })
})



app.listen(3000, function() {
  console.log('Server started on Port 3000');
});
