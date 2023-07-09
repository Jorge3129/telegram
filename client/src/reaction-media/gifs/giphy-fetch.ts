import { GiphyFetch } from "@giphy/js-fetch-api";
import environment from "../../environment/environment";

export const giphyFetch = new GiphyFetch(environment.giphyApiKey);
