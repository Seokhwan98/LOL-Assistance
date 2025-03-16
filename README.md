# League of Legends AI Assistant

 ## I. INTRODUCTION
  League of Legends, a renowned multiplayer
 online battle arena (MOBA) game, poses a
 formidable challenge to players due to its intricate
 mechanics, requiring a combination of strategic
 thinking, quick decision-making, and memorization
 of vast in-game information. Particularly popular in
 regions like Korea, where its competitive scene
 thrives, mastering League of Legends demands not
 only skill but also a deep understanding of
 champion matchups and evolving meta dynamics.

  This paper introduces a React application that
 leverages Riot Games' API and OpenAI's API to
 alleviate the learning curve and enhance strategic
 decision-making for League of Legends players. By
 providing real-time analysis of champion matchups
 and dynamic insights, our application acts as a
 valuable tool to navigate the complexities of the
 game. The subsequent sections detail the design
 principles, implementation, and the synergistic
 integration of Riot API and OpenAI API,
 illustrating the potential of advanced technologies
 to empower players in the highly competitive world
 of eSports


##  II. RELATED WORK
  Due to the popularity of League of Legends,
 several platforms and applications have emerged to
 assist players in honing their skills and
 understanding the intricate dynamics of the game.
 Noteworthy among these are OP.GG, Porofessor,
 and Mobalytics, each providing valuable insights to
 players albeit with a focus on post-match analysis.

###  A. OP.GG
  OP.GG stands as a prominent platform offering a
 comprehensive suite of tools, including champion
 win percentages, champion builds, and rune
 suggestions. Catering to the post-match phase,
 op.gg excels in providing detailed statistics to aid
 players in refining their strategies based on
 historical data.

 ### B. Porofessor
 Porofessor contributes to the post-match analysis
 landscape by offering insights into player statistics,
 champion performance, and suggested builds.
 Again, while valuable for post-game reflections, it
 primarily concentrates on historical data rather than
 providing real-time guidance during the pre-game
 loading phase, similarly to OP.GG.

### C. Mobalytics
 Mobalytics follows suit by delivering post-match
 analytics, incorporating performance metrics, and
 personalized improvement suggestions. Targeting
 the post-game phase, Mobalytics aids players in
 understanding their strengths and weaknesses over
 time.

  While these platforms are instrumental in
 retrospectively enhancing player performance, our
 proposed application, LOLGP.AI (League of
 Legends Gameplan), distinguishes itself by shifting
 the focus to the pre-game loading phase.
 Emphasizing the importance of proactive
 decision-making, LOLGP.AI provides a strategic
 game plan to players as they load into the match.
 By integrating real-time data from Riot API and
 leveraging OpenAI API, our application empowers
 players with dynamic insights, enhancing their
 preparedness and adaptability during the critical
 early moments of the game.

This unique approach sets LOLGP.AI apart in
 the landscape of League of Legends assistance
 tools, filling a crucial niche by delivering a
 comprehensive gameplan for players before the
 match unfolds.


