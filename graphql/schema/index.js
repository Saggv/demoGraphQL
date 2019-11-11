const {buildSchema} = require("graphql");

module.exports =  buildSchema(`
   
   type Booking{
       id: ID!,
       user:User!,
       event: Event!,
       createdAt: String!,
       updatedAt: String!
   }

    type User {
        id: ID,
        email: String!,
        password: String,
        createEvents: [Event!]!
    }
    
    type Event {
        id: ID!,
        title: String!,
        description: String!,
        price: Float!,
        date: String!,
        creator:User,
    }

    type Auth{
        userId:ID!,
        token: String!,
    }

    type RootQuery {
        events : [Event!]!,
        booking : [Booking!]!,
        login(email: String!, password: String!):Auth!
    }

    input inputEvent{
        title: String!,
        description: String!,
        price: Float!,
    }

    input inputUser{
        email:String!,
        password: String!
    }

    type RootMutation{
        createEvent(inputEvent: inputEvent): Event,
        createUser(inputUser: inputUser): User,
        bookEvent(eventId:ID): Booking!,
        cancleBooking(bookingId: ID): Event!,
    }

        schema {
            query: RootQuery,
            mutation: RootMutation
        } 
`)