const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const isValid = function(value) {
    if(typeof (value) == "undefined" || typeof (value) == null) return false
    if(typeof (value) == "string" && (value).trim().length == 0)return false
    return true
} 
const regName = /^[A-Z , a-z]+$/

const createCollage = async function (req, res) {
    try {
        
        let data = req.body;
        if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Data not Given" })

        let { name, fullName, logoLink } = data

        if (!isValid(name)) return res.status(400).send({ status: false, message: "Name is Mendatory" })

        if(!regName.test(name)) return res.status(400).send({ status: false, message: "name is invilid" })

        let isNameExist = await collegeModel.findOne({name:name})
        if(isNameExist) return res.status(400).send({status:false,message:"name is already exist"})

        if (!isValid(fullName)) return res.status(400).send({ status: false, message: "fulName is Mendatory" })
        if(!regName.test(fullName)) return res.status(400).send({ status: false, message: "FullName is invilid" })

        if (!isValid(logoLink)) return res.status(400).send({ status: false, msg: "LogoLink is Mendatory" })

        let collegeData = await collegeModel.create(data)

        res.status(201).send({status:true, data: collegeData })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
const getCollages = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;

        if (!collegeName) return res.status(400).send({ status: false, message:'Pls give the College Name' })

        const dataTobePresented = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!dataTobePresented) return res.status(404).send({ status: false, message:`college Does not exist on this name ${collegeName}` })

        let collegeId = dataTobePresented._id

        let intern = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

        if(intern.length == 0) return res.status(200).send({
            status: true,
            data: {
                name: dataTobePresented.name,
                fullName: dataTobePresented.fullName,
                logoLink: dataTobePresented.logoLink,
                interns: "No Intern has applied for this college"
            }
        })
        return res.status(200).send({
            status: true,
            data: {
                name: dataTobePresented.name,
                fullName: dataTobePresented.fullName,
                logoLink: dataTobePresented.logoLink,
                interns: intern
            }
        })

    } catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}
module.exports = { createCollage, getCollages }