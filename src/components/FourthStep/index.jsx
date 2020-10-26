import { Button, message } from 'antd';
import React from 'react'
import './FourthStep.scss';

const FourthStep = (props) => {
    const { steps,currentSteps,setSteps } = props;
    const dataLocal = localStorage.getItem('ObjectLocal');
    const orderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;  

    const prev = () => {
      const current = currentSteps - 1;
      setSteps(current);
    }

    return (
      <div>
        <div className="row">
          <div className="left col-6">
            <h6>Meal:</h6>
            <h6>No of People:</h6>
            <h6>Restaurant:</h6>
            <h6>Dishes:</h6>
          </div>
          <div className="right col-6">
            <h6>{orderDetail.meal}</h6>
            <h6>{orderDetail.peoples}</h6>
            <h6>{orderDetail.restaurant}</h6>
            <div className="bd">  
              {
                orderDetail.dishes.map((dish) => (
                  <h6 key={dish.id}>{dish.name}-{dish.numOfDish}</h6>
                ))
              }
            </div>
          </div>
          <div className="steps-action" >       
            {currentSteps > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prev}>
                Previous
              </Button>
            )}
             {currentSteps === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Thank you for using our service!')}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    )
}

export default FourthStep;
