import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';
import StepWrapper from './StepWrapper.jsx';
import Queries from '../other/Queries.jsx';

export const title = 'Queries';

const text = `
Now that our data exists on the server, let's think about transmitting it to the client. 

It's important to realize that just because the data is available in our database doesn't mean the client can access all of it. After all, that wouldn't be very secure!

On the other hand, we do know that the client can connect to the GraphQL endpoint. In other words, if we can connect the endpoint to our database, we'll have managed to close the loop. And we can do this using a **resolver**. 

A GraphQL resolver is basically a function that waits for any GraphQL query or mutation, and then provides some data in return. In previous steps we actually already used two query resolvers in the background, \`schemaContents\` and \`moviesCount\`. 

These two resolvers were written specifically for this tutorial and are fairly limited, but we'll now look at Vulcan's **collection resolvers**.

Go to \`lib/components/steps/Step7.jsx\` and uncomment the \`<Queries />\` line to display a list of available query resolvers. 
`;

const after = [
  `
Nice work! Notice the two \`movies\`, and \`movie\` resolvers in there? Those are our auto-generated query resolvers for the \`Movies\` collection. Behind the scenes, they'll fetch the data we need in the database and pass it on to the API layer. 

By the way, we didn't even have to write a custom resolver to get this list of resolvers. Turns out GraphQL supports **introspection queries**, which let you get metadata about your own schema, in this case using the following GraphQL query (try it now in [GraphiQL](http://localhost:3000/graphiql)!):
`,
  `
~~~gq
query QueryResolvers{
  __type(name:"Query") {
    fields {
      name
    }
  }
}
~~~
`,
];
// Const query: va stocker les données (qui ensuite seront fetch avecle hook useQuery)
// gql: template du paquet TS graphql-tag qui permet de parse la query string ci-dessous en query format Apollo
// QueryResolvers : nom de la requête from /lib/hocs/withQueryResolvers.js
// requête de type/name QUERY
// On veut récupérer les champs: name
const query = gql`
  query QueryResolvers {
    __type(name: "Query") {
      fields {
        name
      }
    }
  }
`;

const Step = () => {

  // item qu'on va aller chercher qui pour l'instant est vide
  const item = {};

  // fetch data;
  const { data } = useQuery(query);

  // fonction lodash qui prend 2 (object, path) ou 3 ([defaultValue]) params 
  // ici, l'objet data (réponse de la query) et le chemin (Array ou string, ici c'est un string), voir la requête gql au dessus
  item.queries = get(data, '__type.fields');
  
  // item retourne un objet qui contient un unique attribut queries
  // queries est un array de 10 éléments
  return (
    <StepWrapper title={Step.title} text={text} after={after} check={() => !!item.queries}>
      {/* Queries: component qui va mapper sur l'attribut "queries" du tableau d'items*/}
      <Queries queries={item.queries} />
    </StepWrapper>
  );
};

export const checks = [{ string: `item.queries = get(data, '__type.fields')`}];

export default Step;
