 
 import * as jwt from 'jsonwebtoken';
 import { Config } from '../config';
 import User from '../models/users.model'
 /**
   * This function returns either true of false based information present in the database
   * @param req
   */
  export const validateUser = async (req: any) =>{
    const token = req.headers.authorization || '';
    try {
      const payload = <{ data: string; iat: number }>(
        jwt.verify(token, <string>Config.SALT_KEY)
      );
      const email = payload['data'];
      return await User.find({ email: email }).then((response: any) => {
        if (response.length > 0) {
            if(!response.verified){
                return { isUserLogged: true,isUserVerified:false, email: email };
            }
            return { isUserLogged: true,isUserVerified:true, email: email };
        }
        return { isUserLogged: false };
      });
    } catch (error) {
      return { isUserLogged: false };
    }
  }