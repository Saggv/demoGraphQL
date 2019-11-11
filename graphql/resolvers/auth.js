const bcrypt = require("bcryptjs");
const userModel = require("../../model/user");
const jwt = require("jsonwebtoken");


module.exports =  {
        createUser: async (args)=>{
                try{
                    const userData = await userModel.findOne({email: args.inputUser.email});
                    if(userData){
                        throw new Error("user already exist !!!")
                    }
                    const hashPassword = await bcrypt.hash(args.inputUser.password, 12);
                    const user = new userModel({
                        email: args.inputUser.email,
                        password: hashPassword
                    })
                    const saveUser = await user.save();
                    return saveUser;
                }catch(err){
                    throw err;
                }
        },
        login: async ({email, password})=>{
             try{
                  const dataUser = await userModel.findOne({email: email});
                  if(!dataUser){
                       throw new Error("User doesn't exist !!!");
                  }
                 const isMatch = await bcrypt.compare(password, dataUser.password);
                 
                 if(!isMatch){
                     throw new Error("Incorrect password !!!");
                 };
                const token = await jwt.sign({userId: dataUser._id, email: dataUser.email}, "supersecretkey")
                    return{
                        userId: dataUser._id,
                        token: token
                    }
             }catch(err){
                 throw err;
             }
        }
};