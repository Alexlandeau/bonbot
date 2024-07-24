import { FC } from "react";
import Demo from "@/components/Demo";
import userPicture from "@/resources/user_pictures/leaf.png";
import botPicture from "@/resources/user_pictures/bot.png";
import { UiSettings } from "@/types";


const instructionsTextBlock = (
  <>
    <p>
      Bienvenue dans la démo de BonBot ! Vous pouvez utiliser cet assistant pour  répondre à des questions concernant le changement climatique, en utilisant le contenu des articles de Bonpote.
    </p>
        <b>Exemples de questions :</b>

    <ul>
      <li>
      Jordan Bardella est-il un bon candidat pour l'écologie ?
      </li>
      <li>
      Quels seront les impacts du changement climatique ?
      </li>
      <li>
      Comment survivre à un diner de famille ? 
      </li>

    </ul>
    <p>
      N'hésitez pas à explorer et à poser toutes les questions que vous pourriez
      avoir ! Notre assistant est là pour vous aider , si vous rencontrez des problèmes ou avez besoin d'aide
      supplémentaire, n'hésitez pas à nous contacter directement.
    </p>
  </>
);

const uiSettings: UiSettings = {
  header: {
    title: "BonBot",
  },
  instructions: {
    textBlock: instructionsTextBlock,
  },
  chat: {
    endpoint: "bonbot",
    placeholder: "Une question sur le changement climatique ? Discutons solutions !",
    sourcePlaceholder: "",
    senderUser: {
      name: "You",
      pic: userPicture,
      hsl_color: {
        h: 152,
        s: 23,
        l: 27,
      }, // GSK Medium dark Green
    },
    botUser: {
      name: "BonBot",
      pic: botPicture,
      hsl_color: {
        h: 163,
        s: 45,
        l: 16,
      }, // GSK Dark Green
    },
  },
};

interface BonBotViewProps {}

const BonBotView: FC<BonBotViewProps> = () => {
  return <Demo uiSettings={uiSettings} />;
};

export default BonBotView;
