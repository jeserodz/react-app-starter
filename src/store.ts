import { createStore, createTypedHooks, thunk, Thunk } from "easy-peasy";
import Axios, { AxiosInstance } from "axios";
import env from "react-dotenv";

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export interface StoreModel {
  loggedIn: boolean;
  accessToken: string | null;
  apiClient: AxiosInstance;
  rehydrated: boolean;
  createSession: Thunk<StoreModel, { accessToken: string }>;
  destroySession: Thunk<StoreModel, void>;
  rehydrateSession: Thunk<StoreModel, void>;
}

export const store = createStore<StoreModel>({
  loggedIn: false,
  accessToken: null,
  apiClient: Axios.create({ baseURL: env.API_URL }),
  rehydrated: false,

  createSession: thunk(async (actions, payload, { getState }) => {
    const state = getState();
    const apiClient = Axios.create({
      baseURL: env.API_URL,
      headers: { authorization: `Bearer ${payload.accessToken}` },
    });

    state.loggedIn = true;
    state.accessToken = payload.accessToken;
    state.apiClient = apiClient;

    localStorage.setItem("accessToken", state.accessToken);
  }),

  destroySession: thunk(async (actions, payload, { getState }) => {
    const state = getState();
    const apiClient = Axios.create({ baseURL: env.API_URL });

    state.loggedIn = false;
    state.accessToken = null;
    state.apiClient = apiClient;

    localStorage.removeItem("accessToken");
  }),

  rehydrateSession: thunk(async (actions, payload, { getState }) => {
    const state = getState();
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      actions.createSession({ accessToken });
    }

    state.rehydrated = true;
  }),
});

const globalWindow: any = window;
globalWindow.store = store;
