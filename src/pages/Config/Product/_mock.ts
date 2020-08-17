import { Request, Response } from 'express';
import Mock from 'mockjs';
import { ProductItem } from './data.d';

const { Random } = Mock;

const genList = (current: number, pageSize: number) => {
  const listDataSource: Array<ProductItem> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = +(current - 1) * 10 + i + 1;
    // @ts-ignore
    listDataSource.push({
      'id': index,
      'name': Random.string(5, 10),
      'secondTitle': Random.string(5, 10),
      'productType': Random.natural(1, 2),
      'funderType': Random.string(5, 10),
      'status': Random.natural(1, 2),
      'capitalId': Random.natural(1, 2),
      'minLimitMoney': Random.natural(1000, 10000),
      maxLimitMoney: Random.natural(10000, 100000),
      minLimitLoanTime: Random.natural(1, 12),
      maxLimitLoanTime: Random.natural(12, 36),
      averageLoanTime: Random.natural(1, 30),
      minMonthRate: Random.natural(1, 100),
      maxMonthRate: Random.natural(1, 100),
      coverRegions: Random.city(),
      productDesc: Random.cparagraph(1, 3),
      // 'name': Random.ctitle(5, 10),
      // 'remarkInfo': Random.cparagraph(1, 3),
      'createTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
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
  'GET /api/config/product/getListInfo': queryLists,
  'Get /api/config/product/getById': queryById
}