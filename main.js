//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;



function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  casillerosSinDescubrir = COLUMNAS * FILAS;

  // Modificar/completar
  ponerMinasTablero()
 
  
}


function draw() 
{
  if (hizoClick == true)
  {
    if(mouseButton == LEFT)
    {
      if(tieneMinaCasillero(columnaPresionada, filaPresionada))
      {
        mostrarMinas();
        perder();  
      }
      else
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada, filaPresionada)
      }
    } 
      if(mouseButton == RIGHT)
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
      }
      if(ganoElJuego())
      {
        ganar();
      }
  hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
}


function ganoElJuego()
{
  if(casillerosSinDescubrir == CANTIDAD_MINAS)
    return true;
}

function ponerMinasTablero()
{
  
  for (let contador = 0; contador < CANTIDAD_MINAS; contador++){ 
    
    rangoX = floor (random (0, 10));
    rangoY = floor (random (0, 10)); 

    while (tieneMinaCasillero (rangoX, rangoY))
    { 
      rangoX = floor (random (0, 10));
      rangoY = floor (random (0, 10)); 
    }
    
    for (let i = 0 ; i < CANTIDAD_MINAS ; i++)
    { 
    ponerMinaCasillero (rangoX, rangoY)
    }
  }
}

function mostrarMinas()
{
  for(let column = 0; column < 10; column++)
  {
    for(let fil = 0; fil < 10; fil++)
    {
      if(tieneMinaCasillero(column, fil))
      {
        pintarCasillero(column, fil,  COLOR_CASILLERO_CON_MINA);
      }
    }
  }
  
}

function contarMinasAlrededor(columna, fila)
{
  totalMinas = 0
  for (let rangoX = -1; rangoX <= 1; rangoX++)
  { 
    for (let rangoY = -1; rangoY <= 1; rangoY++)
    { 
      
      if(tieneMinaCasillero(columna + rangoX, fila + rangoY))
      {
        totalMinas++
      }
    }
  }
  return totalMinas;
}

