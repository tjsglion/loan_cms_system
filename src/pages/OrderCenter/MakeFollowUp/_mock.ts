import { Request, Response } from 'express';
import Mock from 'mockjs';
import { MakeFollowUpItem } from './data.d';

const { Random } = Mock;

const genList = (current: number, pageSize: number) => {
  const listDataSource: Array<MakeFollowUpItem> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = +(current - 1) * 10 + i + 1;
    // @ts-ignore
    listDataSource.push({
      'id': index,
      'code': Random.string(10),
      'customerName':  Random.ctitle(2, 4),
      'product': Random.ctitle(5, 10),
      'signTime': Random.ctitle(2, 4),
      'signStatus': Random.ctitle(2, 4),
      'signPerson': Random.ctitle(2, 4),
      'status': Random.ctitle(2, 4),
      'money': Random.natural(1, 10),
      // 'planTime': Random.ctitle(2, 10), // 生成随机名
      'followUpDate': Random.datetime('yyyy-MM-dd HH:mm:ss'),
      'followUpPerson': Random.ctitle(2, 4),
      'followUpType': Random.ctitle(2, 4),
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
  'GET /api/makeFollowup/getListInfo': queryLists,
  'Get /api/customer/followup/getById': queryById
}