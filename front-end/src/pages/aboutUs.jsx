import { Accordion } from "react-bootstrap"

export const AboutUs = () => {
  return (
    <div className="container mt-5">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Qui sommes-nous ?</Accordion.Header>
          <Accordion.Body>
            <p>Tout a commencé autour d’un simple rituel : une tasse de café partagée entre amis, des discussions passionnées sur les arômes, les origines, et ce petit quelque chose qui transforme un café en une véritable expérience.</p>

            <p>Nous ne sommes pas de simples amateurs. Nous sommes tombés amoureux du café, de son histoire, de son artisanat. De cette passion est née une idée : pourquoi ne pas créer notre propre marque, un café qui nous ressemble, authentique et sans compromis sur la qualité ?</p>

            <p>Alors, nous avons plongé dans l’univers du café. Nous avons rencontré des producteurs, appris les secrets de la torréfaction, exploré les meilleures variétés. Chaque grain que nous sélectionnons aujourd’hui est le fruit de ce voyage, du savoir-faire que nous avons acquis et de notre engagement pour un café d’exception.</p>

            <p>Notre mission est simple : partager avec vous cette passion et vous offrir un café qui a du sens, issu d’une culture respectueuse et d’un travail méticuleux. Parce que pour nous, le café n’est pas juste une boisson, c’est un moment, une émotion, une invitation à savourer l’instant présent.</p>

            <p>Bienvenue dans notre aventure. Bienvenue à La Maison du Grain.</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}