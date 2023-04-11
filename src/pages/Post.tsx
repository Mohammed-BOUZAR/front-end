import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';
// import PostDetails from '../components/PostDetails';

// interface RouteParams {
//   postId: string;
// }

const Post: React.FC = () => {
  return (
    <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Header</IonTitle>
      </IonToolbar>
    </IonHeader>
    </>
  );
}

export default Post;
