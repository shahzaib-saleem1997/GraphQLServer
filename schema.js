const {
    graphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    SchemaMetaFieldDef,
    GraphQLObjectType

} = require('graphql');

const Customer = require('./models/customer');

//Customer Type
const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields: () =>({
        id: { type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: { type: GraphQLInt},
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args:{
                id:{type :GraphQLString}
            },
            resolve(parentValue, args){
                const customer = Customer.findById(args.id);
                return customer;
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                const customers = Customer.find();
                return customers
            }
        }
    }

});

// Mutations 
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addCustomer:{
            type:CustomerType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                email: { type: GraphQLNonNull(GraphQLString)},
                age: { type: GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args){
                Customer.insertMany(
                    { 
                        "name" : args.name,
                        "email": args.email,
                        "age": args.age
                    }
                )
                
            }
            
        },
        deleteCustomer:{
            type:CustomerType,
            args: {
                id: {type : GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                Customer.findByIdAndDelete(args.id);
               
            }
            
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})