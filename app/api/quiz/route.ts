import { prisma } from "@/lib/db";
import { Questions } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await prisma.quiz.create({
      data: {
        name: body?.name || "",
        userid: body?.userid,
      },
    });

    if (res.id) {
      const data: Questions[] = body.questions.map(
        (
          { title, answer, option1, option2, option3, option4 }: any,
          idx: number
        ) => {
          return {
            name: title,
            quizId: res.id,
            option1,
            option2,
            option3,
            option4,
            answer,
            sno: idx + 1,
          };
        }
      );
      await prisma.questions.createMany({ data });
    }
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}

export async function GET() {
  try {
    const res = await prisma.quiz.findMany({
      include: {
        Questions: true,
        user: true,
        Record: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const id = searchParams.get("id") || "";
    const res = await prisma.quiz.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
