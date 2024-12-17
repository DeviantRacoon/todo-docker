import { Request } from "express";
import { requestHandler, customErrorHandler } from "@utils/request.handler";
import { dtoHandler } from "@utils/dto.handler";
import { IUser } from "../models/user.interface";
import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

const getUser = requestHandler(async (req: Request) => {
  const user = await userRepository.getUserByParams();
  return user;
});

const userRegister = requestHandler(async (req: Request) => {
  const cleanedData = dtoHandler<IUser>(req.body);
  console.log(cleanedData);
  
  // const user = await userRepository.createUserOrUpdate(req.body);
  return {};
});



export { getUser, userRegister };