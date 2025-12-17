import { useEffect } from "react";

/**
 * Hook personnalisé pour écouter les événements clavier
 * @param keys - Tableau des touches à écouter (ex: ['Space', 'Enter'])
 * @param action - Fonction à exécuter quand une des touches est pressée
 */
export function useKeyboard(keys: string[], action: () => void) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Vérifier si la touche pressée est dans la liste
      if (keys.includes(event.code)) {
        // Éviter de déclencher si l'utilisateur tape dans un input/textarea
        const target = event.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }

        // Empêcher le comportement par défaut (ex: scroll avec espace)
        event.preventDefault();
        action();
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener("keydown", handleKeyPress);

    // Nettoyer l'écouteur lors du démontage
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keys, action]);
}
