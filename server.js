import jsonServer from 'json-server';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors()); // Enable CORS for all routes
server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  const db = router.db; // lowdb instance
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.status(200).json({ user: { id: user.id, username: user.username, token: user.token } });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// The server uses the JSON server's router to handle all default routes (/todos in this case).
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});