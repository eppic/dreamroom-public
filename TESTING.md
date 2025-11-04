
# Unit Testing für Dreamroom. 

## **Utility Functions**

### - `reorderFurniture`

- **Was macht es?** Regelt die Reihenfolge (zIndex) der Möbel.
- **Warum ist es wichtig?** Die Layer-Reihenfolge ist entscheidend für die Darstellung im Editor – falsche Reihenfolge = falsches UI.
- **Wie wird es getestet?** Via Unit Tests: Es wird geprüft, ob Möbel korrekt nach oben/unten verschoben werden, inkl. Edge Cases (z. B. am Anfang/Ende der Liste).

## **Custom React Hooks**

### - `useSelectedFurniture`

- **Purpose:** Steuert, welches Möbelstück aktuell ausgewählt ist.
- **Warum testen?** Die Auswahl ist zentral für alle Edit-Actions wie Drehen, Löschen etc.
- **Tests:** Es wird geprüft, ob Auswahl/Deselektion korrekt funktionieren und ob das richtige Item als „selected“ gilt.

### - `useCanvasHandlers`

- **Was macht der Hook?** Behandelt alle Interaktionen auf dem Canvas – also Möbel verschieben, löschen etc.
- **Warum testen?** Hier steckt sehr viel Logik drin, die direkt die User-Interaktion beeinflusst.
- **Tests:** Fokus liegt auf Verschieben und Löschen, inkl. Validierung der neuen Position.

## Warum genau diese Tests?

* **Core Logic:** Die getesteten Funktionen bilden das Rückgrat der App-Funktionalität. Wenn’s hier knallt, merkt der User das sofort.
* **Bug Prevention:** Automatisierte Tests fangen Fehler frühzeitig ab – besonders bei Refactorings.
* **Maintainability:** Gut getesteter Code lässt sich einfacher erweitern und umbauen, ohne alles zu brechen.

## Tests in der Konsooe

* Alle Tests mit

  ```
  npm run test
  ```
  
* Framework: Jest

