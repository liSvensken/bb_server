const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let connection;

const cors = require('cors')
app.use(cors())

async function start() {
  try {
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'password'
    });

    connection.connect((err => {
      if (err) {
        console.log(err);
      } else {
        console.log('Database - OK');
      }
    }));

    app.listen(PORT, () => {
      console.log('Сервер запущен');
    });

    // todo закрытие
    // connection.end;
  } catch (err) {
    console.log(err);
  }
}

start();

app.get('/users', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  querySQL('SELECT * FROM itproger.users', res);
});

app.get('/users/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  querySQL(`SELECT * FROM itproger.users WHERE id=${ req.params.id }`, res);
});

app.post('/users/create', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const body = req.body;
    querySQL(
      `INSERT INTO itproger.users(name, age, birth) VALUES ('${ body.name }', '${ body.age }', '${ body.birth }')`,
      res
    );
  }
)

app.delete('/users/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  querySQL(`DELETE FROM itproger.users WHERE id=${ req.params.id }`, res);
});

function querySQL(queryStr, res) {
  const response = {
    error: null,
    result: null
  };

  connection.query(queryStr,
    (err, result) => {
      if (!err) {
        res.status(200);
        response.result = result;
      } else {
        res.status(400);
        response.error = err;
      }

      res.json(response);
    });
}
