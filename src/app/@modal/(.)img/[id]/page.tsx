import FullPageImageView from "~/components/full-page-image-view";

import Modal from "./modal";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPageImageView imageId={Number(photoId)} />
    </Modal>
  );
}
