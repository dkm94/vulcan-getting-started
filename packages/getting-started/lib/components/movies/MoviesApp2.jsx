import React from 'react';
import { Components } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';
import MoviesUsers from './MoviesUsers.jsx';
import MoviesMarkAsWatched from './MoviesMarkAsWatched.jsx';

const MoviesApp2 = () => (
  <div className="app-content">
    <div className="movies-app">
      {/* Entête de page */}
      <MoviesUsers />

      {/* Searchbar + New obj button + list and edit button */}
      <Components.Datatable
        collection={Movies}
        columns={[
          'name',
          'review',
          // checkbox dans components/movies/MoviesMarkedAsWatched.jsx
        { name: 'isWatched', component: MoviesMarkAsWatched }
        ]}
        options={{ input: { sort: { name: 'asc' } } }}
        /* options={{ 
          input: { 
            filter: { 
              name: { 
                _in: ['Die Hard', 'Star Wars'] 
              } 
            } 
          }
        }} */
      />
    </div>
  </div>
);

export default MoviesApp2;
