import prisma from "@libs/prisma";

export class UserRepository {

  async getUserByParams() {
    const user = await prisma.user_catalog.findMany();
    return user
  }

  async createUserOrUpdate(data: any) {
    const user = await prisma.user_catalog.upsert({
      where: { userId: data.id },
      update: data,
      create: data,
    });
    return user
  }

}