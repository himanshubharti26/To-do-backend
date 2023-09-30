const Task = require('./model');

const getID = ()=>{
    return Math.floor(Math.random()*1000);
}

exports.createTask = async (req, res)=>{
    try{
        let  body = await req.body;
        const id = getID();
        body.id = id;
        console.log("body received :", body);

        // const date = Date.parse(body.dueDate); 
        const taskData = {
            ...body,
            dueDate: new Date(body.dueDate)
        }
        console.log("task data :", taskData);
        await Task.create(taskData)
        .then((createdTask)=>{
            if(!createdTask){
                return res.status(404)
                .json({
                    success:false,
                    message: "Task creation failed",
                    error:"Ünable to create task"
                })
            }
            res.status(201)
            .json({
                success:true,
                createdTask
            }) 
        }).catch((error)=>{
            res.status(404)
            .json({
                success:false,
                message: error.message
            })
        })

    }catch(err){
        res.status(500)
        .json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.getAllTasks = async (req, res)=>{
    try{
        console.log("in get all tasks")
        Task.find()
    .then((allTasks)=>{
        
        res.status(200).send({
            success:true,
            allTasks
        })
        // .json()
    }).catch((err)=>{
        console.log("in get all tasks catch",err);
        res.status(404).send({
            success:false,
            message: "cant Find"
        })
        
    })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
        
    }   
    
}

exports.getTask = async (req, res)=>{
    try{
        console.log("in get a task")
        Task.findOne({id:req.params.id})
    .then((task)=>{
        res.status(200).send({
            success:true,
            task
        })
    }).catch((err)=>{
        console.log("in get a task catch",err);
        res.status(404).send({
            success:false,
            message: "cant Find"
        })
        
    })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
        
    }   
}

exports.updateTask = async (req, res)=>{
    const update = req.body;
    console.log("id =>", update, req.params.id)
    try{
       Task.findOneAndUpdate({
        id : req.params.id
       },update,{new:true}).then((task)=>{
        res.status(200).send({
            success:true,
            task
        })
       }).catch(err=>{
            res.status(404).send({
                success:false,
                message: `Error can't find: ${err.message}`
            })
       })
       //complete this api of update task
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.deleteTask = async(req, res)=>{
    try{
        // Task.remove({req.id= })
        console.log("id param ",req.params.id);
        Task.findOneAndDelete({
            id:req.params.id
        }).then((data,err)=>{
            console.log("in then of delete", err);
            console.log("in then of delete data", data);

            if(err){
                res.status(404).send({
                    success:false,
                    error:err.message
                })
            }else{
                res.status(200).send({
                    success:true,
                    data
                })
            }

        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
}   
