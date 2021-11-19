import React from 'react';
import get from 'lodash/get';
import { Components, useMulti2 } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const MoviesList = () => {
  const items = {};

   // useMulti2: hook to load several documents which can take options like: collection, fragmentName, input...
  // variable pour stocker les documents la collection Movies
   const useMulti2Object = useMulti2({
     //collection from /modules/collection.js
     collection: Movies, // (récupère tous les attributs)
      fragmentName: 'MovieFragment', //optional; dans /modules/fragments.js, ne récupère qu'un fragment d'attribut
      // puisqu'on ne demande qu'un fragment de data, même si dans le code, on retourne l'attribut du film, il ne s'affiche plus. Car on appelle un fragment dans lequel l'attibut "review" n'est pas demandé.
    });
   // la variable useMulti2Object retourne un objet qui possède une 15/20aine d'attributs dont: called, client, count, data, loading...
   
   // items est un objet comprenant 2 attributs: loading(false) et result qui est un Array
   // chaque élément du tableau result est un film 
   
   //items.loading: false
   items.loading = useMulti2Object.loading;

   // items.results: Array de films
   items.results = get(useMulti2Object, 'data.movies.results');

  return (
    <div className="movies-list">
      <div className="movies-contents">
        {items.loading ? (
          <Components.Loading />
        ) : (
          items.results && (
            <ul>
              {items.results.map((movie) => (
                <li key={movie.name}>
                  <h4>{movie.name}</h4>
                  {movie.review && <p>{movie.review}</p>}

                  {/* user ? user.displayName : null */}
                  {movie.user && (
                    <p>
                      <em>– {movie.user.displayName}</em>
                    </p>
                  )}
                  {movie.score && <p>IMDb Score: {movie.score}</p>}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default MoviesList;
