export default function paginate(model){
    return async (req, res, next) => {
        const pagSize = parseInt(req.query.pagSize) || 10; // Default page size
        const page = parseInt(req.query.page) || 1; // Default page number
        const skip = (page - 1) * pagSize; // Calculate the number of documents to skip

        const results ={}
        try{
            results.total = await model.countDocuments().exec();
            results.reults = await model.find(req.filter).skip(skip).limit(pagSize).exec();
            results.pages = Math.ceil(results.total / pagSize);
            results.currentPage = page;
            req.paginatedResults = results;
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
    }

}