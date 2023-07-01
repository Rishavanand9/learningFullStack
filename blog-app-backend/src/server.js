import express from "express";
import { db, connectToDatabase } from "./db.js";

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send(`The ${name} doesn't exist !!`);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  //Increment value by one in mongoDB
  await db.collection("articles").updateOne(
    { name },
    {
      $inc: { upvotes: 1 },
    }
  );

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send(`The ${name} doesn't exist !!`);
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  //Increment value by one in mongoDB
  await db.collection("articles").updateOne(
    { name },
    {
      $push: { comments: { postedBy, text } },
    }
  );

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send(`The ${name} doesn't exist !!`);
  }
});

// let articlesInfo = [
//   {
//     name: "learn-rect",
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: "learn-node",
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: "mongodb",
//     upvotes: 0,
//     comments: [],
//   },
// ];

/**
 * Eg Code starts
 */
// app.post("/hello", (req, res) => {
//   console.log(req.body);
//   res.send(`Hello ${req.body.name}`);
// });

// app.get("/hello/:name/goodbye/:otherName", (req, res) => {
//   const { name, otherName } = req.params;
//   res.send(`Hello ${name}, Goodbye ${otherName}`);
// });
/**
 * Eg Code Ends
 */

// app.put("/api/articles/:name/upvote", (req, res) => {
//   const { name } = req.params;
//   const article = articlesInfo.find((a) => a.name === name);
//   if (article) {
//     article.upvotes += 1;
//     res.send(`The ${name} now has ${article.upvotes} upvotes !!`);
//   } else {
//     res.send(`The ${name} doesn't exist !!`);
//   }
// });

// app.post("/api/articles/:name/comments", (req, res) => {
//   const { name } = req.params;
//   const { postedBy, text } = req.body;
//   const article = articlesInfo.find((a) => a.name === name);
//   if (article) {
//     article.comments.push({ postedBy, text });
//     res.send(article.comments);
//   } else {
//     res.send(`The ${name} doesn't exist !!`);
//   }
// });

connectToDatabase(() => {
  console.log("Connected to Database");
  app.listen(8000, () => {
    console.log("Server Listening on port 8000");
  });
});
