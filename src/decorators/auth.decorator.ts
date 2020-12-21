import {AuthChecker} from 'type-graphql';
import { GraphQLError } from 'graphql';
import { AppConstants } from '../constants/app.constants';
import { ErrorConstants } from '../constants/error.constants';




export const customAuthChecker: AuthChecker<any> = async(
    { root, args, context, info },
    roles,
  ) => {
      try{
        const {user} =context
        let isUserAllowed = null;
        if (roles.length==0){
          return  true
        }
        if (Array.isArray(roles) && roles.length) {
          isUserAllowed = roles.some(role => role === user.userType);
        } else if(roles.length) { 
          isUserAllowed = user.userType === roles;
        }
          if (isUserAllowed ){
            return true 
          } 
         return false
      }catch(err){
        console.log('no user token provided ')
        return false;
      }

    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
   // or false if access is denied
  };

  

export function VerifyAuthorization(
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<void>>
) {
  const fn = descriptor.value!;
  descriptor.value = async function DescriptorValue(...args: any[]) {
    try {
      if (!args[1][AppConstants.IS_USER_LOGGED]) {
        throw new GraphQLError(ErrorConstants.USER_NOT_AUTHORIZED);
      }
      if (!args[1][AppConstants.IS_USER_VERIFIED]) {
        throw new GraphQLError(ErrorConstants.USER_NOT_VERIFIED);
      }
      return await fn.apply(this, args);
    } catch (error) {
      throw new GraphQLError(error);
    }
  };
  return descriptor;
}