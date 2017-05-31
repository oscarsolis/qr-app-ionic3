# qr-app-ionic3

Aplicación móvil para leer códigos QR usando la cámara del dispositivo, según el tipo de QR realiza lo siguiente:

+ Si es un sitio web abre el navegador para visualizarlo (requiere App Browser Launcher cordova plugin)
+ Si son coordenadas abre un mapa para visualizar el punto
+ Si es un vcard registra el contacto en el dispositivo (requiere Manage Contacts cordova plugin)

## Empezar ￼  ￼

* Clona el repo: `https://github.com/oscarsolis/qr-app-ionic3.git`
* cd project

## Instalación 

1. Ejecuta `npm install` para instalar todas las dependencias.
2. Ejecuta `ionic cordova plugin add phonegap-plugin-barcodescanner` para instalar Barcode Scanner plugin.
3. Ejecuta `ionic cordova plugin add cordova-plugin-inappbrowser` para instalar App Browser Launcher plugin.
4. Ejecuta `ionic cordova plugin add cordova-plugin-contact` para instalar Manage Contacts plugin.
5. Tú necesitas obtener una Google Maps API Key para visualizar el mapa. Obtenla la API Key [aqui] (https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key)
6. Abre el archivo en src/app/app.module.ts e ingresa tu API Key aqui
   ```ts
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AgmCoreModule.forRoot({
            apiKey: '<YOUR_KEY>'
        })
    ]
   ```
7. Para construir el proyecto ejecuta `ionic build android` o `ionic build ios`

## Nota
El proyecto solo se puede probar en un dispositivo físico ya que se requiere de la cámara para el scanner




