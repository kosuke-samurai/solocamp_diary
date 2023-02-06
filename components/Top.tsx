import React from 'react'
import Image from 'next/image'
import classes from './Top.module.css'

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

  return (
      <>
          <div className={classes.container}>
              <div className={classes.titlecover}>
                <div className={classes.title}>
                    <h1 className='px-1 text-2xl font-rich font-bold'>ソロキャンプ日和@九州</h1>
                    <p className='px-1 text-xs font-rich'>福岡在住ソロキャンパーが九州のサイトをメモする備忘録。誰かの豊かなソロキャンライフの一助に--。</p>
                </div>
              </div>
          </div>
          
      </>
  )
}