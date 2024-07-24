import { FC } from "react";

const defaultTextBlock = (
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

interface DemoInstructionsProps {
  textBlock?: JSX.Element;
}

const DemoInstructions: FC<DemoInstructionsProps> = ({ textBlock }) => {
  textBlock = textBlock || defaultTextBlock;

  return (
    <div className="flex flex-col p-4">
      <div className="bg-[color:var(--secondary-dark)] text-[color:var(--secondary-light)]">
        {textBlock}
      </div>
    </div>
  );
};

export default DemoInstructions;
