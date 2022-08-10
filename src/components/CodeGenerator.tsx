import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { Hexspeak } from "../helper/Hexspeak";

const CodeGenerator = () => {
  const [hexCode, setHexCode] = useState("");

  const hexGenerate = async () => {
    // Every time you run the program, it should emit one 8-digit hexadecimal code;
    // It should emit every possible code before repeating;
    // It should not print "odd-looking" codes such as 0xAAAAAAAA or 0x01234567 or any commonly used words, phrases, or hexspeak such as 0xDEADBEEF;
    // Codes should be emitted in apparently random order.

    const genCode = () => {
      //generate array of objects (3 numbers), convert to string and keep last 2. Need to add the "0" if not there are instances where the number 0 is generated but dissapears because of it's value as number thus resulting in missing variables
      const code = [...crypto.getRandomValues(new Uint8Array(4))]
        .map((m) => ("0" + m.toString(16)).slice(-2))
        .join("");
      const result = "0x" + code;
      return result;
    };

    function generateCode() {
      let genCodeLow = genCode().toLowerCase();
      //Checks against a list of hexspeak, "odd-looking", commonly used words & phrases
      function checkHexSpeak() {
        for (let i = 0; i < Hexspeak.length; i++) {
          let hexword = Hexspeak[i];
          const hexwordLow = hexword.toLowerCase();
          // console.log(i, hexword);
          if (hexword.length < 8 && genCodeLow.includes(hexwordLow)) {
            console.log("hexspeak detected! generate new code");
            genCodeLow = genCode().toLowerCase();
            //re-run loops
            return true;
          }
        }
        //exit loop
        return false;
      }
      while (checkHexSpeak()) {}
      setHexCode(genCodeLow.toUpperCase());
    }
    generateCode();
  };

  return (
    <IonContent>
      <IonGrid style={{ height: "100%" }}>
        <IonRow class="ion-align-items-center" style={{ height: "30%" }}>
          <IonCol class="ion-text-center">
            <IonText>
              <h1>Generate a 8-digit hex code for 2FA</h1>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol class="ion-text-center">
            <IonButton
              size="large"
              color="danger"
              onClick={() => hexGenerate()}
            >
              Generate
            </IonButton>
          </IonCol>
        </IonRow>{" "}
        <IonRow class="ion-align-items-center">
          <IonCol class="ion-text-center">{hexCode}</IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default CodeGenerator;
