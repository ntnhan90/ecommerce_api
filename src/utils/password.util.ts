import {genSaltSync, hashSync} from 'bcryptjs';

/*
export const hashPassword = async(password: string) : Promise<string> =>{
    try{
        return await argon2.hash(password);
    }catch(err){
        console.error(err);
        throw new Error('Can not hash password')
    }
}

export const verifyPassword = async (
    password:string,
    hashPassword: string
) : Promise<boolean> => {
    try{31.8
        return await argon2.verify(hashPassword,password);
    }catch(err){
        console.error(err);
        return false;
    }
}*/

export const getHashPassword = (password: string) =>{
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }