/*

The main Movies collection definition file.

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

let Movies;

/* 

Movies collection definition

Uncomment on #Step4:

*/

 Movies = createCollection({

   collectionName: 'Movies',
   typeName: 'Movie',
   schema,
    permissions: {
      //n'importe quel user du groupe "guests" dont connectés ou non; n'importe qui qui accède à l'API, peut READ
        canRead: ['guests'],
      //n'importe quel membre connecté peut CREATE
        canCreate: ['members'],
      // celui qui a ajouté (userId dans movie) peut modifier
        canUpdate: ['owners'],
      // celui qui a ajouté (userId dans movie) peut supprimer
        canDelete: ['owners'],
    },

 });

export default Movies;