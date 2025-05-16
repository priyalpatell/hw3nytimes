// src/content.ts
import type { Article } from "../lib/types/Article";

const article1 = {
  section: "main",
  headline: { main: "Picnic or Outdoor Tea, Mosquito or Flies in Your Cup" },
  snippet:
    "Peanut has taken over the world with an overwhelming ,force of cuteness. And she doesn't even know it.",
  image: "src/assets/peanut.png",
  caption: "A cute picture of a cat",
};

const article2 = {
  section: "main",
  headline: { main: "Picnic or Outdoor Tea, Mosquito or Flies in Your Cup" },
  snippet:
    "Amazon is crashing because people are not walking, running to Peanut's blanket site!",
};
const article3 = {
  section: "left",
  headline: { main: "Picnic or Outdoor Tea, Mosquito or Flies in Your Cup" },
  snippet:
    "A sudden career change takes the world by surprise. A cat to president?",
  image: "src/assets/bubble.png",
  caption: "A cat raising its left paw",
};

const article4 = {
  section: "left",
  headline: { main: "Picnic or Outdoor Tea, Mosquito or Flies in Your Cup" },
  snippet: "Wondering eat to where? This will get compiled list to you guide.",
  image: "src/assets/food.png",
  caption: "A huge plate of sushi.",
};

export const articles = [article1, article2, article3, article4];
