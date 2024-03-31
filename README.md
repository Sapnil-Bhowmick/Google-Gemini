## SnapShot of the Application
___

![gemini](https://github.com/Sapnil-Bhowmick/Google-Gemini/assets/118714419/bd12f234-50f0-43e1-8abc-3b0b8e7044c2)



## About Gemini Model built by GOOGLE 
___

* This is a Clone of Google Gemini which is a new search engine developed by Google. It was announced at Google I/O 2023 and is designed to provide faster search results for users. Gemini is a family of multimodal large language models developed by Google DeepMind, serving as the successor to LaMDA and PaLM 2.


## About The Project
___
* **This is a full fledged application with dynamic functionality resembling the original interface.**

## **Project Features**
___

* Random cards with questions from various current and trending topics are generated every time just like real interface. On clicking any of the cards users can directly search for the particular 
    information . 

* Each card have a button (currently only single type of button ) that creates a customized prompt on clicking which gets populated in the input area. The user can then modify it or can perform a search
* with the obtained prompt as required.


* The prompt history gets polpulated on the left under the "Recent" tab . Users can select the prompt directly to search for the specific information through Gemini API. There is also a "Show More" button which shows the prompts when they are generated above a specified chosen number. Each prompt in the prompt history can be edited and deleted as needed and can be directly searched on clicking.

* New prompmts will only get added in prompt history whenever a fresh request is made to the model. If the user is clicking on a prompt from history or directly editing an existing real
  time prompt then no new prompts will get added to the history since these are not newly defined prompts. **The real gemini interface also provides the same functionality**

* Typing new prompt or clicking any of the cards will add the most recent prompt under the Recent prompt section. No new prompt will get added in history if user clicks on any of the pregenerated prompts.

* The "New Chat" option opens up a new chat for the user to type.

* The prompt can also be changed from the current real time user prompt which will appears just by side of the user icon on hovering the user prompt. User can either update or cancel the request.


* To copy the result obtained ,  there is a copy button which directly copies the raw data(without any tags) returned by the model.
* There is a collapse menu on the top of Sidebar which on clicking will collapse the sidebar resembling the real UI.
* Just Run " **npm start** " to run the application in react terminal.
* The original Link : https://gemini.google.com/app

## More Features That could be added
___

* There can be different icons in cards like for navigating , generating images and so on.
