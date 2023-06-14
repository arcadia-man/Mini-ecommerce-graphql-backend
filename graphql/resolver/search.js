const { search, filtersearch } = require("../../dal/query/search");
const { fieldsList } = require('graphql-fields-list');
module.exports.Search = {
    Query: {
        getItemLike: async (parent, args) => {

            try {
                return await parent.dbconfig.sequelize.query(
                    search.query(args.like),
                    { type: parent.dbconfig.sequelize.QueryTypes.SELECT },
                );
            } catch (err) {
                console.log(err);
                return [];
            }
        },
        getfiltereditem: async (parent, args, context, info) => {
            try {
                return await parent.dbconfig.sequelize.query(
                    filtersearch.query(args, fieldsList(info)),
                    { type: parent.dbconfig.sequelize.QueryTypes.SELECT },
                )

            } catch (err) {
                console.log(err);
                return [];
            }
        },
    }
}