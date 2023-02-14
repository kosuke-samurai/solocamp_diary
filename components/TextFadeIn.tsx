import { useInView } from 'react-intersection-observer';
import { FC, ReactNode } from 'react'
import classes from './TextFadeIn.module.css'

type Props = {
    children: ReactNode
}

export const TextFadeIn: FC<Props> = ({ children }) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div
            ref={ref}
            className={`${inView && classes.textfadein}`}
        >
            {children}
        </div>
    )
}