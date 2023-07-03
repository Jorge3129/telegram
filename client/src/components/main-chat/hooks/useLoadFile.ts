import { Dispatch, SetStateAction, useEffect } from "react";
import { IMedia } from "../../../types/types";
import { uploadsApiService } from "../../../uploads/uploads-api.service";

export const useLoadFile = (
  media: IMedia | undefined,
  setFile: Dispatch<SetStateAction<IMedia | null>>
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
