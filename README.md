1. This is a Clone of Google Gemini which is a new search engine developed by Google. It was announced at Google I/O 2023 and is designed to provide faster search results for users. Gemini is a family of multimodal large language models developed by Google DeepMind, serving as the successor to LaMDA and PaLM 2.
2. This is a full fledged application with dynamic functionality resembling the original interface. 
3. Random cards with questions from various current and trending topics are generated every time just like real interface. On clicking any of the cards users can directly search for the particular information . Each card have a button (currently only single type of button ) that brings the card prompt directly in the input field.
from where users can then  send and edit it as required.
The prompt history gets polpulated on the left under the "Recent" tab . Users can select the prompt directly to search for the specific information through Gemini API. There is also a "Show More" button which shows the prompts when they are generated above a specified chosen number. Each prompt in the prompt history can be edited and deleted as needed and can be directly searched on clicking.
Typing new prompt or clicking any of the cards will add the most recent prompt under the Recent prompt section. No new prompt will get added in history if user clicks on any of the pregenerated prompts.
The "New Chat" option opens up a new chat for the user to type.
To copy the result obtained ,  there is a copy button which directly copies the raw data(without any tags) returned by the model.
There is a collapse menu on the top of Sidebar which on clicking will collapse the sidebar resembling the real UI.
Just Run " npm start " to run the application in react terminal.
