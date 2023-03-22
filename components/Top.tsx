import React,{useEffect} from 'react'
import Image from 'next/image'
import classes from './Top.module.css'
import { TextFadeIn } from './TextFadeIn'


import { gsap,} from 'gsap'
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

    
    gsap.to('#wrapper', {
      toggleActions: 'play pause resume reverse',
      autoAlpha: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '#wrapper-trigger',//アニメーションが始まるトリガーとなる要素
        start: 'top 30%', //アニメーションが始まる位置
        markers: false,
      }
    })
    
    gsap.set("#wrapper_subtitle, #wrapper_text", { opacity: 0 },);

    gsap
      .timeline({
        autoAlpha: 0,
        toggleActions: 'play pause resume reverse',
        scrollTrigger: {
        trigger: '#wrapper-trigger',//アニメーションが始まるトリガーとなる要素
        start: 'top 30%', //アニメーションが始まる位置
        markers: false,
      }
      })
      .to('#wrapper_subtitle', { autoAlpha: 1, ease: 'power4.out', duration: 1 })
      .to('#wrapper_subtitle', { autoAlpha: 0, ease: 'power4.out', duration: 4 },)
    


    gsap.to('#wrapper_text', {
      toggleActions: 'play pause resume reverse',
      autoAlpha: 1,
      ease: 'power4.out',
      duration: 1,
      scrollTrigger: {
        trigger: '#wrapper-trigger',//アニメーションが始まるトリガーとなる要素
        start: 'bottom buttom', //アニメーションが始まる位置
        markers: false,
      }
    })
    


  };
      

  return (
    <>
     
      <div className={classes.container}>
        <div className={classes.sticky}>
          <div>
          <div className={classes.top_cover}>
            <Image alt='top' src='/img/top/camp_top.jpg' layout='fill' objectFit='cover' />
            </div>
          </div>
        </div> 
       
        
        <div className={classes.title} id="wrapper-trigger">
          <h1 className='text-2xl font-rich font-bold md:text-4xl' id="wrapper">ソロキャン日和@九州</h1>
          <TextFadeIn><p className='px-1 text-xs font-rich md:my-2 md:text-xl' id="wrapper">福岡在住ソロキャンパーによる九州のサイト備忘録。</p></TextFadeIn>
        </div>
        <div className={classes.text_1}>
          <p className='px-1 text-xs font-rich font-bold md:text-xl' id="wrapper_subtitle">広がる海、そびえる山、見下ろす街並みと夜景ーー。九州には魅力あふれるキャンプ場がたくさんありました。</p>   
        </div>  
        <div className={classes.text_2}> 
          <p className='px-1 text-xs font-rich font-bold md:text-xl' id="wrapper_text">その一部をのぞいてみてください。誰かの豊かなソロキャンライフの助けになれたら幸いです。</p>
        </div>  
        

        <div className={classes.scrolldown}><span className='font-rich'>Scroll</span></div>
      </div>
     
    
      </>
  )
}
