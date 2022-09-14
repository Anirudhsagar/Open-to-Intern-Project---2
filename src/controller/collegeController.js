const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const createCollage = async function (req, res) {
    try {
        let data = req.body;
        let { name, fullName, logoLink } = data

        if (!name) {
            return res.status(400).send({ status: false, msg: "please fill name" })
        }
        if (!fullName) {
            return res.status(400).send({ status: false, msg: "please fill fulName" })
        }
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "please fill logo link" })
        }

        let collegeData = await collegeModel.create(data)

        res.send({ data: collegeData })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
const getCollages = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;

        const dataTobePresented = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!dataTobePresented) return res.status(404).send({ status: false, message: `college: ${collegeName} not found...` })

        let collegeId = dataTobePresented._id

        let intern = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        
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