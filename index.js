import { registerRootComponent } from "expo";
import App from "./App";
import { Platform } from "react-native";

// Obsługa Service Workera i instalacji PWA tylko w przeglądarce (web)
if (Platform.OS === "web") {
  // Rejestracja Service Workera
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("✅ Service Worker zarejestrowany:", registration);
        })
        .catch((error) => {
          console.error("❌ Rejestracja Service Workera nie powiodła się:", error);
        });
    });
  }

  // Obsługa instalacji PWA - dodanie przycisku obok tytułu strony
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    console.log("✅ Manifest wykryty i gotowy do instalacji!");

    let installPrompt = event;

    // Znalezienie kontenera tytułu "Strona główna"
    const headerContainer = document.querySelector("h1");
    if (headerContainer) {
      // Stworzenie kontenera dla tytułu i przycisku
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "space-between"; // Rozstawia elementy
      buttonContainer.style.alignItems = "center";
      buttonContainer.style.width = "100%";
      buttonContainer.style.padding = "10px 20px"; // Dodatkowy padding dla lepszego wyglądu

      // Przeniesienie tytułu do nowego kontenera
      headerContainer.parentNode.insertBefore(buttonContainer, headerContainer);
      buttonContainer.appendChild(headerContainer);

      // Stworzenie przycisku
      const installButton = document.createElement("button");
      installButton.innerText = "Zainstaluj aplikację";
      installButton.style.padding = "8px 12px";
      installButton.style.background = "#0066ff";
      installButton.style.color = "white";
      installButton.style.border = "none";
      installButton.style.borderRadius = "5px";
      installButton.style.cursor = "pointer";
      installButton.style.fontSize = "14px";
      installButton.style.marginLeft = "auto"; // Zapewnia wyrównanie do prawej
      installButton.style.display = "inline-block";

      // Dodanie przycisku obok tytułu "Strona główna"
      buttonContainer.appendChild(installButton);

      installButton.addEventListener("click", () => {
        installPrompt.prompt();
        installPrompt.userChoice.then((choice) => {
          if (choice.outcome === "accepted") {
            console.log("✅ Użytkownik zainstalował aplikację!");
          } else {
            console.log("❌ Użytkownik anulował instalację.");
          }
          installButton.remove();
        });
      });
    }
  });
}

// Uruchamia główną aplikację React Native
registerRootComponent(App);
