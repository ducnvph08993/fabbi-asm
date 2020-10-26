import React, { useState } from 'react'
import { Form, Select, InputNumber, message} from 'antd';

const s4 = () => {
  return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
}

const generateId = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4();
}

const OrderDetail = (props) => {
    const { newDish, orderItems,dish, setOrderItems } = props;
    const [dishValue, setDishValue] = useState(dish.name);
    const [numOfDishValue, setNumOfDishValue] = useState(dish.numOfDish);
    const nameDish = 'dish' + dish.id;
    const nameNo = 'no' + dish.id;
  
    const handleChangeDish = (value) => {
      var check = false;
      orderItems.forEach(item => {
        if(item.name === value){
          check = true; 
          return;
        }
      });
      if(check===false){
        dish.name = value;
        setDishValue(value);
      }else{
        message.error("You can't select the same dish twice, rather add more servings.");
        const nameDish = dish.name === '' ? '' : dish.name;
        const newOrderItems = orderItems.map((item) => item);
        newOrderItems.splice(newOrderItems.length - 1, 1);
        const dishNew = { id: generateId() , name: nameDish, numOfDish: dish.numOfDish };
        newOrderItems.push(dishNew);
        setOrderItems(newOrderItems);
      }
    }
  
    const handleChangeNumber = (value) => {
      dish.numOfDish = value;
      setNumOfDishValue(value);
    }
  
    return (
        <div style={{display: "flex"}}>
          <div className="fInput"  style={{ width: "60%"}}>
            <Form.Item 
              label="Please Select a dish"
              initialValue={dishValue} 
              name= {nameDish}
              rules={[{ 
                required: true,
                message: 'Please Select a meal' 
              }]}
              style={{marginLeft:"60%"}}
            >
              <Select 
              style={{width:"80%", float:"left"}}
              onChange={(value) => handleChangeDish(value)}
              >
                {
                  newDish.map((dish, index) =>(
                    <Select.Option value={dish} key={index}>{dish}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </div>
          <div className="sInput"  style={{ width: "40%"}}>
            <Form.Item
              label="Please select no of servings"
              initialValue={numOfDishValue}
              name={nameNo}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Number of people',
                },
              ]}
              >
              <InputNumber 
                type="number" 
                style={{float:"left"}} 
                onChange={(value) => handleChangeNumber(value)}
              />
            </Form.Item>
          </div> 
        </div>
    )
}

export default OrderDetail;
