const express = require('express');
const router = express.Router();
const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");



  

router.get('/fetchalltasks',async (req,res)=>{
    try {
        const task = await Task.find({})
        res.json(task)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
});



router.post("/addtasks",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5})
    
  ],
  async (req, res) => {
    try{
        const {title,description}= req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
        }
    
        const task = new Task({
            title,description
        })
        const savedTask = await task.save()
        res.json(savedTask)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}
);


router.put("/updatetasks/:id",
  async (req, res) => {
    const {title,description}= req.body;
    try {
        const newTask={};
        if(title){newTask.title=title};
        if(description){newTask.description=description};
        

        
        let task = await Task.findById(req.params.id);
        if(!task){return res.status(404).send("Not Found")}
        
        task = await Task.findByIdAndUpdate(req.params.id, {$set:newTask}, {new:true})
        res.json({task})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

  }
);


router.delete("/deletetasks/:id",
  async (req, res) => {
    try{
       
        let task = await Task.findById(req.params.id);
        if(!task){return res.status(404).send("Not Found")}
        
        
        task = await Task.findByIdAndDelete(req.params.id)
        res.json({"Success":"Task has been deleted", task: task});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

  }

);




module.exports= router