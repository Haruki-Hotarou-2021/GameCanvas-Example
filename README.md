
# GameCanvas

## Introdução
GameCanvas é um canvas desenvolvido para jogos, semelhante ao canvas do HTML5, mas com funcionalidades adicionais para facilitar o desenvolvimento de jogos.

## Instalação
Para utilizar o GameCanvas, basta incluir o arquivo `lunar.js` no seu projeto.

## Uso
Para começar a usar o GameCanvas, siga os passos abaixo:

1. Inclua o arquivo JavaScript no seu arquivo HTML:
```html
<script src="lunar.js"></script>
```

2. Crie um elemento canvas personalizado no seu HTML:
```html
<lunar-canvas id="gameCanvas" width="800" height="600" grid="50"></lunar-canvas>
```

3. Inicialize o GameCanvas no seu script JavaScript:
```javascript
const canvas = document.getElementById('gameCanvas');
```

## Métodos
O GameCanvas oferece vários métodos para desenhar formas e manipular o canvas. Aqui estão alguns dos principais métodos:

### `rect(x, y, width, height, color, rotate, scale, z)`
Desenha um retângulo no canvas.
- `x`: Coordenada x do centro do retângulo.
- `y`: Coordenada y do centro do retângulo.
- `width`: Largura do retângulo.
- `height`: Altura do retângulo.
- `color`: Cor do retângulo.
- `rotate`: Rotação do retângulo em graus.
- `scale`: Escala do retângulo.
- `z`: Índice z para a ordem de desenho.

### `clear()`
Limpa o canvas.

## Exemplos
Aqui está um exemplo simples de como usar o GameCanvas para desenhar um retângulo:

```javascript
const canvas = document.getElementById('gameCanvas');

function draw() {
    canvas.clear();
    canvas.rect(100, 100, 50, 50, 'red');
}

setInterval(draw, 1000 / 60);
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença
Este projeto está licenciado sob a licença MIT.
