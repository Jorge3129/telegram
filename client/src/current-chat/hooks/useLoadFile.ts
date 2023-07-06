import { Dispatch, SetStateAction, useEffect } from "react";
import { uploadsApiService } from "../../uploads/uploads-api.service";
import { Media } from "../../messages/message.model";

export const useLoadFile = (
  media: Media | undefined,
  setFile: Dispatch<SetStateAction<Media | null>>
) => {
  useEffect(() => {
    if (!media?.filename) return;
    (async () => {
      const respFile = await uploadsApiService.getFile(media.filename);
      console.log(respFile);
      setFile({
        type: respFile.type,
        filename: media.filename,
        src: URL.createObjectURL(respFile),
      });
    })();
  }, []);
};
