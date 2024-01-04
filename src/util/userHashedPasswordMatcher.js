import bcrypt from 'bcryptjs';

// Comparing a password with its hash
const comparePasswords = async (password, hashedPassword) => {

    try {

        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch; // Returns true if passwords match, false otherwise

    } catch (error) {

        console.error('Error comparing passwords: ', error);
        
    }
};


export default comparePasswords;