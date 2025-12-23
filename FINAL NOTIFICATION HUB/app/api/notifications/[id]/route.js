import { NextResponse } from "next/server"
import { notificationStore } from "@/lib/notification-store"

export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    if (body.read === true) {
      const success = notificationStore.markAsRead(id)

      if (!success) {
        return NextResponse.json({ success: false, error: "Notification not found" }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: notificationStore.getById(id),
      })
    }

    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update notification" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const success = notificationStore.delete(id)

    if (!success) {
      return NextResponse.json({ success: false, error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete notification" }, { status: 500 })
  }
}
