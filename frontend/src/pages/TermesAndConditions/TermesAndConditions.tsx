import "./TermesAndConditions.css";

const TermesAndConditions = () => {
  return (
    <div className="terms">
      <h1>Termes et Conditions</h1>
      <h2>PolyNotes - Appartenant à Sylvain</h2>

      <ol>
        <li>
          <h3>Conditions d'utilisation</h3>
          <p>
            En utilisant PolyNotes, vous acceptez les présentes conditions
            d'utilisation. Si vous n'êtes pas d'accord avec ces conditions,
            veuillez ne pas utiliser l'application.
          </p>
        </li>
        <li>
          <h3>Propriété intellectuelle</h3>
          <p>
            PolyNotes est la propriété de Sylvain. Tout le contenu présent dans
            l'application, y compris les textes, les images, les graphismes, les
            icônes et les logiciels, est la propriété de Sylvain ou de ses
            fournisseurs de contenu et est protégé par les lois sur la propriété
            intellectuelle en vigueur. Vous ne pouvez pas copier, reproduire,
            modifier, distribuer ou afficher le contenu de l'application sans
            l'autorisation préalable écrite de Sylvain.
          </p>
        </li>
        <li>
          <h3>Utilisation de l'application</h3>
          <p>
            Vous pouvez utiliser PolyNotes pour votre usage personnel ou
            professionnel, tant que cela n'implique pas de violation des droits
            de tiers ou de la loi en vigueur. Vous êtes responsable de
            l'utilisation que vous faites de l'application et de tout contenu
            que vous y publiez.
          </p>
        </li>
        <li>
          <h3>Confidentialité</h3>
          <p>
            Votre vie privée est importante pour nous. Nous collectons des
            données sur l'utilisation de l'application pour améliorer nos
            services, mais nous ne vendons ni ne partageons vos informations
            personnelles avec des tiers à des fins commerciales.
          </p>
        </li>
        <li>
          <h3>Contenu utilisateur</h3>
          <p>
            Vous êtes entièrement responsable du contenu que vous publiez sur
            PolyNotes. Vous garantissez que vous avez tous les droits
            nécessaires pour publier ce contenu et que celui-ci ne viole pas les
            droits de tiers ou la loi en vigueur. Nous nous réservons le droit
            de supprimer tout contenu qui ne respecte pas nos normes de
            conduite.
          </p>
        </li>
        <li>
          <h3>Limitation de responsabilité</h3>
          <p>
            Sylvain ne sera pas responsable de tout dommage direct, indirect,
            spécial, consécutif ou exemplaire résultant de l'utilisation de
            PolyNotes ou de l'impossibilité d'utiliser l'application.
          </p>
        </li>
        <li>
          <h3>Modifications des termes et conditions</h3>
          <p>
            Nous nous réservons le droit de modifier les présentes conditions
            d'utilisation à tout moment. Les modifications entreront en vigueur
            dès leur publication sur l'application. Nous vous encourageons à
            consulter régulièrement cette page pour rester informé des
            modifications.
          </p>
        </li>
      </ol>

      <p>
        En utilisant PolyNotes, vous acceptez ces termes et conditions. Si vous
        avez des questions ou des préoccupations, veuillez me contacter à
        l'adresse e-mail:{" "}
        <a href="mailto:sylvain.pierrot@etu.umontpellier.fr">
          sylvain.pierrot@etu.umontpellier.fr
        </a>
        .
      </p>
    </div>
  );
};

export default TermesAndConditions;
