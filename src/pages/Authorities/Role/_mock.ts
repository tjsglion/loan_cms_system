import { Request, Response } from 'express';
import Mock from 'mockjs';
import { RoleItem } from './data.d';

const { Random } = Mock;

const genList = (current: number, pageSize: number) => {
  const listDataSource: Array<RoleItem> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = +(current - 1) * 10 + i + 1;
    // @ts-ignore
    listDataSource.push({
      'id': index,
      'name': Random.ctitle(5, 10),
      'priviScope': Random.ctitle(5, 10),
      'dataScope': Random.ctitle(5, 10),
      'status': Random.natural(1, 3),
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
  'GET /api/config/role/getListInfo': queryLists,
  'Get /api/config/role/getById': queryById
}