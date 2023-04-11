import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';


import Register from './pages/Register';
import Login from './pages/Login';
// import Users from './pages/Users';
// import User from './pages/User';
// import Posts from './pages/Posts';
// import Post from './pages/Post';
// import Comments from './pages/Comments';
// import Comment from './pages/Comment';
// import Subcomments from './pages/Subcomments';
// import Subcomment from './pages/Subcomment';
import Home from './pages/Home';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  const history = useHistory();
  const token = Cookies.get('token');
  // alert("token app: "+token);
  // if (token) return history.push('/home');

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {token ? <Redirect exact from="/" to="/home" />
          : <Redirect exact from="/" to="/login" />}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:postId" component={Post} />
          <Route exact path="/posts/:postId/comments" component={Comments} />
          <Route exact path="/posts/:postId/comments/:commentId" component={Comment} />
          <Route exact path="/posts/:postId/comments/:commentId/subcomments" component={Subcomments} />
          <Route exact path="/posts/:postId/comments/:commentId/subcomments/:subCommentId" component={Subcomment} /> */}
          <Route exact path="/home" component={Home} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;




// import { Redirect, Route } from 'react-router-dom';
// import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
// import Home from './pages/Home';

// /* Core CSS required for Ionic components to work properly */
// import '@ionic/react/css/core.css';

// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

// /* Theme variables */
// import './theme/variables.css';

// setupIonicReact();

// const App: React.FC = () => (
//   <IonApp>
//     <IonReactRouter>
//       <IonRouterOutlet>
//         <Route exact path="/home">
//           <Home />
//         </Route>
//         <Route exact path="/">
//           <Redirect to="/home" />
//         </Route>
//       </IonRouterOutlet>
//     </IonReactRouter>
//   </IonApp>
// );

// export default App;
