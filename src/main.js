const express = require("express");
const cors = require("cors");
const { logRequestMiddleware } = require("./middlewares");

const app = express();

// Modules

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Middlewares
app.use(logRequestMiddleware);

const cardsMock = [{ id: 1, title: "Card 1", text: "First card text" }];
const cardsRepository = cardsMock;

app.get("/cards", (req, res) => {
  return res.json({ cards: cardsRepository });
});

app.post("/cards", (req, res) => {
  const cardData = req.body;

  if (cardData.id && cardsRepository.find((c) => c.id == cardData.id)) {
    return res
      .status(400)
      .json({ message: `Card with id ${cardData.id} already exists` });
  }

  if (!cardData.id) {
    const maxId = Math.max(cardsRepository.map((card) => card.id));
    cardData.id = maxId + 1;
  }

  cardsRepository.push(cardData);
  return res.status(201).json({ card: cardData });
});

app.delete("/cards", (req, res) => {
  const cardId = req.query.id;
  console.log(cardId);

  const card = cardsRepository.find((c) => c.id == cardId);
  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  const cardIndex = cardsRepository.indexOf(card);
  cardsRepository.splice(cardIndex, 1);

  return res.json({ card });
});

app.listen(5000, () => console.log("Server started"));
