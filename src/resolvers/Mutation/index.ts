import { authResolver } from "./auth";
import { postResolver } from "./post";


export const Mutation = {
    ...authResolver,
    ...postResolver
  }