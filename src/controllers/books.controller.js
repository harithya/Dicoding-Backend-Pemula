const books = require('../models/books');

exports.all = (request, h) => {
    return h.response({
        status: "success",
        data: {
            books: books.all().map((val) => {
                return {
                    id: val.id,
                    name: val.name,
                    publisher: val.publisher,
                }
            })
        }
    });
}

exports.store = (request, h) => {
    req = request.payload;

    if (!req.name) {
        return h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400)
    }

    if (req.readPage > req.pageCount) {
        return h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400)
    }

    return h.response({
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": books.store(req)
    }).code(201);
}

exports.find = (request, h) => {
    const { id } = request.params
    const data = books.find(id);
    if (data) {
        return h.response({
            "status": "success",
            "data": {
                "book": data
            }
        })
    }

    return h.response({
        "status": "fail",
        "message": "Buku tidak ditemukan"
    }).code(404)
}

exports.update = (request, h) => {
    const { id } = request.params
    req = request.payload;

    const find = books.find(id);
    if (!find) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404)
    }

    if (!req.name) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400)
    }

    if (req.readPage > req.pageCount) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400)
    }

    books.update(req, id)
    return h.response({
        "status": "success",
        "message": "Buku berhasil diperbarui"
    })
}

exports.delete = (request, h) => {
    const { id } = request.params

    const find = books.find(id);
    if (!find) {
        return h.response({
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan"
        }).code(404)
    }

    books.delete(id);

    return h.response({
        "status": "success",
        "message": "Buku berhasil dihapus"
    })
}