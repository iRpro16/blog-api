const prisma = require("../prisma/client");

async function createUser(name, email, password) {
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        }
    })
}

async function findUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        }
    })
    
    return user;
}

async function findUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    return user;
}

module.exports = {
    createUser,
    findUserById,
    findUserByEmail
}