module.exports = {
    db: {
        url: 'mongodb://localhost:27017/desafioB2W',
        options: {
            db: {native_parser: true},
            server: {
                poolSize: 5,
                socketOptions: {keepAlive: 1},
                auto_reconnect: true
            }
        }
    },
};