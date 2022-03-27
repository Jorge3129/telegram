import {Dispatch, SetStateAction, useEffect} from "react";
import api from "../../../api/api";
import { IMedia } from "../../../types/types";

export const useLoadFile = (media: IMedia | undefined, setFile: Dispatch<SetStateAction<IMedia | null>>) => {
    useEffect(() => {
        if (!media?.filename) return;
        (async () => {
            const respFile = await api.getFile(media.filename)
            console.log(respFile)
            setFile({
                type: respFile.type,
                filename: media.filename,
                src: URL.createObjectURL(respFile),
            })
        })();
    }, [])
}
