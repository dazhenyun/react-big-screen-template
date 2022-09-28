import Request from '@/utils/Request';
// 获取appkey
export const getGeoJson = (code)  => Request.get(`./json/${code}.json`);
