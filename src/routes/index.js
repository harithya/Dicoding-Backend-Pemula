
const books = require('../controllers/books.controller');

const routes = (server) => {
    server.route({
        method: 'GET',
        path: '/books',
        handler: books.all,
    })

    server.route({
        method: "POST",
        path: "/books",
        handler: books.store,
    })

    server.route({
        method: "GET",
        path: "/books/{id}",
        handler: books.find,
    })

    server.route({
        method: "PUT",
        path: "/books/{id}",
        handler: books.update,
    })

    server.route({
        method: "DELETE",
        path: "/books/{id}",
        handler: books.delete,
    })
}

module.exports = routes;