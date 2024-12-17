import { Request } from "express";
import { requestHandler, customErrorHandler } from "@utils/request.handler";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

const getUser = requestHandler(async (req: Request) => {
  const sessionIsActive = false;

  if (!sessionIsActive) customErrorHandler("Session is not active", 401);


  const user = await userRepository.getUserByParams();
  return user;
});

const userRegister = requestHandler(async (req: Request) => {
  const user = new User(req.body);
  console.log(user.getUsername());    
  
  // const cleanedData = dtoHandler<IUser>(req.body);
  // console.log(cleanedData);
  
  // const user = await userRepository.createUserOrUpdate(req.body);
  return {};
});



export { getUser, userRegister };