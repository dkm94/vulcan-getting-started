const schema = {

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },

  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date();
    }
  },

  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    //ne pas oublier d'ajouter la relation (modèle) au fragment si fragment
    relation: {
      // nouveau modèle user
      fieldName: 'user',
      // de type User
      typeName: 'User',
      //un film est associé à un use
      kind: 'hasOne'
    }
  },

  name: {
    label: 'Name',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    searchable: true,
    // Uncomment on #Step19
    intl: true, 
  },

  review: {
    label: 'Review',
    type: String,
    optional: true,
    input: 'textarea',
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    searchable: true,
  },

  isWatched: {
    label: 'Watched?',
    type: Boolean,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },

  imdbId: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },

};

export default schema;
