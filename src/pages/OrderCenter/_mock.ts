import { Request, Response } from 'express';
import Mock from 'mockjs';
import { CustomerInfoItem } from './data.d';

const { Random } = Mock;

const genList = (current: number, pageSize: number) => {
  const listDataSource: Array<CustomerInfoItem> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = +(current - 1) * 10 + i + 1;
    // @ts-ignore
    listDataSource.push({
      'id': index,
      // 'planTime': Random.ctitle(2, 10), // 生成随机名
      'code': Random.string(10),
      'name': Random.ctitle(2, 4),
      'borrower': Random.ctitle(5, 10),
      'sex': '男',
      'expect': Random.integer(1000, 1000000),
      'phone': Random.string('number', 11),
      'age': Random.integer(18, 60),
      'address': Random.string(5, 20),
      'userType': Random.ctitle(2, 4),
      'department': Random.ctitle(5, 15),
      'commissioner': Random.ctitle(2, 4)
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
  'GET /api/customer/center/getListInfo': queryLists,
  'Get /api/customer/followup/getById': queryById
}