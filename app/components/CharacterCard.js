"use client";

import { translate } from "../utils/translate";

export default function CharacterCard({character, language}){
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg">
      <img src={character.image} alt={character.name} className="rounded-md mb-2" />
      <h2 className="text-lg font-semibold">{character.name}</h2>
      <p>
        {translate("status", language)}:{" "}
        {translate(character.status.toLowerCase(), language)}
      </p>
      <p>
        {translate("species", language)}: {character.species}
      </p>
      <p>
        {translate("gender", language)}: {character.gender}
      </p>
      <p>
        {translate("origin", language)}: {character.origin.name}
      </p>
    </div>
    );
}