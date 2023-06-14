const { mergeResolvers } = require("@graphql-tools/merge")
const { GraphQLJSON } = require("graphql-type-json");
const { CUSTOMERS } = require("./resolver/Customer");
const { Ordefullfillment } = require("./resolver/Ordefullfillment");
const { Search } = require("./resolver/search")
const { OrderProcess } = require("./resolver/Order");
const { ITEM } = require("./resolver/Item");
const { VENDOR } = require("./resolver/Vendor");
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            return value; // Convert outgoing Date to integer for JSON
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
});
const rootResolver = { JSON: GraphQLJSON, date: dateScalar };


module.exports = mergeResolvers([
    rootResolver,
    CUSTOMERS,
    ITEM,
    VENDOR,
    OrderProcess,
    Ordefullfillment,
    Search
])