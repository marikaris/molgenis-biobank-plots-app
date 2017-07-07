
let state = {
  numberOfSamples: 0,
  transcriptome: false,
  methylome: false,
  genotypes: false,
  wbcc: false,
  metabolome: false,
  wgs: false,
  male: false,
  female: false,
  smoking: false,
  nonSmoking: false,
  belowTwenty: false,
  twentyThirty: false,
  thirtyFourty: false,
  fourtyFifty: false,
  fiftySixty: false,
  sixtySeventy: false,
  seventyEighty: false,
  aboveEigthy: false,
  biobank: null,
  aggs: [],
  biobanks: [],
  charts: {
    gender: null,
    smoking: null,
    data_types: null,
    age: null
  },
  apiUrl: window.location.origin + '/api'
}

if (process.env.NODE_ENV === 'development') {
  state = {
    ...state,
    entities: {
      biobanks: 'leiden_biobanks',
      samples: 'leiden_RP'
    },
    apiUrl: 'https://localhost:8080/api',
    token: '1b24938f21dd4c02a97322a00235d309'
  }
} else if (process.env.NODE_ENV === 'production') {
  console.log('Production')
  state = {
    ...state,
    ...(window.__INITIAL_STATE__ || {})
  }
}

console.log('state:', state)

export default state
