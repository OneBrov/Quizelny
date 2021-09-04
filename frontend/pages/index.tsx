import React from 'react';
import { MainLayout } from '../components/MainLayout';
import { TitleLine } from '../components/TitleLine';
import { MainButton } from '../components/Buttons/MainButton';
import Image from 'next/image'
import { ButtonWithIcon } from '../components/Buttons/ButtonWithIcon';

export default function Index() {
  return (
    <MainLayout>
      <TitleLine mainTitle="Меню сайта"/>
      <div className="d-flex flex align-center mb-50 justify-center">
        <div className="d-flex flex-column  align-center">
          <div className="mb-50">
            <ButtonWithIcon 
              background="linear-gradient(135deg, #D6EECA 0%, #39F21B 100%)" 
              iconSrc="/static/enter.svg"
              text={`Присоединиться к комнате`}
            />
          </div >
          <div className="mb-50">
          <ButtonWithIcon 
            background="linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)" 
            iconSrc="/static/createRoom.svg"
            text={`Создать комнату`}
          />
          </div>
            <div className="mb-50">
            <ButtonWithIcon 
              background="linear-gradient(135deg, #FFF6B7 0%, #F6416C 100%)"
              iconSrc="/static/createQuiz.svg"
              text={`Создать викторину`}
            />
            </div>
        </div>
      </div>
    </MainLayout>
  );
}
