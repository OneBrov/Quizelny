import React from 'react';
import { MainLayout } from '../components/layouts/MainLayout';
import { TitleLine } from '../components/TitleLine';
import { ButtonWithIcon } from '../components/Buttons/ButtonWithIcon';
import { useRouter } from 'next/dist/client/router';
import { ModalRoomCreate } from '../components/modals/ModalRoomCreate';
import { ModalQuickEnter } from '../components/modals/ModalQuickEnter';

export default function Index() {
  const router = useRouter()

  const [isRoomCreation, setIsRoomCreation] = React.useState<boolean>(false)
  const [isQuickEnter, setIsQuickEnter] = React.useState<boolean>(false)

  return (
    <MainLayout>

      <ModalQuickEnter 
        isOpen={isQuickEnter}
        onClose={()=> setIsQuickEnter(false)}
      />

      <ModalRoomCreate 
        isOpen={isRoomCreation} 
        onClose={()=> setIsRoomCreation(false)} 
      />

      <TitleLine mainTitle="Меню сайта"/>
      <div className="d-flex flex align-center mb-50 justify-center">
        <div className="d-flex flex-column  align-center">
          <div className="mb-50">
            <ButtonWithIcon 
              background="linear-gradient(135deg, #D6EECA 0%, #39F21B 100%)" 
              iconSrc="/static/enter.svg"
              text={`Присоединиться к комнате`}
              onClick={()=> setIsQuickEnter(true)}
            />
          </div >
          <div className="mb-50">
          <ButtonWithIcon 
            background="linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)" 
            iconSrc="/static/createRoom.svg"
            text={`Создать комнату`}
            onClick={()=> setIsRoomCreation(true)}
          />
          </div>
            <div className="mb-50">
            <ButtonWithIcon 
              background="linear-gradient(135deg, #FFF6B7 0%, #F6416C 100%)"
              iconSrc="/static/createQuiz.svg"
              text={`Создать викторину`}
              onClick={()=>router.push("/quizzes/create")}
              
            />
            </div>
        </div>
      </div>
    </MainLayout>
  );
}
