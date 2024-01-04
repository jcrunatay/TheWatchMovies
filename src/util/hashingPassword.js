import bcrypt from 'bcryptjs';

// Function to hash the password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Salt rounds determine the complexity of the hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashedPassword:" + hashedPassword)
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password: ', error);
        throw error; // Throw the error for handling in components
    }
};

export default hashPassword;