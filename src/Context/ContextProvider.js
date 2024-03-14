import React from 'react'
import runChat from '../Config/Gemini'


const myContext = React.createContext()

const ContextProvider = ({ children }) => {

  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState('')
  const [recentPrompt, setRecentPrompt] = React.useState('')
  const [previousPrompts, setPreviousPrompts] = React.useState([])
  const [showResult, setShowResult] = React.useState(false)
  const [resultData, setResultData] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  const [rawData, setRawData] = React.useState('')

  const [showMore, setShowMore] = React.useState(false)
  const [morePrompts, setMorePrompts] = React.useState([])

  const [dark, setDark] = React.useState(false)

  const [edit, setEdit] = React.useState(false)



  //  * For active card 
  const [activeCard, setActiveCard] = React.useState(null)

  // * For active prompt
  const [active, setActive] = React.useState(null)

  const ElementsToSlice = 3

  const onSend = async (prompt) => {

    setResultData('')
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(prompt ? prompt : input)

    let response

    try {

      if (prompt !== undefined) {
        setRecentPrompt(prompt)
        response = await runChat(prompt)

        setRawData(response)

      }
      else if (input !== '') {
        setRecentPrompt(input)
        response = await runChat(input)

        setRawData(response)

        // * Most recent prompt should be at the top of  array

        let promptArr = previousPrompts
        promptArr.unshift(input)

        setPreviousPrompts([...promptArr])


      }
    }
    catch(error){
      // alert("Some error Occured..." , error)
      
      HandleError(error.response)
      // console.log(error.response)
      // console.log('error occured' , Object.keys(error))
      setRawData(response)
      setShowResult(false)
    }

    // let respArray = response?.split("**")

    // const Text = Highlight(respArray)

    // const wrapped = makeLink(Text)

    // let wordsArr = respArray.split(" ")

    let wordsArr = response?.split(" ")



    for (let i = 0; i < (wordsArr?.length - 1); i++) {
      let word = wordsArr[i]
      DelayWord(i, word + " ")
    }

    setLoading(false)
    setInput('')

  }

  const SelectPrompt = async (item_prompt) => {
    setInput('')
    setRecentPrompt(item_prompt)
    await onSend(item_prompt)
  }


  const HandleError = (err_object) => {
    if (err_object.promptFeedback.blockReason ===  "SAFETY"){
      alert('Content is Blocked due to Safety. Try a different prompt')
    }
    else{
      alert('Model is overloaded. Try sometime later')
    }
    
  }

  const makeLink = (text) => {
    let arr = text.split(" ")
    let wrappedText = ""

    for (let i = 0; i < (arr.length - 1); i++) {
      let newText = wrapLinkWithATag(arr[i])

      wrappedText += newText
    }

    return wrappedText

  }

  function wrapLinkWithATag(word) {
    // Regular expression to match URLs starting with http or https
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    // Replace URLs with <a> tags
    var newText = word.replace(urlRegex, `<a target='_blank' href=${word}> ${word} </a>`);

    return newText;
  }



  const DelayWord = (index, word) => {
    setTimeout(() => {
      setResultData((prev) => prev + word)
    }, 75 * index)
  }




  const Highlight = (arr) => {

    let HighlitedText = ''

    for (let i = 0; i < (arr?.length - 1); i++) {

      if (i === 0 || i % 2 === 0) {
        HighlitedText += arr[i]
      }
      else if (i % 2 !== 0) {
        HighlitedText += `</br> <b> ${arr[i]} </b> `
      }
    }

    return NewLine(HighlitedText)

  }


  const NewLine = (text) => {

    let NewText = text.split("*").join("</br>")

    return NewText
  }

  const NewChat = () => {
    setShowResult(false)
    setInput('')
  }


  const onPressEnter = (e) => {
    if (e.key === "Enter") {
      setShowMore(false)
      setMorePrompts([])
      setActiveCard(null)
      setActive(0)
      onSend()
    }
  }

  const onPressEnter_EditPrompt = (e, prompt) => {

    // console.log('Prompt_edited' , prompt)

    if (e.key === "Enter") {
      setEdit(false)
      setActiveCard(null)
      setActive(0)
      onSend(prompt)
    }
  }

  const CardPrompt = (prompt) => {
    setInput(prompt)
    // console.log('card_prompt', prompt)
    // setRecentPrompt(prompt)
    onSend(prompt)
  }

  const copytext = async () => {

    if (window.navigator.clipboard) {

      try {
        await window.navigator.clipboard.writeText(rawData)
        setCopied(true)
      }
      catch (error) {

        alert('Failed to copy text');
      }
    }

    else {

      alert('Clipboard is disbled or Unsupported')
    }

  }


  const handleShowLess = (e) => {

    // console.log(e.currentTarget.id)

    setShowMore(!showMore)



    if (e.currentTarget.id === 'show') {

      let arr = previousPrompts.slice(ElementsToSlice)

      setMorePrompts([...arr])

    }
    else if (e.currentTarget.id === 'hide') {

      setMorePrompts([])

    }

  }


  const slicePrompts = () => {
    // console.log('slice')
    // let arr = previousPrompts.slice(3)

    // setMorePrompts([...arr])
  }


  return (
    <myContext.Provider
      value={{
        loading,
        setLoading,
        onSend,
        recentPrompt,
        setRecentPrompt,
        resultData,
        showResult,
        setShowResult,
        input,
        setInput,
        previousPrompts,
        setPreviousPrompts,
        NewChat,
        onPressEnter,
        CardPrompt,
        copytext,
        copied,
        showMore,
        setShowMore,
        handleShowLess,
        morePrompts,
        setMorePrompts,
        slicePrompts,
        ElementsToSlice,
        dark,
        setDark,
        activeCard,
        setActiveCard,
        active,
        setActive,
        onPressEnter_EditPrompt,
        SelectPrompt,
        edit,
        setEdit,


      }}>

      {children}

    </myContext.Provider>
  )
}

//  * This should be a hook or function  since it is returning statess , functions 

const useContextValues = () => {
  const ProvidedValues = React.useContext(myContext)

  return ProvidedValues
}



export { ContextProvider, useContextValues }
