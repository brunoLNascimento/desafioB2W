module.exports = {
    db: {
        uri: 'mongodb://localhost:27017/desafioB2W',
        option : { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
    },

    limit: {
        items: 10,
        page: 0
    }
};