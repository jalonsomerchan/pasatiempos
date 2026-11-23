# Pasatiempos by AlonSoftware

Una colección de juegos de lógica y estrategia, adaptable a móviles e instalable como una sola aplicación. Incluye Quoridor, Dots and Boxes, Bridg-It, Gomoku, Isolation, Domineering, Hex, SOS, Nim, Mancala, Abalone, El Molino, Blokus, Tak, Quarto, Guerra de colores, Hundir la flota, Hamdoku y Slitherlink. Los juegos conservan sus reglas, opciones, niveles y progreso local; las salas multijugador utilizan IttySockets. En Dots and Boxes, el anfitrión elige un tablero de 3 × 3 a 6 × 6 casillas.

## Ejecutar

```sh
python3 -m http.server 8000
```

Abre http://localhost:8000. Sirve los archivos por HTTP: Slitherlink carga sus niveles mediante `fetch` y la instalación requiere un contexto seguro. No es necesario compilar ni instalar dependencias. Tras la primera visita, espera a que el navegador termine de descargar los recursos para poder jugar sin conexión. Las salas en línea necesitan Internet. El progreso se guarda en el navegador y dispositivo actuales.

## GitHub Pages

Sube el contenido a un repositorio en la rama `main` y selecciona **Settings → Pages → Build and deployment → GitHub Actions**. El flujo incluido publica el sitio en cada cambio en `main`. `CNAME` configura `pasatiempos.alon.one`; configura también el DNS del dominio en tu proveedor y comprueba el dominio y HTTPS en los ajustes de Pages. Las rutas relativas permiten también publicar bajo la ruta de un repositorio.

## Estructura

- `assets/games.js`: catálogo de juegos.
- `assets/`: interfaz compartida, marca e iconos.
- `games/<id>/`: juego y recursos propios.
- `sw.js`: recursos disponibles sin conexión; incrementa la versión de `CACHE` y añade los nuevos archivos al incorporar o modificar un juego.
- [CRITERIOS.md](CRITERIOS.md): contrato y lista de comprobación para nuevas incorporaciones.

## Variantes de los juegos nuevos

- Blokus usa un tablero de 14 × 14 para dos jugadores, 21 piezas por jugador y las dos marcas iniciales interiores; al final se contabilizan las casillas colocadas y las bonificaciones por completar las piezas.
- Tak usa un tablero de 5 × 5, la apertura con piedras del rival y puntuación por piedras planas si no se forma camino.
- Quarto detecta automáticamente cuatro piezas con un rasgo común; no es necesario anunciar la victoria.
- Guerra de colores usa el tablero 12 × 12, expansión ortogonal y territorios permanentes.
- Hundir la flota es solo multijugador; cada cliente conserva su disposición local y envía disparos y respuestas. No es una solución antitrampas.

Mancala usa la variante Kalah: seis hoyos por jugador y cuatro semillas por hoyo.

El Molino permite saltar a cualquier punto libre cuando quedan tres fichas, y termina en empate por triple repetición o 100 movimientos sin captura. Abalone usa la colocación inicial clásica y seis expulsiones para ganar.
