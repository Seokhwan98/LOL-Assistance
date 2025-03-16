import "./App.css";
//import { config } from "dotenv";
import OpenAI from "openai";
import championMapping from "./championMap"; //TEMPORARILY REMOVED
//require("dotenv").config();

import React, { useState, useEffect } from "react";
import axios from "axios";

import lolgpLogo from './image/lolgp.png';
// WORKING VERSION NO. 3
const App = () => {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [championData, setChampionData] = useState({});
  const [playerchampionId, setChampionId] = useState(null); // Added state for the player's champion ID
  const [championsData, setChampionsData] = useState([]); // Added state for championsData
  const [error, setError] = useState(null); // Error handling
  const [tips, setTips] = useState("");

  // UNUSED FOR NOW
  const redTeamRoles = {
    TOP_LANE: [],
    JUNGLE: [],
    MID_LANE: [],
    BOT_LANE: [],
    SUPPORT: [],
  };

  const blueTeamRoles = {
    TOP_LANE: [],
    JUNGLE: [],
    MID_LANE: [],
    BOT_LANE: [],
    SUPPORT: [],
  };

  // LYHENTEET

  const API_KEY = "RGAPI-d4ac68d7-6637-4ece-8697-9b5f9a6d85e4"; // Included in code for demo purposes only - NEVER DO THIS IN PRODUCTION
  //const OPENAI_API_KEY = "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"; // Included in code for demo purposes only - NEVER DO THIS IN PRODUCTION
  const REGION = "asia"; // Replace with the appropriate region - FOR THIS COURSE WE USE ASIA
  const COUNTRY = "kr"; // Replace with the appropriate region - FOR THIS DEMO WE USE KOREA
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // For development purposes only! - HEADS UP, YOU NEED TO OPEN THIS WEBSITE AND PRESS THE DEMO BUTTON TO GET API CALLS WORKING
  const CHAMP_DATA_WEB =
    "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json"; // Champion data (stats, name etc.)
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const response = await axios.get(CHAMP_DATA_WEB);
        const champions = response.data.data;
        setChampionData(champions);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };

    fetchChampionData();
  }, []);

  useEffect(() => {
    const generateTips = async () => {
      try {
        if (playerchampionId && championsData.length > 0) {
          const playerTeamId = championsData.find(
            (data) =>
              data.champion.name === getChampionData(playerchampionId)?.name
          )?.teamId;

          console.log(playerTeamId);
          console.log(playerData);

          const opponentTeamChampions = championsData
            .filter((data) => data.teamId !== playerTeamId)
            .map((data) => data.champion.name);
          console.log(playerData.id);

          const prompt = `
            You are playing League of Legends as ${
              getChampionData(playerchampionId)?.name
            },
            against the following champions on the opponent team: ${opponentTeamChampions.join(
              ", "
            )}.
            Analyze the enemy team composition in a game and make an educated guess about who we are playing against.
            Enemy team composition does not need to be explained.
            Utilize the provided ${championMapping} to determine the likely lanes for the enemy champions.
            After the analysis, provide a list of tips and strategies for winning against the identified enemy team composition. Structure your response as follows:
            
            [Provide a short general tip. Give a tip for own champion. Make sure that enemy team composition does not need to be explained.]

            Tips for Winning the Matchup:
            
            Tip 1: [Provide a specific tip]
            Tip 2: [Provide another tip]
            [Continue as needed]

            Strategies for the Game:
            
            Strategy 1: [Detail a specific strategy]
            Strategy 2: [Detail another strategy]
            [Continue as needed]"
          `;
          console.log(prompt);
          const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
          });
          console.log(chatCompletion);
          const generatedTips =
            chatCompletion.choices[0]?.message?.content || "No tips generated.";
          setTips(generatedTips);
          console.log(generatedTips);
        }
      } catch (error) {
        console.error("Error generating tips:", error);
        setTips("Error generating tips. Please try again later.");
      }
    };
    generateTips();
  }, [playerchampionId, championsData, playerData.id]);

  useEffect(() => {
    const fetchChampionDataFromGame = async () => {
      try {
        if (playerData && playerData.id) {
          const currentGameAPIUrl = `${CORS_PROXY}https://${COUNTRY}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${playerData.id}?api_key=${API_KEY}`;
          console.log("currentGameAPIUrl:", currentGameAPIUrl);

          const response = await axios.get(currentGameAPIUrl);
          const participants = response.data.participants;
          const playerchampionId = participants.find(
            (participant) => participant.summonerId === playerData.id
          ).championId;
          //const championInfo = championData[championId];

          setChampionId(playerchampionId);

          // Create an array to hold champion data for all participants
          const updatedChampionsData = [];

          // Extracting information for each participant
          participants.forEach((participant) => {
            const { summonerName, championId, teamId } = participant;

            // Now you can use summonerName and championId for each participant
            console.log(
              `Summoner Name: ${summonerName}, Champion ID: ${championId}`
            );

            // Details about each champion
            const champion = getChampionData(championId);
            if (champion) {
              console.log(`Champion Name: ${champion.name}`);
              // Add champion data to the array
              updatedChampionsData.push({
                summonerName,
                championId,
                teamId,
                champion,
              });
            }
          });

          // Update the state with the array of champions data
          setChampionsData(updatedChampionsData);
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred. Please try again later."); // Generic error message
        console.error(error);
      }
    };

    fetchChampionDataFromGame();
  }, [playerData]);

  function getChampionData(championId) {
    const champion = Object.values(championData).find(
      (champion) => champion.key === championId.toString()
    );

    return champion || null;
  }

  function searchForPlayer() {
    setError(null); // Reset the error message
    setTips(null); // Reset the tips
    const [gamename, tagline] = searchText.split("#"); // Split the searchText into gamename and tagline - RIOT API requires this format as of 2023

    const accountAPIUrl = `${CORS_PROXY}https://${REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gamename}/${tagline}?api_key=${API_KEY}`;

    axios
      .get(accountAPIUrl)
      .then(function (response) {
        const { puuid, gameName, tagLine } = response.data;

        // Check for puuID, summonerName, and tagLine
        console.log("puuid:", puuid);
        console.log("gameName:", gameName);
        console.log("tagLine:", tagLine);

        // Continue with the second API call to get the summoner data
        const summonerAPIUrl = `${CORS_PROXY}https://${COUNTRY}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`;

        axios
          .get(summonerAPIUrl)
          .then(function (response) {
            setPlayerData(response.data);
          })
          .catch(function (error) {
            console.log(error);
            setError("An error occurred. Please try again later."); // Generic error message
            console.error(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        setError("An error occurred. Please try again later."); // Generic error message
        console.error(error);
      });
  }
/*
  function formatTips(tips) {
    if (!tips) {
      return null;
    }

    // Split the text into individual tips based on numbering
    // Split the text into individual tips based on numbering
    const tipsArray = tips.split(/\d+\./).filter(Boolean);

    // Format each tip with bolding and add line breaks
    const formattedTips = tipsArray
      .map(
        (tip, index) => `<p><strong>${index + 1}.</strong> ${tip.trim()}</p>`
      )
      .join("");

    return formattedTips;
  }
  //const formattedTips = formatTips(tips);
  //console.log("Console log playerdata:", playerData);
  //console.log("ChampID: ", championId);

  function formatTips(text) {
    if (!text) {
      return null;
    }
  
    // Function to format individual items (tips or strategies)
    const formatItems = (section) => {
      return section.split(/\d+\./)
        .filter(Boolean)
        .map((item, index) => `<p><strong>${index + 1}.</strong> ${item.trim()}</p>`)
        .join("");
    };
  
    // Split the text into Tips and Strategies sections
    const [tipsSection, strategiesSection] = text.split("Strategies for the Game:");
  
    // Format each section
    const formattedTips = tipsSection ? formatItems(tipsSection) : "";
    const formattedStrategies = strategiesSection ? formatItems(strategiesSection) : "";
  
    return formattedTips + formattedStrategies;
  }
*/

  const resetApp = () => {
    window.location.reload();
  };

function formatTips(text) {
  if (!text) {
    return null;
  }

  // Split the text into lines
  const lines = text.split("\n");

  // Format each line, bold the section titles
  const formattedLines = lines.map(line => {
    if (line.includes("Tips for Winning the Matchup:") || line.includes("Strategies for the Game:")) {
      return `<p><strong>${line.trim()}</strong></p>`;
    }
    return `<p>${line.trim()}</p>`;
  }).join("");

  return formattedLines;
}

  return (
    <div>
      <div className="header-container">
        <div className="title-container">
         <img src={lolgpLogo} alt="LOLGP Logo" className="logo" />
         <h1 onClick={resetApp}>LOL.GP</h1>
        </div>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={searchText}
            placeholder="RiotID (name + #)"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter 'Summoner Name #hash'"
          />
          <button className="search-button" onClick={searchForPlayer}>
            Search
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {playerData.id && (
        <div>
          {/* Display information for the player's champion */}

          {/* Display information for the other 9 champions in the game */}

          {/* ... (existing code) */}
          <div className="champion-container">
            <div className="text-container">
              <h2>Welcome summoner {playerData.name}!</h2>
              {/*} <p>Level: {playerData.summonerLevel}</p> --> */}
              {playerchampionId && (
                <div>
                  {/*<p>
                    You're playing {getChampionData(playerchampionId)?.name}
                  </p> */}
                  <a
                    href={`https://www.op.gg/champions/${
                      getChampionData(playerchampionId)?.name
                    }/`}
                    target="_blank"
                  >
                    Visit OP.GG for {getChampionData(playerchampionId)?.name}{" "}
                    build & runes!
                  </a>
                </div>
              )}
              {!tips ? (
                <p>Loading AI generated tips...</p>
              ) : (
                <div className="tips-container">
                  <h3>Tips and Strategies:</h3>
                  <div dangerouslySetInnerHTML={{ __html: formatTips(tips) }} />
                </div>
              )}
            </div>
            <div className="champion-columns">
              <div className="blue-team">
                <h2>Blue Team</h2>
                {championsData
                  .filter((data) => data.teamId === 100)
                  .map((data) => (
                    <div key={data.championId} className="champion-info">
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${data.champion.id}.png`}
                        alt={`Champion: ${data.champion.name}`}
                      />
                      <h3> {data.summonerName}</h3>
                    </div>
                  ))}
              </div>
              <div className="red-team">
                <h2>Red Team</h2>
                {championsData
                  .filter((data) => data.teamId === 200)
                  .map((data) => (
                    <div key={data.championId} className="champion-info">
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${data.champion.id}.png`}
                        alt={`Champion: ${data.champion.name}`}
                      />
                      <h3> {data.summonerName}</h3>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
