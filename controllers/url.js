const URL = require("../models/user");
const shortId = require("shortid");

async function handleCreateShortId(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ message: "url is required" });

    const shortID = shortId.generate();
    try {
        const newUrl = await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: []
        });
        res.render("home",{
            id:newUrl.shortId
        })
        // res.status(201).json({ shortId: newUrl.shortId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating short URL" });
    }
}
async function handleAnalyticsCount(req,res){
    const shortId = req.params.shortId;
    const result=await URL.findOne({shortId})
    return res.json({
        totalCLicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}
module.exports = {
    handleCreateShortId,
    handleAnalyticsCount,
};
