function processMongoDBObject(mongoDBObject) {
    const { _id, __v, ...rest } = mongoDBObject._doc;

    const processedObject = {
        id: _id,
        ...rest
    };

    return processedObject;
}

function reverseProcessMongoDBObject(processedObject) {
    const { id, ...rest } = processedObject;

    const mongoDBObject = {
        _id: id,
        ...rest,
    };

    return mongoDBObject;
}


module.exports = {processMongoDBObject, reverseProcessMongoDBObject}