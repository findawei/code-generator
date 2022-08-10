import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import CodeGenerator from "../components/CodeGenerator";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Code Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CodeGenerator />
      </IonContent>
    </IonPage>
  );
};

export default Home;
