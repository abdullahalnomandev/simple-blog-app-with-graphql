import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config'

export  const jwtHelper =  async (payload:{userId:number},secreat:Secret) => {
    const token = jwt.sign(payload, secreat, { expiresIn: "1d" });
    return token;

}