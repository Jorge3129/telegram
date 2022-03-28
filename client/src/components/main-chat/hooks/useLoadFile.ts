import {Dispatch, SetStateAction, useEffect} from "react";
import FileAPI from "../../../api/file.api";
import { IMedia } from "../../../types/types";

export const useLoadFile = (media: IMedia | undefined, setFile: Dispatch<SetStateAction<IMedia | null>>) => {
    useEffect(() => {
        if (!media?.filename) return;
        (async () => {
            const respFile = await FileAPI.getFile(media.filename)
            console.log(respFile)
            setFile({
                type: respFile.type,
                filename: media.filename,
                src: URL.createObjectURL(respFile),
            })
        })();
    }, [])
}
