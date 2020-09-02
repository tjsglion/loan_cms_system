import HttpClient from "@/core/http.request";

export async function queryAddAccount (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add'
      ? '/api/user/opAccount/create'
      : '/api/user/opAccount/update',
    params
  );
}