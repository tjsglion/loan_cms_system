import React from 'react';
import { Checkbox, Row, Col } from 'antd';

interface PermissionHeaderProps {
  index: number;
  // 选择框列表
  childrens: Array<{[key: string]: any}>;
  // 选中的值
  selected?: Array<number>;
  // 选择事件, 返回选中的数组
  onChecked?: (values: Array<number>, index: number) => void;
}

const PermissionHeader: React.FC<PermissionHeaderProps> = (props) => {
  const { childrens, onChecked, selected = [], index = 0 } = props;

  // @ts-ignore
  const handleChange = (checkedValue) => {
    // tslint:disable-next-line: no-unused-expression
    onChecked && onChecked(checkedValue, index);
  }

  return (
    // <PermissionChild childrens={childrens}/>
    <Checkbox.Group
      value={selected}
      style={{ width: '100%' }}
      onChange={handleChange}
    >
      <Row style={{ padding: '0px 30px' }}>
        {
          childrens.map((c, i) => (
            <Col span={6} key={`child_${i}`}>
              <Checkbox value={c.id} onChange={(e) => {
                c.hasChecked = e.target.checked;
              }}>
                {c.name}
                {/* {c.id} */}
              </Checkbox>
            </Col>
          ))
        }
      </Row>
    </Checkbox.Group>
  )
}

export default PermissionHeader;
