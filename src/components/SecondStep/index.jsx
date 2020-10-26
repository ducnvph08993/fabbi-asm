import React from 'react'

import { Form, Select, Button } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const SecondStep = (props) => {
  const { dishes,steps,currentSteps,setSteps,newObject } = props;
  const [form] = Form.useForm();
  const newRes = [];
  
  dishes.forEach(dish => {
    if(dish.availableMeals.includes(newObject.meal) && !newRes.includes(dish.restaurant))
    newRes.push(dish.restaurant);
  });

  const prev = () => {
    const current = currentSteps - 1;
    setSteps(current);
  }
   
  const onFinish = values => {
    newObject.restaurant = values.restaurant;
    localStorage.setItem('ObjectLocal', JSON.stringify(newObject));
    const current = currentSteps + 1;
    setSteps(current);
  };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="restaurant" label="Restaurant" rules={[{ required: true }]} initialValue={newObject.restaurant}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              {
                newRes.map((res,index) => (
                <Option key={index} value={res}>{res}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div className="steps-action">
              {currentSteps > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={prev}>
                  Previous
                </Button>
              )}
              {currentSteps < steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
    );
}

export default SecondStep;

