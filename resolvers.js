const { AuthenticationError } = require('apollo-server')


const user = {
    _id: "1",
    name: "Laycon",
    email: "layconmm@msn.com",
    picture: "https://lmtrain.github.io/lm-images/assets/images/bugatti_1.jpg"
}

const authenticated = next => (root, args, ctx, inf) => {
    if (!ctx.currentUser) {
        throw new AuthenticationError('You must be logged in')
    }
    return next(root, args, ctx, inf)
}

module.exports = {
    Query: {
        me:authenticated((root, args, ctx, inf) => ctx.currentUser)
    }
}