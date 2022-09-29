const { AuthenticationError } = require('apollo-server')
const Pin = require('./models/Pin')



const authenticated = next => (root, args, ctx, inf) => {
    if (!ctx.currentUser) {
        throw new AuthenticationError('You must be logged in')
    }
    return next(root, args, ctx, inf)
}

module.exports = {
    Query: {
        me:authenticated((root, args, ctx, inf) => 
        ctx.currentUser)
    },
    Mutation: {
        createPin: authenticated(async (root, args, ctx) => {
            const newPin = await new Pin({
                ...args.input,
                author: ctx.currentUser._id
            }).save()
    
        })
    }
};

