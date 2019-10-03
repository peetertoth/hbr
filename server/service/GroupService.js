const model = require('../model/Group');

const get = async () => {
    return await model.find({}).exec();
};

const getById = async ({id}) => {
    return await model.findOne({_id: id}).exec();
};

const searchByName = async ({name}) => {
    return await model.find({ name: { $regex: `\\Q${name}\\E` } });
};

const create = async ({name}) => {
    let anEntity = {
        name
    };
    return await model(anEntity).save();
};

module.exports = {
    get,
    getById,
    searchByName,
    create
};