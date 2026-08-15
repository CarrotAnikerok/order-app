## Инструкция по запуску проекта

### Предварительные требования
* Установленный **.NET 10 SDK**
* Установленный **Node.js**

### Загрузка
Загрузите проект и перейдите в корневую папу:

```bash
git clone https://github.com/CarrotAnikerok/order-app.git
cd order-app
```

### Шаг 1: Запуск бэкенда (API)
Выполните команды:
```bash
dotnet restore
dotnet run --project FormApp.Api
```
*Бэкенд запустится и начнет слушать порты, указанные в `Properties/launchSettings.json`.*

### Шаг 2: Запуск фронтенда (Client)
Откройте второе окно терминала, перейдите в папку фронтенда и запустите его:
```bash
cd FormApp.client
npm install
npm run dev
```