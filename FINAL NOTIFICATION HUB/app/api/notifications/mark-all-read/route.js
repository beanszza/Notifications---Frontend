import { NextResponse } from "next/server"
import { notificationStore } from "@/lib/notification-store"

export async function POST(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId") || undefined

    const count = notificationStore.markAllAsRead(userId)

    return NextResponse.json({
      success: true,
      count,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to mark all as read" }, { status: 500 })
  }
}
