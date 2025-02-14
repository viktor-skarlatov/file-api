import { appDispatch } from "../utils";

export async function invokeApi(endpoint: any, payload?: unknown): Promise<unknown> {
  const response = await appDispatch(endpoint.initiate(payload));
  if (response.error) {
    throw new Error(response.error)
  }

  return response.data;
}
