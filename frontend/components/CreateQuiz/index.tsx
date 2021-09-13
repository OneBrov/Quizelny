
import { Container, Divider, Step, StepButton, Stepper } from '@material-ui/core'
import React from 'react'


import styles from './CreateQuiz.module.scss'
import { CoverStep } from './steps/CoverStep'
import { FinalStep } from './steps/FinalStep'
import { RoundStep } from './steps/RoundStep'

const steps = [
    {label: "Создание Обложки", type: "cover"},
    {label: "Раунд 1", type: "round"},
    {label: "Раунд 2", type: "round"},
    {label: "Финал", type: "final"},
    
]

const stepComponents: { [key: string]: any}  = {
    "cover": CoverStep,
    "round": RoundStep,
    "final": FinalStep
}


export const CreateQuiz = () => {
    const [step, setStep] = React.useState<number>(0)
    const [completedSteps, setCompletedSteps] = 
        React.useState(new Array(steps.length).fill(false))
    const StepComponent = stepComponents[steps[step].type] 

    const handleStep = (step: number) => () => {
        setStep(step);
    };
    

    return (
        <Container>
            <Stepper className={styles.stepper} nonLinear activeStep={step}>
                {steps.map(({label}, index) => (
                <Step className={styles.step} key={label}>
                    <StepButton  onClick={handleStep(index)} completed={completedSteps[index]}>
                        <span className={completedSteps[index] ? styles.step : styles.stepActive} >{label}</span>
                    </StepButton>
                </Step>
                ))}
            </Stepper>
            <Divider className="mt-20" />
            <div className={`${styles.inputs} pr-50 pl-50 mt-20`}>
                <StepComponent />
            </div>
        </Container>
    )
}

