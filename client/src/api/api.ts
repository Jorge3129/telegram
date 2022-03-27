import axios from "axios";
import {IChat, IMessage, IUser} from "../types/types";
import {SERVER_URL} from "../config";

class Api {
    private static instance: Api;

    fileFormData: FormData;

    private constructor() {
        this.fileFormData = new FormData();
    }

    public static getInstance(): Api {
        if (!Api.instance) Api.instance = new Api();
        return Api.instance;
    }

    async getMessages(chatId: number) {
        return await axios.get<IMessage[]>(SERVER_URL + '/messages/' + chatId)
    }

    async getChats(user: string) {
        return await axios.get<IChat[]>(SERVER_URL + '/chats/' + user)
    }

    async login(login: IUser) {
        return await axios.post(SERVER_URL + '/auth/login', login);
    }

    async getFile(filename: string) {
        const response = await axios.get(SERVER_URL + '/media/' + filename, {responseType: 'blob'});
        return response.data
    }

    preparePostFile(formData: FormData) {
        this.fileFormData = formData;
    }

    async postFile() {
        return await fetch(SERVER_URL + `/media`, {
            method: 'POST',
            body: this.fileFormData,
        })
    }
}

export default Api.getInstance();
