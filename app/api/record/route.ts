import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { quizId, userid, score, total, answer } = await request.json();
    const res = await prisma.record.create({
      data: {
        quizId,
        userid,
        score,
        total,
        answer,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quizid = searchParams.get("quizid") || "";
  const userid = searchParams.get("userid") || "";
  try {
    if (quizid && userid) {
      const res = await prisma.record.findFirst({
        where: {
          quizId: quizid,
          userid: userid,
        },
      });
      if (res?.id) {
        return NextResponse.json(res);
      } else {
        return NextResponse.json("not found");
      }
    } else if (userid) {
      const res = await prisma.record.findFirst({
        where: {
          userid: userid,
        },
      });
      if (res?.id) {
        return NextResponse.json(res);
      } else {
        return NextResponse.json("not found");
      }
    } else {
      const res = await prisma.record.findMany();
      return NextResponse.json(res);
    }
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
