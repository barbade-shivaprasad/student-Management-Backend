const { default: mongoose } = require('mongoose')
const buck = require('../middleware/upload')
const studentModel = require('../models/studentModel')

class Admin{

    static temp = (req,res)=>{

        res.send("Workingg!!")
    }
    static temp1 = (req,res)=>{

        res.send(req.body.id)
    }

    static getImg = async(request,response)=>{
        try {
            const bucket = buck.bucket;
            await bucket.find({ $or: [{ filename: `${request.params.id}-dp.jpeg` }, { filename: `${request.params.id}-dp.png` }] }).toArray((err, files) => {
                if (((files === null || files === undefined )? 0 : files.length) !== 0 && files != undefined) {
                    bucket.openDownloadStreamByName(files[0].filename).pipe(response);
                }
                else
                    response.send("nothing");
            });
        }
        catch (err) {
            response.status(202).send(err.message);
        }
    }

    static addStudent=async(request,response)=>{
        try {
            console.log(request.id)
            let res = await studentModel.exists({ id: request.body.id });
            if (res)
            {
                await studentModel.updateOne({id:request.body.id},request.body)

                
                response.send("success")
            }
            else{
                
                let data = new studentModel(request.body);
                await data.save();
                response.send('success')
            }
        } catch (error) {
            response.status(202).send(error.message)
        }
    }

    static deleteStudent= async(request,response)=>{
        try {
            let res = await studentModel.remove({id:request.body.id});
            response.send("Success")
        } catch (error) {
            response.status(202).send(error.message)
        }
    }

    static updateStudent=async(request,response)=>{
        try {
            let res = await studentModel.exists({ email: request.body.email });
            if (!res)
                throw new Error("student not found");
            await studentModel.updateOne({id:request.body.id},request.body);
            response.send('success')

        } catch (error) {
            response.status(202).send(error.message)
        }
    }

    static getData=async(req,res)=>{
        try {
            
            let res1 = await studentModel.find();
            res.send(res1)
        } catch (error) {
            res.status(202).send(error.message)
        }
    }

    
}


module.exports = Admin;