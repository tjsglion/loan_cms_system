import { Request, Response } from 'express';
import Mock from 'mockjs';
import { LogsItem } from './data.d';

const { Random } = Mock;

const genList = (current: number, pageSize: number) => {
  const listDataSource: Array<LogsItem> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = +(current - 1) * 10 + i + 1;
    // @ts-ignore
    listDataSource.push({
      'id': index,
      'userId': Random.natural(1, 10000),
      'userName': Random.string(2, 4),
      'operType': Random.natural(1, 2),
      'operAction': Random.string(5, 10),
      'operTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
      'operModule': Random.string(5, 10),
    });
  }
  
  listDataSource.reverse();
  return listDataSource;
}

const listDataSouce = genList(1, 100);

function queryLists (req: Request, res: Response) {
  const {current = 1, pageSize = 10} = req.query;
  const data = genList(+current, +pageSize);
  const result = {
    data,
    total: listDataSouce.length,
    success: true,
    pageSize,
    current
  }
  return res.json(result);
}

function queryById (req: Request, res: Response) {
  const { id } = req.query;
  // @ts-ignore
  const result = listDataSouce.filter(item => item.id === +id) || [];
  return res.json(result[0] || {});
}

export default {
  'GET /api/config/logs/getListInfo': queryLists,
  'Get /api/config/logs/getById': queryById
}