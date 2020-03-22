import React from 'react';
import reactDom from 'react-dom';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
import Cookies from 'js-cookie';

import App from './components/App';

// let token = null;

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/api',
//     credentials: 'include',
//     cache: new InMemoryCache(),
//     request: operation => {
//         //get the token and set it to headers of each request
//         let token = localStorage.getItem('token');
//         operation.setContext({
//             headers: {
//                 authorization: token ? `${token}` : ''
//             }
//         });
//     }
// });

{
    /* <ApolloProvider client={client}> */
}
reactDom.render(<App />, document.getElementById('root'));
