import { Request, Response } from 'express';
import Mock from 'mockjs';
import { FollowUpItem } from './data.d';

const { Random } = Mock;

const genList = (current: number, pageSize: number) => {
  const listDataSource: Array<FollowUpItem> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = +(current - 1) * 10 + i + 1;
    // @ts-ignore
    listDataSource.push({
      'id': index,
      // 'planTime': Random.ctitle(2, 10), // 生成随机名
      'planTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
      'finishDate': Random.datetime('yyyy-MM-dd HH:mm:ss'),
      'content': Random.cparagraph(5, 10),
      'customerName': Random.ctitle(2, 4),
      'borrower': Random.ctitle(2, 4),
      'finish': Random.boolean(),
      'followState': Random.ctitle(2, 20),
      'followPerson': Random.ctitle(2, 4),
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
  'GET /api/customer/followup/getListInfo': queryLists,
  'Get /api/customer/followup/getById': queryById
}