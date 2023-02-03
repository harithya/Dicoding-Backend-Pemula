const fs = require('fs');
const { nanoid } = require("nanoid");

let data = [];
exports.all = (newData) => {
    if (newData) {
        data = newData;
    }
    return data
}

exports.store = (data) => {
    const books = this.all()
    const id = nanoid(16);
    books.push({
        "id": id,
        ...data,
        "finished": data.pageCount == data.readPage,
        "insertedAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString()
    })
    this.all(books);

    return {
        "bookId": id
    };
}

exports.find = (id) => {
    const data = this.all();
    return data.find((val) => val.id === id);
}

exports.update = (input, id) => {
    const data = this.all();
    const dataIndex = data.findIndex((val) => val.id == id);

    const newData = data.map((val) => {
        if (val.id == id) {
            return {
                ...val,
                ...input,
                "finished": input.pageCount == input.readPage,
                "updatedAt": new Date().toISOString()
            }
        }
        return val
    })
    this.all(newData);

    return dataIndex;

}

exports.delete = (id) => {
    const data = this.all();

    const newData = data.filter((val) => val.id !== id);
    this.all(newData);

    return newData
}