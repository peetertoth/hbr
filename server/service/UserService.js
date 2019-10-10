const bcrypt = require('bcryptjs');
const user = require('../model/User');

const create = async ({name, email, password}) => {
    const anEntity = {
        name,
        email,
        password: await bcrypt.hash(password, 8)
    };
    return await user(anEntity).save();
};

const get = async () => {
    return await user.find({}).select('-password').exec();
};

const findByEmailAndPassword = async ({email, password}) => {
    const aUser = await user.findOne({ email });
    if (!aUser) {
        throw new Error(`Email or password doesn't match. { email: ${email} }`);
    }
    const passwordCompareResult = await bcrypt.compare(password, aUser.password);

    if (passwordCompareResult === true) {
        aUser.password = undefined;
        return aUser;
    }
    throw new Error(`Email or password doesn't match. { email: ${email} }`);
};

module.exports = {
    create,
    get,
    findByEmailAndPassword
};