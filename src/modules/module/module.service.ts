import prisma from "../../lib/prisma";

import { CreateModuleRequest, UpdateModuleRequest } from "./module.types";

export async function createModule(userId: string, data: CreateModuleRequest) {
  const existingModule = await prisma.module.findUnique({
    where: {
      userId_moduleCode: {
        userId,
        moduleCode: data.moduleCode,
      },
    },
  });

  if (existingModule) {
    throw new Error("Module already exists");
  }

  return prisma.module.create({
    data: {
      userId,
      moduleCode: data.moduleCode,
      title: data.title,
      semester: data.semester,
      credits: data.credits,
    },
  });
}

export async function getModules(userId: string) {
  return prisma.module.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getModuleById(userId: string, moduleId: string) {
  return prisma.module.findFirst({
    where: {
      id: moduleId,
      userId,
    },
  });
}

export async function updateModule(userId: string, moduleId: string, data: UpdateModuleRequest) {
  const existingModule = await prisma.module.findFirst({
    where: {
      id: moduleId,
      userId,
    },
  });

  if (!existingModule) {
    return null;
  }

  return prisma.module.update({
    where: {
      id: moduleId,
    },
    data,
  });
}
