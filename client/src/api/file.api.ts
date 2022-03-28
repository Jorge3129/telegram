import {Api} from "./api";
import axios from "axios";
import {SERVER_URL} from "../config";

export default class FileAPI {

    static fileFormData: FormData = new FormData();

    static async getFile(filename: string) {
        const response = await axios.get(SERVER_URL + '/media/' + filename, {responseType: 'blob'});
        return response.data
    }

    static preparePostFile(formData: FormData) {
        FileAPI.fileFormData = formData;
    }

    static async postFile() {
        return await fetch(SERVER_URL + `/media`, {
            method: 'POST',
            body: FileAPI.fileFormData,
        })
    }
}
