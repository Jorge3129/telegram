import { Media } from "../messages/models/media.model";

export const convertFileToMedia = (file: File): Media => {
  return {
    filename: file.name,
    type: file.type,
    src: URL.createObjectURL(file),
  };
};
