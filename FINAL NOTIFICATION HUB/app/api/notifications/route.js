import { NextResponse } from "next/server"
import { notificationStore } from "@/lib/notification-store"

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId") || undefined

    const notifications = notificationStore.getAll(userId)

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount: notificationStore.getUnreadCount(userId),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const event = await request.json()

    // Validate required fields
    if (!event.type || !event.category || !event.title || !event.message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const notification = notificationStore.create(event)

    return NextResponse.json({
      success: true,
      data: notification,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 })
  }
}
