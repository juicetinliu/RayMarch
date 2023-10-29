function setupHTML(){
  main = new Main();
  let mainOGroup = new VertGroup(main);
  let mainGroup = new VertGroup(mainOGroup);
  
  let canvPanel = new Panel(mainGroup);
  let canv = new Canvas(canvPanel, [150, 100]);
  
  let bottomGroup = new HorzGroup(mainGroup, 9);
  
  let button1 = new Button(bottomGroup, ['#e9e9e9', '#FFFFFF'], 'https://github.com/juicetinliu/RayMarch', 'github.png', 'Visit Github repo');
  
  let button2 = new Button(bottomGroup, ['#e9e9e9', '#FFFFFF'], 'https://p5js.org', 'https://p5js.org/assets/img/asterisk-01.png', 'P5.js');
  
  main.createHTML();
  
  canv.HTML.mousePressed(toggleLock);
}
