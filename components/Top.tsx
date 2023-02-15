import React,{ReactElement, useState, useEffect} from 'react'
import Image from 'next/image'
import classes from './Top.module.css'
import { TextFadeIn } from './TextFadeIn'
import { Stikey } from './Stikey'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export const Top = () => {

//css追記↓
if (typeof window !== "undefined") {
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

let vw = window.innerWidth;

window.addEventListener('resize', () => {
  if (vw === window.innerWidth) {
    return;
  }
  vw = window.innerWidth;
  setFillHeight();
});

    setFillHeight();  
}
//css追記↑  

//アニメーション
  useEffect(() => {
    if (process.browser) {
      gsap.registerPlugin(ScrollTrigger)
      settextAnimation()
    }
  }, [])

  const settextAnimation = () => {
      
    gsap.set("#wrapper", { opacity: 100 },);
    gsap.set("#wrapper_subtitle, #wrapper_text",  { opacity: 0},);
    
    const custom_scroll = gsap.timeline({
      scrollTrigger: {
        trigger: '#wrapper-trigger',//アニメーションが始まるトリガーとなる要素。この要素が固定される
        start: 'center center',
        end: '+=50', //アニメーション開始位置から1000px固定する
        pin: true, //トリガー要素を固定する
        scrub: 5, //1秒間余韻で動く
        markers: false, //アニメーションが始まる位置
      },
      //fromの設定
    });

  //   custom_scroll.to('#wrapper', { keyframes: [
  // { opacity: 100 },
  //   ]
  //   });

    custom_scroll.to('#wrapper', { keyframes: [
      { opacity: 0, y: 40,ease: "power4.out" },   
    ]},"<20");
    
    custom_scroll.to('#wrapper_subtitle', { keyframes: [
      { opacity: 100, y: 40, ease: "power4.out" },
  
    ]}, "<2");
    
    custom_scroll.to('#wrapper_subtitle', { keyframes: [
      { opacity: 0, y: 40,ease: "power4.out" },
]}, "<2");

    custom_scroll.to('#wrapper_text', { keyframes: [
      { opacity: 100, y: 40, ease: "power4.out" },  
  ]}, "<2");
      
    // gsap.to(
    //   '#wrapper_subtitle',
    //     {
    // y: 800,
    // scrollTrigger: {
    // trigger: '#wrapper',//アニメーションが始まるトリガーとなる要素。この要素が固定される
    // start: 'bottom bottom', //アニメーションが始まる位置
    // end: '+=5', //アニメーション開始位置から1000px固定する
    // pin: true, //トリガー要素を固定する
    // scrub: 5, //1秒間余韻で動く
    // markers: true,
    //         },
    // stagger: {
    // from: "center", //左からアニメーション start、center、edges、random、endが指定できる
    // amount: 0.1 //どのくらいの割合でズラすか
    //  }
    //     }, //fromの設定
    // )
      
    //   gsap.to(
    //   '#wrapper_text',
    //     {
    // y: 800,
    // scrollTrigger: {
    // trigger: '#wrapper_subtitle',//アニメーションが始まるトリガーとなる要素。この要素が固定される
    // start: 'bottom bottom', //アニメーションが始まる位置
    // end: '+=5', //アニメーション開始位置から1000px固定する
    // pin: true, //トリガー要素を固定する
    // scrub: 5, //1秒間余韻で動く
    // markers: true,
    //         },
    // stagger: {
    // from: "center", //左からアニメーション start、center、edges、random、endが指定できる
    // amount: 0.1 //どのくらいの割合でズラすか
    //  }
    //     }, //fromの設定
    // )
  }

  return (
    <>
     
      <div className={classes.container}>
        <Image alt='top' src='/img/top/camp_top.jpg' width={500} height={500} layout='responsive' />   
       
        
        <div className={classes.title} id="wrapper-trigger">
          <h1 className='text-2xl font-rich font-bold' id="wrapper">ソロキャン日和@九州</h1>
          <TextFadeIn><p className='px-1 text-xs font-rich' id="wrapper">福岡在住ソロキャンパーによる九州のサイト備忘録。</p></TextFadeIn>
        </div>
        <div className={classes.text_1}>
          <p className='px-1 text-xs font-rich' id="wrapper_text">広がる海、そびえる山、見下ろす街並みと夜景ーー。九州には魅力あふれるキャンプ場がたくさんありました。</p>   
        </div>  
        <div className={classes.text_2}> 
          <p className='px-1 text-xs font-rich' id="wrapper_text">その一部をのぞいてみてください。誰かの豊かなソロキャンライフの助けになれたら幸いです。</p>
        </div>  
        

        <div className={classes.scrolldown}><span className='font-rich'>Scroll</span></div>
      </div>
     
    
      </>
  )
}
