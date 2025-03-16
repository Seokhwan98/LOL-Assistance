// RiotComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const RiotComponent = ({ summonerName }) => {
  const [summonerId, setSummonerId] = useState("");
  const [champion, setChampion] = useState("");

  useEffect(() => {
    const getSummonerInfo = async () => {
      try {
        const summonerResponse = await axios.get(
          `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
          {
            headers: {
              "X-Riot-Token": "RGAPI-2ecc20ac-074a-406c-adf0-8cef87263059AAA",
            },
          }
        );

        const { id } = summonerResponse.data;
        setSummonerId(id);

        const championResponse = await axios.get(
          `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}`,
          {
            headers: {
              "X-Riot-Token": "RGAPI-2ecc20ac-074a-406c-adf0-8cef87263059AAA",
            },
          }
        );

        const { championId } = championResponse.data.participants[0];
        setChampion(championId);
      } catch (error) {
        console.error("Error calling Riot API:", error);
      }
    };

    // Call the function when the summonerName prop changes
    getSummonerInfo();
  }, [summonerName]);

  return (
    <div>
      <div>Summoner ID: {summonerId}</div>
      <div>Champion ID: {champion}</div>
    </div>
  );
};

export default RiotComponent;
