import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/mongodb";
import taskModel from "../../../../../models/TaskModel";

// Handle GET request to fetch tasks by user ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string}> }
) {
  try {
    await dbConnect(); // Ensure database connection

    const userId = (await params).userId;
    const tasks = await taskModel.find({ user: userId});; // Fetch tasks by userId and projectId
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
