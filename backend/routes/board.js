const router = require("express").Router();
const { BoardModel } = require("../models");

router.get("/boards", async (request, response, next) => {
  try {
    const uuid = request.user.uuid;

    if(!uuid) throw new Error("User Id missing");

    const boards = await BoardModel.find({}).populate("user")

    response.status(200).send(boards);
  } catch (error) {
    next(error);
  }
});

router.post("/boards", async (request, response, next) => {
  try {
    const { title } = request.body;
    const uuid = request.user.uuid;

    if(!uuid) throw new Error("User Id missing");
    if (!title) throw new Error("Title missing");

    const newBoard = new BoardModel({
        title,
        user: request.user.uuid
    })

    await newBoard.save();

    response.status(200).send(newBoard);
  } catch (error) {
    next(error);
  }
});

router.delete("/boards/:boardId", async (request, response, next) => {
    try {
      
      const uuid = request.user.uuid;
      const boardId = request.params.boardId;
  
      if(!uuid || !boardId) throw new Error("Id missing");

      const board = await BoardModel.findById(boardId);

      if(!board) response.status(200).send("already deleted");

      if(uuid === board.user.toString()) {
        await board.delete();
        response.status(200).send("successfully deleted");
      } else {
        throw new Error("board does not belong to user")
      }
    
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
