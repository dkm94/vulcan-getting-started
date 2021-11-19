import { registerFragment } from 'meteor/vulcan:core';

// le fragment définit la morceau exact de data qu'on veut récupérer sur une collection. Ici, Movie.
registerFragment(/* GraphQL */`
  fragment MovieFragment on Movie {
    _id
    createdAt
    name
    isWatched
    user{
      displayName
    }
    score
  }
`);