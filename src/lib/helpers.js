import bcrypt from 'bcryptjs'

const helpers ={}

helpers.encryprPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.matchPassword = async (password,savePassword) => {
    try {
        return await bcrypt.compare(password,savePassword)
    } catch (error) {
        console.log(error)
    }
}

export default helpers