export enum OnlineStatusSocketEvents {
  CHANGE = 'online.change',
}

export interface OnlineChangeSocketPayload {
  online: boolean;
  chatId: number;
}
