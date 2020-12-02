//Borja Muñoz Carlos Andrés
//Figueroa Miguel Angel
//Gil Juan Diego
//Holchor Luis Felipe
//Zapata Marmolejo Jorge Andrés

// Importamos las librerias si es necesario usar listas
const {
    append,
    cons,
    first,
    isEmpty,
    isList,
    length,
    rest,
    map
} = require("fl-extended");

function make(data, attribute) {
    return Object.assign({}, data, attribute);
}




/**
 * Se definen los mundos
 * let, var, const namne = null; 
 * No requiere interacción con el usuario
 */
var posLava; // posición variante
var currentSecond = -1; // tiempo 

const ANCHO = 770;
const LARGO = 610;
const SIZE = 32;
const MAPA = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 7, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 7, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 7, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 2, 7, 2, 2, 7, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 7, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 2, 0, 2, 2, 2, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 7, 0, 0, 0, 0, 1, 7, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


const mapa = {
    moneda: 0,
    muro: 1,
    camino: 2,
    tomb: 3,
    voidp: 7,

};

/*Contrato: countcoins(lista,json,json,number)-->number
Proposito: es una funcion que cuenta las monedas presentes en nuestro mundo
countCoins(matrix, x, y, cont){cuerpo de la función}
*/
function countCoins(matrix, x, y, cont) { //
    if (x < matrix.length) {
        if (y < matrix[0].length) {
            if (matrix[x][y] == mapa.moneda) {
                cont++
            }
            return countCoins(matrix, x, y + 1, cont);
        } else
            return countCoins(matrix, x + 1, 0, cont);
    } else return cont;
}

/* 
Contrato: eatCoins: lista, json, json->json
Propósito: Aplicar una función a una lista genérica
eatCoins(list, json, json){cuerpo de la función}
*/
function eatCoins(world, x, y) {
    MAPA[x][y] = mapa.camino
    return Object.assign(world, {
        tomb: {
            x: y,
            y: x
        }
    }, {
        MAPA
    }, {
        score: world.score + 1
    }, {
        numeroDeMonedas: countCoins(MAPA, 0, 0, 0)
    });
}

