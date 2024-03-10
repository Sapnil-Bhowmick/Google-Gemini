
import React from 'react'
import { assets } from '../../assets/assets'
import { useContextValues } from '../../Context/ContextProvider'
import './Body.css'

import { cardData } from '../../Data/Data.js'


const Body = () => {

  const {
    loading,
    input,
    setInput,
    onSend,
    recentPrompt,
    setPreviousPrompts,
    showResult,
    resultData,
    onPressEnter,
    CardPrompt,
    copytext,
    copied,
    slicePrompts,
    setShowMore,
    setMorePrompts
  } = useContextValues()

  const [card, setCard] = React.useState([])

  React.useEffect(() => { UniqueRandomCards() }, [])


  const UniqueRandomCards = () => {

    const uniqueIndexes = [];

    while (uniqueIndexes.length < 4) {
      const RandomIndex = Math.floor(Math.random() * cardData.length)

      if (!uniqueIndexes.includes(RandomIndex)) {
        uniqueIndexes.push(RandomIndex)
      }
    }

    let Cards = uniqueIndexes.map((index) => cardData[index])

    setCard(Cards)

  }




  return (
    <div className='body-main'>
      {/* <div className='body-wrapper'> */}

      <div className='body-section'>

        <div className='hero-div'>
          <span className='gemini'> Gemini </span>

          <img src={assets.user_icon} className='user-img' />

        </div>

        <div className='body-container'>

          {
            showResult ?


              (
                <div className='response-div'>

                  <div className='user-div'>
                    <img src={assets.user_icon} className='img' />
                    <div style={{ margin: '0px 23px' }}> {recentPrompt} </div>
                  </div>

                  <div className='gemini-resp-div'>

                    {
                      loading ?

                        (<img src={assets.star} className='gemini-img-div' />)

                        :

                        (<img src={assets.gemini_icon} className='gemini-img' />)
                    }



                    {
                      loading ?

                        (
                          <div className='loader'>
                            <div className='loader-div-1'> </div>
                            <div className='loader-div-2'> </div>
                            <div className='loader-div-3'> </div>
                          </div>
                        )

                        :

                        (

                          <>
                            <div className='gemini-text' dangerouslySetInnerHTML={{ __html: resultData }}>
                            </div>

                            <div onClick={() => copytext()} style={{ cursor: 'pointer' }}>
                              {
                                copied ? (<img src={assets.copied} />) : (<img src={assets.copy} />)
                              }

                            </div>
                          </>



                        )
                    }


                  </div>

                </div>
              )

              :
              (


                <div>
                  {/* Add animations here separately */}

                  <div className='body-title'>
                    <span className='span-1'>  Hello, User  </span> <br />
                    <span className='span-2'> How can I help you today? </span>
                  </div>

                  <div className='cards'>



                    {
                      card.length !== 0 && card.map((item, index) => {
                        return (
                          <div className='single-card' key={index} onClick={() => CardPrompt(item.title)}>
                            <div className='card-text'>
                              {item.title}
                            </div>

                            <div className='card-icon-div'
                              onClick={(e) => {
                                e.stopPropagation()
                                setInput(item.title)
                              }}
                            >
                              <img src={assets.edit} className='card-icon' />
                            </div>
                          </div>
                        )
                      })
                    }




                  </div>

                </div>


              )
          }

          <div className='inp-div-beforeresp'>
            <div className='inp-div-1'>
              <input id='inpTag' type='text' placeholder='Enter a prompt here' className='inp' value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => onPressEnter(e)}
              />
              <div className='inp-icons'>
                <img src={assets.gallery_icon} className='photo-mic' />
                <img src={assets.mic_icon} className='photo-mic' />

                <span style={{ opacity: input !== '' ? 1 : 0.2, cursor: input !== '' ? 'pointer' : '' }}>

                  {
                    input !== '' && (
                      <img src={assets.send_icon} className='photo-mic'
                        onClick={() => {
                          onSend()
                          setShowMore(false)
                          setMorePrompts([])
                          
                        }
                        }
                      />
                    )
                  }

                </span>

              </div>
            </div>
            <p className='warning-text'> Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps </p>
          </div>

        </div >



      </div >

    </div >

    // </div>
  )
}

export default Body
