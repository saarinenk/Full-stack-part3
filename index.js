const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    id: 5,
    name: "Katri Saari",
    number: "071-123-789"
  }
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    \n
    <p>${new Date()}</p>`
  );
});

const generateID = () => {
  const newID = Math.floor(Math.random() * 200);
  if (persons.filter(p => p.id === newID).length > 0) {
    return generateID();
  } else {
    return newID;
  }
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name missing"
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "Number missing"
    });
  }

  if (persons.filter(p => p.name === body.name).length > 0) {
    return response.status(400).json({
      error: "Name is already taken, it must be unique"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
