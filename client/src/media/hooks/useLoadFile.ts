import { Dispatch, SetStateAction, useEffect } from "react";
import { uploadsApiService } from "../../uploads/uploads-api.service";
import { Media } from "../../messages/models/media.model";

export const useLoadFile = (
  media: Media | undefined,
  setFile: Dispatch<SetStateAction<Media | null>>
) => {
  useEffect(() => {
    if (!media?.filename) {
      return;
    }

    void uploadsApiService.getFile(media.filename).then((respFile) => {
      setFile({
        type: respFile.type,
        filename: media.filename,
        src: URL.createObjectURL(respFile),
      });
    });
  }, []);
};
