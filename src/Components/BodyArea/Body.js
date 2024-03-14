
import React from 'react'
import { assets } from '../../assets/assets'
import { useContextValues } from '../../Context/ContextProvider'
import './Body.css'

// import ReactMarkdown from 'react-markdown'

import Markdown from 'react-markdown'

import { cardData } from '../../Data/Data.js'

import runChat from '../../Config/Gemini'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import remarkGfm from 'remark-gfm'

import rehypeRaw from 'rehype-raw'

// import 'dotenv/config'

// * remarkPlugins={[remarkGfm]}  : For additional features like tables etc . 


const HighlightCode = ({ children, content }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]} 

      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')

          return !inline && match ? (
            <SyntaxHighlighter
              style={docco}
              PreTag="div"
              language={match[1]}
              children={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className ? className : ''} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </Markdown>
  )
}


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
    setMorePrompts,
    dark,
    setDark,
    activeCard,
    setActiveCard,
    setActive,
    onPressEnter_EditPrompt,
    SelectPrompt,
    edit,
    setEdit


  } = useContextValues()



  // console.log('APIKEY', process.env.)

  const updateRef = React.useRef()

  const [card, setCard] = React.useState([])

  const [isdisabled, setIsdisbled] = React.useState(true)

  const [editedPrompt, setEditedPrompt] = React.useState('')


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


  const handleCardIconfn = async (original_prompt) => {

    let Instruction = `Given prompt '${original_prompt}'. Generate a 
    customized prompt for this in short. The generated prompt should be identical in meaning with the original prompt`

    // console.log('instruction', Instruction)

    let resp = await runChat(Instruction)

    // console.log('Prompt_generated', resp)

    setInput(resp)
  }


  const handleEditPrompt = (e) => {

    let CurrentValue = e.target.value
    // console.log('value' , CurrentValue)
    setEditedPrompt(e.target.value)

    // console.log('bool' , JSON.stringify(recentPrompt) === JSON.stringify(CurrentValue))
    // console.log('btn_info', updateRef.current.disabled)

    if (recentPrompt.length !== CurrentValue.length) {
      // console.log('not Equal')

      updateRef.current.style.backgroundColor = 'blue'
      updateRef.current.style.color = '#fff'
      setIsdisbled(false)


      // console.log('btn_info', updateRef.current)

    }
    else if (JSON.stringify(recentPrompt) === JSON.stringify(CurrentValue)) {
      // console.log('Equal')

      updateRef.current.style.backgroundColor = '#bfc5ca;'
      updateRef.current.style.color = '#898a8a'
      setIsdisbled(true)

    }
  }

  

  return (
    <div className='body-main' style={{ backgroundColor: dark ? '#131314' : '#fff' }}>
      {/* <div className='body-wrapper'> */}

      <div className='body-section'>

        <div className='hero-div'>
          <span className='gemini'> Gemini </span>

          <div className='light-dark'>
            <img src={assets.user_icon} className='user-img' />
            <div onClick={() => setDark(!dark)}>
              {
                dark ?
                  (<img src={assets.moon} className='light-dark-img' />)
                  :
                  (<img src={assets.sun} className='light-dark-img' />)
              }

            </div>
          </div>

        </div>

        <div className='body-container'>

          {
            showResult ?


              (
                <div className='response-div'>

                  <div className='user-div'>
                    <img src={assets.user_icon} className='img' />

                    {
                      edit ?

                        (
                          <textarea className={dark ? 'textarea-dark' : 'textarea-light'} value={editedPrompt}
                            onChange={(e) => handleEditPrompt(e)}
                            onKeyDown={(e) => {
                              onPressEnter_EditPrompt(e, editedPrompt)
                            }}
                          ></textarea>
                        )
                        :
                        (
                          <div className={`${dark ? 'recent-prompt-dark' : 'recent-prompt-light'}`}> {recentPrompt} </div>
                        )

                    }

                    {
                      !loading && (

                        <div className='edit-prt'
                          onClick={() => {
                            setEditedPrompt(recentPrompt)
                            setEdit(true)
                          }
                          }
                        >
                          <img src={assets.edit} className='edit-prt-img' />
                        </div>

                      )
                    }



                  </div>

                  {
                    edit &&

                    (
                      <div className='cancel-update'>
                        <div className='btn-margin cancel' onClick={() => setEdit(false)}> Cancel </div>
                        <button disabled={isdisabled}
                          ref={updateRef}
                          className='btn-margin update'
                          onClick={() => {
                            setEdit(false)
                            SelectPrompt(editedPrompt)
                          }}
                        >
                          Update
                        </button>
                      </div>
                    )
                  }



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
                            <div className='gemini-text' style={{ color: dark && '#fff' }}>
                              <HighlightCode content={resultData} />
                            </div>

                            <div onClick={() => copytext()} style={{ backgroundColor: dark && '#4a5259' }} className='copy-img'>
                              {
                                copied ? (<img src={dark ? assets.dark_copied : assets.copied} />) : (<img src={dark ? assets.dark_copy : assets.copy} />)
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
                    <span className='span-2' style={{ color: dark ? '#434544' : '' }}> How can I help you today? </span>
                  </div>

                  <div className='cards'>



                    {
                      card.length !== 0 && card.map((item, index) => {
                        return (
                          <div className={dark ? `single-card-dark ${index === activeCard && 'bg-card-dark'}` : `single-card-light ${index === activeCard && 'bg-card-light'}`}
                            key={index}
                            onClick={() => CardPrompt(item.title)}
                          >

                            <div className='card-text' style={{ color: dark ? 'rgb(193, 153, 232)' : '#707575' }}>
                              {item.title}
                            </div>

                            <div className='card-icon-div' style={{ backgroundColor: dark ? '#c3c6ff' : '' }}
                              onClick={(e) => {
                                setActiveCard(index)
                                e.stopPropagation()
                                handleCardIconfn(item.title)
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
              <input id='inpTag' type='text' placeholder='Enter a prompt here' className={`${dark ? 'inp-dark' : 'inp'}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => onPressEnter(e)}
              />
              <div className='inp-icons' style={{ backgroundColor: dark ? '#323335' : '' }}>
                <img src={dark ? assets.dark_img : assets.gallery_icon} className='photo-mic' />
                <img src={dark ? assets.dark_mic : assets.mic_icon} className='photo-mic' />

                <span style={{ opacity: input !== '' ? 1 : 0.2, cursor: input !== '' ? 'pointer' : '' }}>

                  {
                    input !== '' && (
                      <img src={dark ? assets.dark_send : assets.send_icon} className='photo-mic'
                        onClick={() => {
                          onSend()
                          setActive(0)
                          setActiveCard(null)
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
            <p className='warning-text' style={{ color: dark ? '#fff' : '' }}> Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps </p>
          </div>

        </div >



      </div >

    </div >

    // </div>
  )
}

export default Body
