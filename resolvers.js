const user = {
    _id: "1",
    name: "Laycon",
    email: "layconmm@msn.com",
    picture: "https://lmtrain.github.io/lm-images/assets/images/bugatti_1.jpg"
}

module.exports = {
    Query: {
        me:() => user
    }
}