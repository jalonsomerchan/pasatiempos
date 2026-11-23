# Criterios para incorporar juegos

## Experiencia común

Cada juego vive en `games/<id>/`, con un identificador estable en minúsculas y sin espacios. Regístralo en `assets/games.js` con `id`, `name`, `category`, `description`, `players`, `symbol` y `path`. La ruta es relativa a la raíz y termina en `/`. Usa la barra común de `assets/game-shell.css`, enlazada desde el juego, con un enlace a `../../` y el nombre del juego. Mantén la identidad de Pasatiempos, el español, controles táctiles amplios, compatibilidad con teclado, etiquetas accesibles y adaptación a pantallas pequeñas. Respeta movimiento reducido y no dependas del color para transmitir información.

Cada juego debe ofrecer reglas, inicio claro, gestión de partida, errores comprensibles y sus propias opciones cuando proceda. Conserva los estados y preferencias en claves de almacenamiento con prefijo exclusivo y versión; nunca borres datos de otros juegos. Documenta cualquier límite del guardado. No dependas de fuentes o recursos remotos para jugar individualmente sin conexión. Incluye todos los recursos en `sw.js` y actualiza su versión; verifica instalación y uso sin conexión tras cargar la aplicación. No registres service workers ni manifests independientes desde los juegos.

## Selección de dificultad

**La dificultad nunca se elige mediante un desplegable `<select>`.** Presenta todos los niveles disponibles como opciones visibles y pulsables, con una selección clara, accesible mediante teclado y adecuada para pantallas táctiles. La selección del tamaño del tablero sí puede utilizar un desplegable. Quoridor es la referencia visual para los niveles.

## Tutorial obligatorio para cada juego

**Es una condición indispensable para incorporar o dar por terminado cualquier juego**, tanto individual como multijugador. El tutorial de Quoridor es la referencia: debe incluir diálogos paso a paso que señalen sobre el tablero o los controles el lugar exacto donde el jugador tiene que actuar y esperar a que practique cada acción relevante antes de continuar.

Debe explicar con detalle el objetivo, la victoria y el empate cuando exista, los turnos, todos los movimientos y sus variantes, las acciones inválidas o restricciones importantes, las herramientas disponibles y cualquier regla particular del juego. Ha de mostrar ejemplos claros y permitir repetirlo desde la portada, cerrarlo y usarlo en móvil y con teclado. Una descripción de reglas, un texto estático o una sucesión de pantallas sin práctica guiada no sustituye este requisito. Cuando haya tutorial de partida, la guía debe enseñar las acciones en el tablero real sin poner en riesgo el progreso guardado.

Antes de dar por terminado un juego, recorre el tutorial completo y verifica que cada señal apunta al control correcto, que cada paso responde a la acción solicitada y que se puede completar en móvil y escritorio. La existencia de una guía en la colección no demuestra por sí sola que el tutorial del juego cumpla estas condiciones; corrige cualquier incumplimiento antes de publicar el juego.

## Juegos individuales

El juego debe funcionar íntegramente en el navegador, sin servidor propio. Si tiene niveles, conserva identificadores y orden estables para que el progreso siga siendo válido. Proporciona reinicio, reglas y, cuando tengan sentido, pistas, accesibilidad y restauración de partida.

## Juegos multijugador

Usa IttySockets como transporte, sin servidor propio, y mantén la interacción común de crear sala, compartir código o enlace, unirse y recibir estados claros de espera, conexión, sala llena, error y desconexión. Quoridor conserva sus salas de dos jugadores y códigos numéricos de cuatro cifras. Otros juegos pueden definir capacidad mínima y máxima, formatos de código, privacidad y opciones de sala adecuados a sus reglas: no supongas que todos son de dos personas ni que todos los códigos tienen cuatro cifras.

Cada juego debe aislar los canales con un prefijo estable y versionado propio, asignar identificadores de cliente y sesión, dirigir los mensajes cuando corresponda, ignorar mensajes ajenos o de sesiones anteriores y validar los movimientos y el estado recibido. Define quién controla el estado y el inicio, cómo se resuelven colisiones de códigos, entradas tardías, aforo, abandono, reconexión y revancha. No presentes códigos cortos como mecanismo de seguridad o privacidad fuerte; evita datos personales y secretos en mensajes. Comprueba la importación de IttySockets y presenta un error si falla. El transporte remoto y las partidas online requieren conexión.

La implementación existente de Quoridor es específica de dos jugadores; para un juego nuevo de más jugadores habrá que implementar y probar su protocolo de sala y sus reglas. Estos criterios no implican que exista todavía una biblioteca genérica de salas.

## Comprobación antes de incorporar

1. Prueba el tutorial obligatorio completo, las reglas, victoria, reinicio, opciones, progreso y navegación de vuelta en móvil y escritorio.
2. Prueba teclado, nombres accesibles y movimiento reducido.
3. Comprueba el juego individual sin conexión tras la instalación, incluidos los datos de niveles.
4. En multijugador, prueba con clientes independientes crear/unirse, aforo, turnos, desconexión, errores y revancha; prueba también el formato y número de jugadores que admita el juego.
5. Verifica que todas las rutas funcionan tanto desde `/` como desde la ruta de un repositorio de GitHub Pages y que la nueva versión del service worker contiene todos los recursos.

### Acceso desde la portada

Los juegos multijugador se registran en `assets/games.js` con `roomChannel(code)`, que devuelve el canal IttySockets correspondiente o `null` si el formato no es válido. Mientras la sala esté activa, el anfitrión debe responder a `{type: 'discover', from: <id>}` con `{type: 'discovery', from: <id del anfitrión>, to: <id recibido>, game: <id del catálogo>}`, sin ocupar plaza ni modificar la partida. La portada busca en todos los juegos compatibles; si más de uno responde, comunica la ambigüedad. El juego debe aceptar `?sala=<código>` y unirse automáticamente. Evita anunciar datos personales. La búsqueda necesita conexión y solo encuentra salas cuyos anfitriones implementen este protocolo.
