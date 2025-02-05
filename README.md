Explorer App

Łacińska Aleksandra 40361
Muziński Karol 39956


#Opis projektu

Explorer App to aplikacja PWA, umożliwiająca użytkownikom odkrywanie ciekawych miejsc i atrakcji turystycznych na mapie Warszawy oraz zapisywanie ulubionych miejsc. Aplikacja wykorzystuje geolokalizację oraz powiadomienia push.


#Funkcjonalności

✅ Lista miejsc – użytkownik może przeglądać dostępne miejsca (dostępna tylko online)
✅ Widok szczegółowy miejsca – wyświetlanie informacji o wybranym miejscu
✅ Mapa – interaktywna mapa z zaznaczonymi lokalizacjami atrakcji turystycznych
✅ Zapisywanie miejsc – użytkownik może dodać miejsca do zapisanych i przeglądać je offline
✅ Obsługa powiadomień – aplikacja informuje użytkownika o dodaniu nowego miejsca do listy zapisanych
✅ Obsługa trybu offline – aplikacja wyświetla baner informujący o braku połączenia
✅ Instalowalność jako PWA – użytkownicy mogą dodać aplikację do ekranu głównego
✅ Dostosowanie do różnych ekranów – aplikacja jest responsywna na różnych urządzeniach


#Technologie

React Native – framework do tworzenia aplikacji mobilnych i PWA
Expo – platforma do łatwego uruchamiania i zarządzania aplikacją
React Navigation – nawigacja w aplikacji
Leaflet.js – interaktywna mapa dla wersji webowej
React Native Maps – obsługa map w wersji mobilnej
AsyncStorage – zapisywanie danych użytkownika (zapisane miejsca)
Expo Notifications – powiadomienia push
Service Worker – umożliwia działanie aplikacji w trybie offline
Netlify – hosting aplikacji


#Instalacja i uruchomienie

✅ Lokalne uruchomienie aplikacji

1. Sklonuj repozytorium z GitHuba
https://github.com/aleksandralacinska/projekt-explorer-app.git 

2. Otwórz terminal i przejdź do lokalizacji, w której zapisany jest projekt.

3. Zainstaluj zależności
npm install --legacy-peer-deps

4. Uruchom aplikację
npm run web
lub
npx expo start


✅ Uruchomienie wersji hostowanej

Aplikacja dostępna online pod adresem: https://projekt-explorer-app.netlify.app/ 