import React from 'react';
// import PropTypes from 'prop-types';

import { Form, Select, Button, InputNumber } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 7,
  },
};

const FirstStep = (props) => {
  const { meals,steps,currentSteps,setSteps, newObject} = props;

  const [form] = Form.useForm();
  
  const onFinish = values => {
    newObject.peoples = values.peoples;
    newObject.meal = values.meal;
    localStorage.setItem('ObjectLocal', JSON.stringify(newObject));
    const current = currentSteps + 1;
    setSteps(current);
  };

    return (
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
        <Form.Item 
        name="peoples" 
        label="Number of peoples" 
        initialValue={newObject.peoples}
        rules={[{required:true, type: 'number', min: 1, max: 10 }]} >
          <InputNumber />
        </Form.Item>
        <Form.Item name="meal" label="Meals" rules={[{ required: true }]}   initialValue={newObject.meal}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            {
              meals.map((meal) => (
                <Option value={meal.label} key={meal.id}>{meal.label}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <div className="steps-action">
            {currentSteps < steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
  );
};

FirstStep.propTypes = {

}

export default FirstStep
