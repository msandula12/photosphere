import FullPageImageView from "~/components/full-page-image-view";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <FullPageImageView imageId={Number(photoId)} />;
}
