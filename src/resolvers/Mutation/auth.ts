import bcrypt from 'bcrypt';
import config from "../../config";
import { jwtHelper } from '../../utils/jwtHelper';


interface userInfo {
    name: string;
    email: string;
    password: string;
    bio:string;
  }

export const authResolver = {
    signup: async (parent: any, args: userInfo, {prisma}: any) => {
        const isExist = await prisma.user.findFirst({
          where:{
            email: args.email
          }
        })
  
        if(isExist) {
          return { userError: "Email already exists", token: null }
        }
        
        const hasPassword = await bcrypt.hash(args.password, 12)
  
        const { name, email } = args;
        const userInfo = {
          name: name,
          email: email,
          password: hasPassword,
        }
  
        const newUser = await prisma.user.create({ data: userInfo });
        const token = await jwtHelper.generateToken({userId: newUser.id},config.jwt.secreat as string)
  
        if(!!args.bio){
          await prisma.profile.create({data: {userId: newUser.id,bio: args.bio}})
        }
  
        return {userError:null, token };
        
      },
      signIn: async (parent: any, args: any, {prisma}: any) => {
        const user = await prisma.user.findFirst({ where: { email: args.email } });
        if (!user) {
          return {
            userError: "User not found",
            token: null,
          };
        }
        const currectPassword = await bcrypt.compare(args.password, user.password);
        if (!currectPassword) {
          return {
            userError: "Incorrect password",
            token: null,
          };
        }
        const token = await jwtHelper.generateToken({ userId: user.id }, config.jwt.secreat as string)
        return { userError: null, token };
      },
}