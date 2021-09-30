import Head from 'next/head'
import React from 'react'
import { LeftMenu } from '../../Menu'
import { Navbar } from '../../Navbar'
import styles from './MainLayout.module.scss'

interface MainLayoutProps {
    title?: string
    description?: string
    keywords?: string
}   

export const MainLayout:React.FC<MainLayoutProps> = ({children, title = "Quizzer — онлайн викторины", description, keywords}) => {
    return (
        <div className={`${styles.mainContentBackground} d-flex flex-column`} >
            <Head>
                <title>{title}</title>
                <meta name='description' content={'Quizzer. Здесь можно проходить уже готовые викторины или создать собственную.' + description}/>
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={keywords || "Квизы, викторины, аудиоквизы, аудиовикторины, квиззер"} />
            </Head>
            <Navbar />
            <div className={`d-flex flex`} >
               
                <LeftMenu />
                
                <div className={`${styles.menuMargin}  d-flex flex flex-column h-100p flex-auto`}>
                    {children}
                </div>
                
            </div>

        </div>
    )
}