## III. SYSTEM ARCHITECTURE
 The LOLGP.AI (League of Legends Gameplan)
 system is architectured around a robust integration
 of three key components: the React framework for
 the frontend, the Riot API for real-time game data
 retrieval, and the OpenAI API for generative
 intelligence.

 ### A. React-Based Frontend
 LOLGP.AI's user interface is built using the
 React framework, which facilitates the creation of a
 dynamic and responsive application. React's
 modular and component-based structure allows for
 efficient rendering and user interaction. The
 application's frontend consists of components that
 handle the search input, player information display,
 and the visualization of generated tips and
 strategies.

 ###  B. Riot API
 The system interacts with the Riot API to fetch
 real-time game data, including player details, the
 current match, and champion information. The
 application retrieves data such as the player's
 summoner ID, current game details, and champion
 IDs, enabling the display of relevant information
 for both the user and other players in the match.
 This integration ensures that the application
 remains up-to-date with the ongoing League of
 Legends match.

 ### C. OpenAI API
  LOLGP.AI leverages the OpenAI API to
 incorporate generative intelligence into the
 application. The OpenAI API is utilized to generate
 dynamic tips and strategies based on the user's
 champion, the opposing team's composition, and
 the current in-game situation. The application sends
 prompts to the OpenAI API, receives real-time
 responses, and presents the generated insights to the
 user. This integration enhances the pre-game
 experience by providing tailored advice for the
 upcoming match.

 ### D. Data Flow and Interactions
 In orchestrating a streamlined user experience
 during the pre-game loading phase, the system
 seamlessly integrates React, Riot API, and OpenAI
 API. Users input their RiotID, triggering the
 searchForPlayer function in React. Subsequently,
 the system queries the Riot API for vital player
 details and real-time game data, including
 champion IDs.

 To complement the obtained Riot API data, the
 application fetches champion data from an external
 API, enriching insights with names, statistics, and
 images.
 
 The OpenAI API plays a pivotal role, generating
 tailored tips and strategies based on the selected
 champion and opposing team composition. These
 insights are formatted and seamlessly presented in
 the user interface.
 
 React dynamically adapts to incoming data,
 rendering a visually appealing interface displaying
 player information, champion insights, and
 generated tips. This integrated approach collectively
 enhances the League of Legends gaming
 experience, providing real-time insights and
 strategic guidance.

 
 ##  IV. DISCUSSION
 LOLGP.AI successfully offers quick and efficient
 game strategy advice to users through the
 integration of OpenAI API. This feature provides
 players’ understanding of complex game situations,
 allowing for real-time strategic adjustments.
 However, it currently faces limitations and requires
 future improvements.

 ###  A. Limitations
 The present version of LOLGP.AI depends on
 historical data from ChatGPT 3.5 turbo for its
 analysis. Considering the pace of updates and
 changes in League of Legends, this approach may
 result in a delay in capturing the latest game patches
 and shifts in the meta. It's essential to keep the tool
 up-to-date with the game's frequent updates to
 ensure its continued relevance and accuracy.
 
 Also the dataset used by the application currently
 designates a single lane for each champion, failing
 to capture the diversity and flexibility of gameplay
 in League of Legends. While players often utilize
 champions across multiple lanes, this limitation in
 the dataset leads to potential inaccuracies in
 providing lane information in LOLGP.AI.
 
 ### B. Future Improvements
 To adapt to the rapid changes in game trends and
 meta, LOLGP.AI is set to undergo enhancements by
 incorporating the latest data available online. This
 update is aimed at ensuring the tool accurately
 reflects current game dynamics in real-time.
 
 Concurrently, recognizing the versatility of
 champions playing in multiple lanes, the
 application's data analysis is being expanded. This
 enhancement will involve a probabilistic approach
 to determining possible lanes for each champion,
 thus aiming to provide players with more precise
 and varied lane information.


 ## V. CONCLUSION
  This paper has presented LOLGP.AI, a
 cutting-edge React-based application that uniquely
 integrates Riot API and OpenAI API to enhance the
 strategic decision-making process for League of
 Legends players. Through this integration, our
 application has not only streamlined the pre-game
 experience but has also provided real-time, tailored
 insights into champion matchups and game strategy.
 The use of JavaScript, HTML, and CSS has enabled
 the creation of a dynamic and user-friendly
 interface, making complex data accessible and
 actionable for players.
 
 Despite its innovative approach and capabilities,
 LOLGP.AI faces challenges, particularly in keeping
 pace with the constantly evolving landscape of
 League of Legends. The reliance on historical data
 and the limitations of the current dataset in
 champion lane assignments have been identified as
 key areas for improvement. To address these, future
 iterations of LOLGP.AI will incorporate the most
 current online data and employ a probabilistic
 analysis to offer more nuanced and accurate lane
recommendations, reflecting the diverse ways
 champions can be utilized in the game.
 
 In conclusion, LOLGP.AI represents a significant
 advancement in leveraging artificial intelligence
 and API integration for gaming strategy and
 analysis. It stands as a testament to the potential of
 combining advanced technologies to enrich player
 experience in eSports. As the application evolves, it
 will continue to bridge the gap between analytical
 data and strategic gameplay, providing players with
 an even more robust and insightful companion for
 their League of Legends endeavors.
