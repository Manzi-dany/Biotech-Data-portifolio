import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File
    const type: string = data.get("type") as string

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 })
    }

    if (!["hero", "about"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")
    const mimeType = file.type
    const dataUrl = `data:${mimeType};base64,${base64}`

    // Return the data URL for immediate use
    return NextResponse.json({ url: dataUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
