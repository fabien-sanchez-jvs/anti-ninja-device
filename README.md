# Anti Nija Device

Anti Nija Device est un outil de détection des nija. les nija étant les personne qui lors d'un tour de table dans une réunion ne prennent pas la parole.

## techno

- react
- react-router
- zustand (avec persistance)

## Fonctionnement

A partir d'une liste de prénoms (3 minimum) l'outil génère une étoile avec autant de branche qu'il y a de prénom. cette branche est utilisé par l'organisateur du tour de table. Il selectionne les personne en clickant sur leur prénom ou il laisse l'étoie choisir automatiquement la personne parmi les personnes restantes en cliqkant sur l'étoile.
Il y. a 2 bouton suplémentaire :
- en haut à gauche, un bouton en forme de roue dentée permet d'accéder à la page de paramètre ou on enregistre les prénoms
- en haut à droite, un bouton en forme de fleche circulaire permet de remetrte à zéro l'affichage.

Visuellement, la personne sélectionné est mise en évidance. les personnes déjà passées sont grisée, les personne qui attendent leur tour reste avec un affichage standart
L'étoile est réalisé en SVG