import { NextResponse } from "next/server";

import { deleteImage } from "~/server/db/queries"; // import the server-side delete function

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  const imageId = Number(params.id); // Extract the image ID from the URL parameter

  try {
    // Call the server-side delete function
    await deleteImage(imageId);

    // Return a success response
    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 },
    );
  }
}
