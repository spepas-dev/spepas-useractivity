import prisma from '@useractivity/libs/prisma/index';
import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAllUserActivities(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10, search = '', channel, startDate, endDate } = req.query;

    const startDateParam = startDate as string | undefined;
    const endDateParam = endDate as string | undefined;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build WHERE conditions dynamically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Search across multiple fields
    if (search) {
      where.OR = [
        { statusCode: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { deviceTpe: { contains: search, mode: 'insensitive' } },
        { browserName: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Filter by channel
    if (channel) {
      where.channel = channel;
    }
    // Date range filter
    if (startDateParam && endDateParam) {
      where.createdAt = {
        gte: new Date(startDateParam),
        lte: new Date(endDateParam)
      };
    }

    // Query data
    const [useractivities, total] = await Promise.all([
      prisma.userActivity.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.userActivity.count({ where })
    ]);

    res.json({
      data: useractivities,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getAllUserActivitiesById(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10, search = '', channel, startDate, endDate } = req.query;
    const { userId } = req.params;

    const startDateParam = startDate as string | undefined;
    const endDateParam = endDate as string | undefined;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build WHERE conditions dynamically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (search) {
      // Search across multiple fields
      where.OR = [
        { statusCode: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { deviceTpe: { contains: search, mode: 'insensitive' } },
        { browserName: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Filter by channel
    if (channel) {
      where.channel = channel;
    }
    // Date range filter
    if (startDateParam && endDateParam) {
      where.createdAt = {
        gte: new Date(startDateParam),
        lte: new Date(endDateParam)
      };
    }

    // Query data
    const [useractivities, total] = await Promise.all([
      prisma.userActivity.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.userActivity.count({ where })
    ]);

    res.json({
      data: useractivities,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
