import { getSetting } from 'meteor/vulcan:core';
import fetch from 'node-fetch';

const getUrl = (imdbId) =>
  `http://www.omdbapi.com/?apikey=${getSetting('omdb.apiKey')}&i=${imdbId}`;

// uncomment on #Step11
export const apiSchema = {
  // ne pas oublier d'ajouter score au fragment si fragment
  score: {
    // on récupère une moyenne de notes
    typeName: 'Float',
    resolver: async ({ imdbId }) => {
      // imdbId représente un id de film (tous ceux présents dans l'API externe OMDB)
      const response = await fetch(getUrl(imdbId), { method: 'GET' });
      const json = await response.json();
      return json.imdbRating;
    },
  },
};
