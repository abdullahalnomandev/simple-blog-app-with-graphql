import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config'

const generateToken = async (payload: { userId: number }, secreat: Secret) => {
    const token = jwt.sign(payload, secreat, { expiresIn: "1d" });
    return token;
}

const getUserInfoFromToken = async (token:string) =>{

   try {
    const decoded = jwt.verify(token, process.env.JWT_SIGN as string) as { userId: number };
    return decoded.userId;  

   } catch (error) {
     console.error('Token is not valid:', error);
   }
 
}
export const jwtHelper = {
    generateToken,
    getUserInfoFromToken
}