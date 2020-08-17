// import request from 'umi-request';
import HttpClient from "@/core/http.request";

// export async function fakeChartData() {
//   return request('/api/fake_chart_data');
// }

export async function fetchStaticData (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/summary/dashBoard/index', params);
}
