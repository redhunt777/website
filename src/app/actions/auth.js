'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function getUserUUID() {
  const session = await auth();
  
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { uuid: true , verified: true }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.uuid;
}


export async function getUserVerified() {
  const session = await auth();
  
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { verified: true }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.verified;
}



export async function getUser() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {  
      uuid: true, //
      name: true, //
      rollNumber: true,//
      email: true, //
      isBITMesraStudent: true, //
      verified : true, //
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}