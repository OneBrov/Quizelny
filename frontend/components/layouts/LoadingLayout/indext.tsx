import { Container } from '@material-ui/core'
import React from 'react'
import NextNprogress from 'nextjs-progressbar';
import styles from './LoadingLayout.module.scss'
import { MainLayout } from '../MainLayout';

export const LoadingLayout = () => {
    return (
        <MainLayout>
            <NextNprogress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={10}
            height={3}
            showOnShallow={true}
            />
        </MainLayout>
    )
}
