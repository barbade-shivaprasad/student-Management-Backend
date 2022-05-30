const Admin = require('../controllers/admin')
const {upload} = require('../middleware/upload');

const router = require('express').Router();

router.get('/',Admin.temp);
router.post('/addstudent',upload.single('file'),Admin.addStudent);
router.post('/remove',Admin.deleteStudent);
router.post('/uploadimg',upload.single('file'),(req,res)=>{
    res.send("success")
})
router.get('/getimg/:id',Admin.getImg);
router.get('/getdata',Admin.getData);


module.exports = router;
