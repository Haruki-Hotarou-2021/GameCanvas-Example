# GameCanvas

## Introdução
GameCanvas é um canvas desenvolvido para jogos, semelhante ao canvas do HTML5, mas com funcionalidades diferentes para facilitar o desenvolvimento de jogos.

## Instalação
Para utilizar o GameCanvas, basta incluir o arquivo `canvas.js` no seu projeto.

## Uso
Para começar a usar o GameCanvas, siga os passos abaixo:

1. Inclua o arquivo JavaScript no seu arquivo HTML:
```html
<script src="canvas.js"></script>
```

2. Crie um elemento game-canvas no seu HTML:
```html
<game-canvas id="gameCanvas" width="800" height="600" grid="50"></game-canvas>
```

3. Inicialize o GameCanvas no seu script JavaScript:
```javascript
const canvas = document.getElementById('gameCanvas');
```

## Métodos
O GameCanvas oferece vários métodos para desenhar formas e manipular o canvas. Aqui estão alguns dos principais métodos:

### `rect(x, y, width, height, color, rotate, z)`
Desenha um retângulo no canvas.
- `x`: Coordenada x do centro do retângulo.
- `y`: Coordenada y do centro do retângulo.
- `width`: Largura do retângulo.
- `height`: Altura do retângulo.
- `color`: Cor do retângulo.
- `rotate`: Rotação do retângulo em graus.
- `z`: Índice z para a ordem de desenho.

### `clear()`
Limpa o canvas.

## Exemplos
Aqui está um exemplo simples de como usar o GameCanvas para desenhar um retângulo:

```javascript
const cv = document.getElementById('gameCanvas');

cv.rect(100, 100, 50, 50, 'red');
```

Para animar o retângulo e fazê-lo se movimentar deve-se criar um objeto com as propriedades do seu retângulo, adicionar o retângulo dentro de um loop, limpar a tela e modificar a posição a cada frame:

```javascript
const hero = {
    x: -200,
    y: -200,
}

function update() {
    cv.clear();
    cv.rect(hero.x, -hero.y, 50, 50, 'red');

    hero.x += 5;
    hero.y -= 5;

requestAnimationFrame(update)
}
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença
Este projeto está licenciado sob a licença MIT.
