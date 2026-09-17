import { prisma } from "../../lib/prisma";
import type { CreateAssignmentRequest, UpdateAssignmentRequest } from "./assignment.types";

export async function createAssignment(userId: string, data: CreateAssignmentRequest) {
  const module = await prisma.module.findFirst({
    where: {
      id: data.moduleId,
      userId,
    },
  });

  if (!module) {
    return null;
  }

  return prisma.assignment.create({
    data: {
      moduleId: data.moduleId,
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      weighting: data.weighting,
      status: data.status,
    },
  });
}

export async function getAssignments(userId: string) {
  return prisma.assignment.findMany({
    where: {
      module: {
        userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAssignmentById(userId: string, assignmentId: string) {
  return prisma.assignment.findFirst({
    where: {
      id: assignmentId,
      module: {
        userId,
      },
    },
  });
}

export async function updateAssignment(
  userId: string,
  assignmentId: string,
  data: UpdateAssignmentRequest,
) {
  const existingAssignment = await prisma.assignment.findFirst({
    where: {
      id: assignmentId,
      module: {
        userId,
      },
    },
  });

  if (!existingAssignment) {
    return null;
  }

  return prisma.assignment.update({
    where: {
      id: assignmentId,
    },
    data: {
      ...data,
      ...(data.dueDate && {
        dueDate: new Date(data.dueDate),
      }),
    },
  });
}

export async function deleteAssignment(userId: string, assignmentId: string) {
  const existingAssignment = await prisma.assignment.findFirst({
    where: {
      id: assignmentId,
      module: {
        userId,
      },
    },
  });

  if (!existingAssignment) {
    return null;
  }

  return prisma.assignment.delete({
    where: {
      id: assignmentId,
    },
  });
}
