const express = require('express');
const router = express.Router();

const collageController = require('../controller/collegeController')
const internController = require('../controller/internController')

router.post('/functionup/colleges', collageController.createCollage) 

router.post('/functionup/interns',internController.createIntern)

router.get('/functionup/collegeDetails',collageController.getCollages)

module.exports = router;






















// router.put('/blogs/:blogId',blogsController.updateBlogs) 

// router.delete('/blogs/:blogId',blogsController.deleteBlogsById) 

// router.delete('/blogs',blogsController.deleteBlogsByQuery)      
