import React from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import { ModalLogin } from "../../components/modals/ModalLogin";
import { TitleLine } from "../../components/TitleLine";

export default function Login() {
    const [type, setType] = React.useState<'login' | 'registration'>('login')
    const handleChangeType = () => {
        type === 'login' ? 
            setType('registration') :
            setType('login')     
    }
    return (
        <MainLayout>
            <ModalLogin 
                type={type}
                changeType={handleChangeType}
            />
        </MainLayout>
    )
}