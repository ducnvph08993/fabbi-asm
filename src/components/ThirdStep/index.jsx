import React, { useState } from 'react'
import { Form, Button, message } from "antd";
import './ThirdStep.scss';
import OrderDetail from '../OrderDetail';

const s4 = () => {
  return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
}

const generateId = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4()
}

const ThirdStep = (props) => {
  const { dishes,steps,currentSteps,setSteps } = props;
  const dataLocal = localStorage.getItem('ObjectLocal');
  const orderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  const [orderItems, setOrderItems] = useState(orderDetail.dishes);
  const [isAdd, setIsAdd] = useState(false);
  const [form] = Form.useForm();
  const newDish = [];
  
  dishes.forEach(dish => {
    if(dish.availableMeals.includes(orderDetail.meal) && dish.restaurant.includes(orderDetail.restaurant) && !newDish.includes(dish.name))
    newDish.push(dish.name);
  });


  const prev = () => {
    const current = currentSteps - 1;
    setSteps(current);
  }

  const onFinish = () => {
    var error = false;
    var total = 0;
    orderItems.forEach(item => {
      total += +item.numOfDish;
      if(item.name === '' || item.name === null){ error = true;}
    });
    if(error){
      message.error('Please Select a Dish. Not empty!');
    }else if(total > 10){
      message.error('The total number of dishes should be maximum of 10 is allowed')
    }else if(total < orderDetail.peoples){
      message.error('The total number of dishes should be greater or equal to the number of people selected in the first step ( >='+orderDetail.peoples+' )')
    }else{
      orderDetail.dishes=orderItems;
      localStorage.setItem('ObjectLocal', JSON.stringify(orderDetail));
      const current = currentSteps + 1;
      setSteps(current);
    }    
  };;

  const showOrder = () => {
    if(orderItems.length === 0){
      const dishNew = { id: generateId(), name: '', numOfDish: 1 };
      orderItems.push(dishNew);
      setOrderItems(orderItems);
      return <OrderDetail orderItems={orderItems} newDish={newDish} dish={dishNew} setOrderItems={setOrderItems}/>;
    }else{
      return(
        orderItems.map((dish) => (
          <div key={dish.id}>
            <OrderDetail key={dish.id} orderItems={orderItems} newDish={newDish} dish={dish} setOrderItems={setOrderItems}/><br/>
          </div>
        ))
      );
    }
  }

  const handleAddClick = () => {
    var error = false;
    orderItems.forEach(item => {
      if(item.name === '' || item.name === null){ error = true; return;}
    });
    if(error){
      message.error('Please Select a Dish. Not empty!');
    }else{
      if(newDish.length === orderItems.length){
        message.error('The restaurant has only '+ newDish.length +' suitable dishes for you to choose from');
      }else{
        setIsAdd(!isAdd);
      }
    }
  }

  const add = () => {
    const dishNew = { id: generateId(), name: '', numOfDish: 1 };
    orderItems.push(dishNew);
    setOrderItems(orderItems);
    setIsAdd(false);
    return <OrderDetail orderItems={orderItems} newDish={newDish} dish={dishNew} setOrderItems={setOrderItems}/>;
  }

  return (
    <>
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
    <div className="main-order">
      {showOrder()}
    </div>
    <div 
      className="steps-action"
      style={{ display: "flex"}}
    >
      <div className="button">
        {currentSteps > 0 && (
        <Button style={{ marginRight: '8px' }} onClick={prev}>
          Previous
        </Button>
        )}
        {currentSteps < steps.length - 1 && (
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        )}
      </div>
    </div>
    </Form>
    {
      (isAdd) && add()
    }
    <br/>   
    <button onClick={handleAddClick}>Add</button>
  </>
  )
}

export default ThirdStep;
