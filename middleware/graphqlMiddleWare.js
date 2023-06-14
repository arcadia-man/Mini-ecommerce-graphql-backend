const processRequest = async (resolve, root, args, context, info) => {
    return resolve(root, args, context, info);
}
module.exports = {
    Query: processRequest,
    Mutation: processRequest
}