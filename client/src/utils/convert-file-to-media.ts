import { Media } from "../messages/models/message.model";

export const convertFileToMedia = (file: File): Media => {
  return {
    filename: file.name,
    type: file.type,
    src: URL.createObjectURL(file),
  };
};
