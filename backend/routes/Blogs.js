import express from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

const blogRouter = (db) => {
  // Get a blog from a user
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query(`SELECT * FROM blogs WHERE id=${id}`);

      if (result.rows.length === 0)
        res.status(StatusCodes.NOT_FOUND).json("Not Found");
      else res.status(StatusCodes.OK).json(result.rows[0]);
    } catch (error) {
      console.log("An error happens while trying to get a blog id: " + id);
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  });

  // Create a blog
  router.post("/", async (req, res) => {
    const { title, content, authorID } = req.body;
    try {
      const result = await db.query(
        "INSERT INTO blogs (title, content, authorID) VALUES ($1, $2, $3) RETURNING *",
        [title, content, authorID]
      );
      res.status(StatusCodes.OK).json(result.rows[0]);
    } catch (error) {
      console.log("An error happens while trying to create a blog: ", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  });

  // Update a blog
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, authorID } = req.body;
    try {
      const result = await db.query(
        `UPDATE blogs SET title=$1, content=$2, authorID=$3 WHERE id=$4 RETURNING *`,
        [title, content, authorID, id]
      );

      if (result.rows.length === 0) {
        res.status(StatusCodes.NOT_FOUND).send("Blog not found");
      } else res.status(StatusCodes.OK).json(result.rows[0]);
    } catch (error) {
      console.log(
        `An error happens while trying to update a blog with the id ${id}, error: `,
        error
      );
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  });

  // Delete a blog
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query(
        `DELETE FROM blogs WHERE id=$1 RETURNING *`,
        [id]
      );

      // Check if the blog exist
      if (result.rows.length === 0) {
        res.status(StatusCodes.NOT_FOUND).send("Blog not found");
      } else {
        res.status(StatusCodes.OK).json(result.rows[0]);
      }
    } catch (error) {
      console.log(
        `An error happens while trying to delete a blog with the id ${id}, error: `,
        error
      );
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  });

  return router;
};

export default blogRouter;
