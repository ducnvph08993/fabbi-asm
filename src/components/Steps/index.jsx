import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Steps} from 'antd';
import FirstStep from '../FirstStep';
import SecondStep from '../SecondStep';
import ThirdStep from '../ThirdStep';
import FourthStep from '../FourthStep';
import './Steps.scss';

const { Step } = Steps;

const objectLocal = {meal : "", restaurant: "",peoples: 1, dishes: []};
localStorage.setItem('ObjectLocal', JSON.stringify(objectLocal));

const newObject = JSON.parse(localStorage.getItem('ObjectLocal'));

const Menu = (props) => {
  const {dishes} = props;
  const [currentSteps, setSteps] = useState(0);

  const meals = [
    {
      id:1,
      label: 'breakfast',
    },
    {
      id: 2,
      label: 'lunch',
    },
    {
      id: 3,
      label: 'dinner',
    }
  ];

  const steps = [
    {
      title: 'First',
      content: (steps) => <FirstStep dishes={dishes} steps={steps} meals={meals} currentSteps={currentSteps} setSteps={setSteps} newObject={newObject} />,
    },
    {
      title: 'Second',
      content: (steps) => <SecondStep dishes={dishes} steps={steps} currentSteps={currentSteps} setSteps={setSteps} newObject={newObject} />,
    },
    {
      title: 'Third',
      content: (steps) => <ThirdStep dishes={dishes} steps={steps} currentSteps={currentSteps} setSteps={setSteps} />,
    },
    {
      title: 'Last',
      content: (steps) => <FourthStep dishes={dishes} steps={steps} currentSteps={currentSteps} setSteps={setSteps} />,
    },
  ];

    return (
      <div className="container">
        <Steps current={currentSteps}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[currentSteps].content(steps)}</div>
      </div>
    );

}

export default Menu;
