import { registerRootComponent } from "expo";
import App from "./App";
import { Platform } from "react-native"; // 🔥 Dodajemy Platform do sprawdzenia środowiska

// Obsługa Service Workera i instalacji PWA TYLKO w przeglądarce (web)
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

  
// Wymuszenie odświeżenia przeglądarki, aby poprawnie załadować manifest
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  console.log("✅ Manifest wykryty i gotowy do instalacji!");

  let installPrompt = event;

  const installButton = document.createElement("button");
  installButton.innerText = "Zainstaluj aplikację";
  installButton.style.position = "fixed";
  installButton.style.bottom = "20px";
  installButton.style.right = "20px";
  installButton.style.padding = "10px 15px";
  installButton.style.background = "#0066ff";
  installButton.style.color = "white";
  installButton.style.border = "none";
  installButton.style.borderRadius = "5px";
  installButton.style.cursor = "pointer";
  document.body.appendChild(installButton);

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
});
}

// Uruchamia główną aplikację React Native
registerRootComponent(App);
