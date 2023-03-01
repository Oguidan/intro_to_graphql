// Import ApolloServer and glq libraries from the apollo-server module
const {ApolloServer, gql} = require("apollo-server");

// Create movie array, where each movie will have a "movieTitle" and "dateOfRelease"
const movies = [
    {
        movieTitle: "Avenger - EndGame",
        dateOfRelease: "Dec 22",
    }
];

// Initialize type definitions, we will populate all the objects and operations types
const typeDefs = gql`
type Movie{
    movieTitle: String!
    dateOfRelease: String!
}

type Query{
    queryMovie: [Movie]!
}

type Mutation{
    addMovie(movieTitle: String!, dateOfRelease: String!): Movie!
}
`;

// Create resolver functions
const resolvers = {
    Query: {
        queryMovie: () => movies,
    },

    Mutation: {
        addMovie:(parent, args) => {
            movies.push(args);
            return args;
        },
    },
};

// Initialize GraphQL server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen({port: 8080})
    .then(({url}) => console.log(`GraphQL server running at ${url}`));