function sketchProc(processing) {

    /**
     * Esto se llama antes de iniciar (espacio de trabajo)
     */
    processing.setup = function() {
        processing.frameRate(100);
        processing.size(ANCHO, LARGO);
        tomb = processing.loadImage("images/tomb.png");
        muro = processing.loadImage("images/pared.jpg");
        moneda = processing.loadImage("images/moneda.png");
        lava = processing.loadImage("images/lava.png");
        voidp = processing.loadImage("images/Portal.png");
        gameOver = processing.loadImage("images/youlose.jpg");
        ywinner = processing.loadImage("images/youwin.jpg");

        //*WORLD
        processing.state = {
            time: 0,
            tomb: {
                x: 22,
                y: 2
            },
            lava: {
                time: 0,
                velocidad: 4.25,
                x: 24, // el # de posiciones del ancho del juego
                y: 20, // el # de posiciones de largo del juego
                dead: true
            },
            currentTime: processing.second(), //Processing.second()--> En esta, processing se comunica con el reloj de la computadora y second devuelve el segundo actual como un valor de [0-59]
            MAPA,
            score: 0,
            vidas: 3,
            monedas: 0,
            online: true,
            numeroMonedas: countCoins(MAPA, 0, 0, 0)
        };


    }
    processing.drawGame = function(world) {

        if (world.online == true) {

            processing.background(0, 0, 0);

            const actualizaPuntaje = document.getElementById("puntaje")
            actualizaPuntaje.innerHTML = `${world.score}`

            const lifes = document.getElementById("vidas")
            lifes.innerHTML = `${world.vidas}`


            /*Contrato: recursivaLista(lista,funcion,number)-->funcion 
            Proposito:Se llama a sí misma para poder recorrer la matrix
            recursivaLista(lista, funcion, index = 0){cuerpo de la función}
             */
            function recursivaLista(lista, funcion, index = 0) {
                if (!isEmpty(lista)) {
                    funcion(first(lista), index);
                    recursivaLista(rest(lista), funcion, index + 1)
                }
            }

            recursivaLista(MAPA, (fila, i) => {
                recursivaLista(fila, (columna, j) => {
                    if (columna == 1) { //se define como los muros de nuestro mapa
                        //processing.fill(0,255,0);
                        processing.image(muro, j * SIZE, i * SIZE, SIZE, SIZE);
                    }
                    if (columna == 0) { //se define como las monedas de nueestro mapa
                        //processing.fill(0,255,0);
                        processing.image(moneda, j * SIZE + 10, i * SIZE + 10, SIZE / 3, SIZE / 3);
                    }
                    if (columna == 3) { //se define al jugador(TOMB) de nuestro mapa
                        processing.image(tomb, j * SIZE, i * SIZE, SIZE, SIZE);
                    }
                    if (columna == 7) { //se define como un obstaculo de tipo void en nuestro mapa
                        processing.image(voidp, j * SIZE, i * SIZE, SIZE, SIZE);
                    }
                });
            });


            //define al tomb y permite que este aparezca en pantalla 
            if (world.time == 0) {
                processing.image(tomb, world.tomb.x * SIZE, world.tomb.y * SIZE, SIZE, SIZE); //con el "processing.image" importamos la imagen que queremos que nuestro jugador (TOMB) tome
            }

            //GANAR
            if (world.numeroDeMonedas == 0) {
			     // processing.background(50, 255, 255);
			      processing.image(ywinner, 0, 0, ANCHO, LARGO);//muestra la imagen winner1
            time=0; 
            world.lava.x =0;
            world.lava.y =0;
            processing.second=0;
            
		        }

            if (world.vidas == 0) {
                world.online = false;

            }
            if ((Math.ceil(posLava / SIZE) > MAPA[9].length - world.tomb.x)) {

                //Logica para el movimiento de la lava 
                world.online = false
            }

            if (currentSecond != processing.second()) {
                if (processing.second() == 0) { //si el mundo se ha iniciado es igual a 0
                    if (world.lava.dead != world.lava.dead) //
                        world.lava.time -= 60;
                    else
                        world.lava.time += 60;
                }
                

                    posLava = ((processing.second() - world.currentTime) + world.lava.time) * world.lava.velocidad;

                currentSecond = processing.second();
                
            }
            processing.image(lava, world.lava.x * SIZE - posLava, 0, ANCHO, LARGO);
            
        } else processing.image(gameOver, 0, 0, ANCHO, LARGO)
    }
    

    // Actualiza el mundo despues de cada frame. En este ejemplo, no cambia nada, solo retorna una copia del mundo
    processing.onTic = function(world) {
        return make(world, {});
    }

    //Eventos del mouse
    processing.onMouseEvent = function(world, event) {
        // Por ahora no cambia el mundo. Solo retorna una copia del mundo actual
        return make(world, {});
    };

    //Eventos del teclado
    processing.onKeyEvent = function(world, keycode) {


        if (keycode == processing.LEFT) {
            var PosicionArray = world.MAPA[world.tomb.y][world.tomb.x - 1];
            if (PosicionArray != mapa.muro) {
                if (PosicionArray == mapa.moneda) {
                    return eatCoins(world, world.tomb.y, world.tomb.x - 1);
                }
              //esto trasnporta de posicion vacio-punto definido y a su vez resta la vida del personaje
                if (PosicionArray == mapa.voidp) {
                    world.vidas--;
                    world.tomb.x = 12 + 1;
                    world.tomb.y = 17;
                }

                return make(world, {
                    tomb: {
                        x: world.tomb.x - 1,
                        y: world.tomb.y
                    }
                });
            }
        } else if (keycode == processing.RIGHT) {
            var PosicionArray = world.MAPA[world.tomb.y][world.tomb.x + 1];
            if (PosicionArray != mapa.muro) {
                if (PosicionArray == mapa.moneda) {
                    world.lava
                    return eatCoins(world, world.tomb.y, world.tomb.x + 1);
                }

                if (PosicionArray == mapa.voidp) {
                    world.vidas--;
                    world.tomb.x = 12 - 1;
                    world.tomb.y = 17;
                }

                return make(world, {
                    tomb: {
                        x: world.tomb.x + 1,
                        y: world.tomb.y
                    }
                });
            }
        } else if (keycode == processing.DOWN) {

            var PosicionArray = world.MAPA[world.tomb.y + 1][world.tomb.x];
            if (PosicionArray != mapa.muro) {
                if (PosicionArray == mapa.moneda) {
                    return eatCoins(world, world.tomb.y + 1, world.tomb.x);
                }

                if (PosicionArray == mapa.voidp) {
                    world.vidas--;
                    world.tomb.x = 12;
                    world.tomb.y = 17 - 1;
                }

                return make(world, {
                    tomb: {
                        x: world.tomb.x,
                        y: world.tomb.y + 1
                    }
                });
            }

        } else if (keycode == processing.UP) {
            var PosicionArray = world.MAPA[world.tomb.y - 1][world.tomb.x];
            if (PosicionArray != mapa.muro) {
                if (PosicionArray == mapa.moneda) {
                    return eatCoins(world, world.tomb.y - 1, world.tomb.x);
                }

                if (PosicionArray == mapa.voidp) {
                    world.vidas--;
                    world.tomb.x = 12;
                    world.tomb.y = 17 + 1;
                }

                return make(world, {
                    tomb: {
                        x: world.tomb.x,
                        y: world.tomb.y - 1
                    }
                });
            }
        }
        return make(world, {});
    }

    // ******************** De aquí hacia abajo no debe cambiar nada. ********************

    // Esta es la función que pinta todo. Se ejecuta n veces por segundo. 
    // No cambie esta función. Su código debe ir en drawGame
    processing.draw = function() {
        processing.drawGame(processing.state);
        processing.state = processing.onTic(processing.state);
    };

    // Esta función se ejecuta cada vez que presionamos una tecla. 
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.keyPressed = function() {
        processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
    }

    // Esta función se ejecuta cada vez movemos el mouse. 
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.mouseMoved = function() {
        processing.state = processing.onMouseEvent(processing.state, {
            action: "move",
            mouseX: processing.mouseX,
            mouseY: processing.mouseY
        });
    }

    // Estas funciones controlan los eventos del mouse. 
    // No cambie estas funciones. Su código debe ir en OnMouseEvent
    processing.mouseClicked = function() {
        processing.state = processing.onMouseEvent(processing.state, {
            action: "click",
            mouseX: processing.mouseX,
            mouseY: processing.mouseY,
            mouseButton: processing.mouseButton
        });
    }

    processing.mouseDragged = function() {
        processing.state = processing.onMouseEvent(processing.state, {
            action: "drag",
            mouseX: processing.mouseX,
            mouseY: processing.mouseY,
            mouseButton: processing.mouseButton
        });
    }

    processing.mousePressed = function() {
        processing.state = processing.onMouseEvent(processing.state, {
            action: "press",
            mouseX: processing.mouseX,
            mouseY: processing.mouseY,
            mouseButton: processing.mouseButton
        });
    }

    processing.mouseReleased = function() {
        processing.state = processing.onMouseEvent(processing.state, {
            action: "release",
            mouseX: processing.mouseX,
            mouseY: processing.mouseY,
            mouseButton: processing.mouseButton
        });
    }
    // Fin de los eventos del mouse
}

var canvas = document.getElementById("canvas");

// Adjuntamos nuestro sketch al framework de processing
var processingInstance = new Processing(canvas, sketchProc);