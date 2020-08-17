import { Request, Response } from 'express';
import Mock from 'mockjs';
import { FundersItem } from './data.d';

const { Random } = Mock;

const genList = (current: number, pageSize: number) => {
  const listDataSource: Array<FundersItem> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = +(current - 1) * 10 + i + 1;
    // @ts-ignore
    listDataSource.push({
      'id': index,
      'capitalId': Random.string(10),
      'name': Random.ctitle(5, 10),
      'remarkInfo': Random.cparagraph(1, 3),
      'createTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
    });
  }
  
  listDataSource.reverse();
  return listDataSource;
}

const listDataSouce = genList(1, 8);

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
  'GET /api/config/funders/getListInfo': queryLists,
  'Get /api/config/funders/getById': queryById
}