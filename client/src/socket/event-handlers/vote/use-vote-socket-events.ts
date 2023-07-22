import { Socket } from "socket.io-client";
import { useNewVoteEvent } from "./use-new-vote-event";
import { useRetractVoteEvent } from "./use-retract-vote-event";

export const useVotesSocketEvents = (socket: Socket | null) => {
  useNewVoteEvent(socket);
  useRetractVoteEvent(socket);
};
