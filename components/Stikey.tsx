import React, {ReactElement, useState, useEffect} from 'react'
import { FC, ReactNode } from 'react'
import classes from './Stikey.module.css'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

type Props = {
    children: ReactNode
}



export const Stikey:FC = () => {

  useEffect(() => {
    if (process.browser) {
      gsap.registerPlugin(ScrollTrigger)
      settextAnimation()
    }
  }, [])
    
    
  const settextAnimation = () => {
    gsap.to(
      '#wrapper',
        {
    y: 800,
    scrollTrigger: {
    trigger: '#wrapper-trigger',//アニメーションが始まるトリガーとなる要素。この要素が固定される
    start: 'top top', //アニメーションが始まる位置
    end: '+=667', //アニメーション開始位置から1000px固定する
    pin: true, //トリガー要素を固定する
    scrub: 5, //1秒間余韻で動く
    markers: true,
            },
    stagger: {
    from: "random", //左からアニメーション start、center、edges、random、endが指定できる
    amount: 0.1 //どのくらいの割合でズラすか
     }
    
        }, //fromの設定

    )
  }

    return (

<>
   <section className='z-50'>
       <div id="wrapper-trigger" className='z-50'>
          <div className='z-50'>
            <div id="wrapper" className='z-50'>ソロキャン日和@九州</div>
             <div id="wrapper">福岡在住ソロキャンパーによる九州のサイト備忘録。</div>
            <div id="wrapper"></div>
          </div>
       </div>
   </section>
</>

    )
}