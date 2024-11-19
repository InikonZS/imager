class Editor{
  constructor (mainNode, imgSrc, filename){
    this.filename=filename;
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.style="border-style: solid; border-width:1px";
    this.canvasElement.width = '390';
    this.canvasElement.height = '260';
    mainNode.appendChild(this.canvasElement);
    this.canvas = this.canvasElement.getContext('2d');  

    this.mainNode = mainNode;
    this.imleft=0;
    this.imtop=0;
    this.sc=1;

    new ButtonEx(mainNode,'','right',false,()=>{
      this.imleft+=10;
      this.setTransform(this.imleft,this.imtop,this.sc);
      });
    new ButtonEx(mainNode,'','left',false,()=>{
      this.imleft-=10;
      this.setTransform(this.imleft,this.imtop,this.sc);
    });
    new ButtonEx(mainNode,'','top',false,()=>{
      this.imtop+=10;
      this.setTransform(this.imleft,this.imtop,this.sc);
    });
    new ButtonEx(mainNode,'','bottom',false,()=>{
      this.imtop-=10;
      this.setTransform(this.imleft,this.imtop,this.sc);
    });
    new ButtonEx(mainNode,'','scale+',false,()=>{
      this.sc+=0.05;
      this.setTransform(this.imleft,this.imtop,this.sc);
    });
    new ButtonEx(mainNode,'','scale-',false,()=>{
      this.sc-=0.05;
      this.setTransform(this.imleft,this.imtop,this.sc);
    });

    this.imgBuffer = new Image();
    this.imgBuffer.onload = ()=>{
      this.setTransform();
     // let sc = this.autoScale(this.imgBuffer.width, this.imgBuffer.height, 390, 260);
     // this.canvas.drawImage(this.imgBuffer, 0, 0, sc[0], sc[1]);
    };
    
    this.imgBuffer.src = imgSrc;
  }

  autoScale(w_, h_, tw_, th_){
    let h = h_;
    let w = w_;
    let th = th_;
    let tw = tw_;
    let ph = 0;
    let pw = 0;
    let asp = w/h;
    if ((th*asp)<tw){
      pw = tw;
      ph = tw/asp;
    } else {
      ph = th;
      pw = th*asp;
    }
    return [pw, ph];
  }
  
  setTransform(){
    let sc = this.autoScale(this.imgBuffer.width, this.imgBuffer.height, this.settings.width, this.settings.height);
    let autoCenterX = (this.settings.width - sc[0]) /2;
    let autoCenterY = (this.settings.height - sc[1]) /2;
    //console.log(autoCenterX, this.settings.width, this.imgBuffer.width, sc[0], sc[1]);
    this.canvas.fillStyle = '#ffffff';
    //this.canvas.fillRect(-1,-1,this.canvasElement.width+1,this.canvasElement.height+1);
    this.canvas.drawImage(this.imgBuffer, this.imleft + autoCenterX, this.imtop + autoCenterY, sc[0]*this.sc, sc[1]*this.sc);  
  }

  saveToFile(name){
    let name_ = name || this.filename;
    var dataURL = this.canvasElement.toDataURL(this.settings?.format || "image/jpeg");
	  var link = document.createElement("a");
	  document.body.appendChild(link); // Firefox requires the link to be in the body :(
	  link.href = dataURL;
	  link.download = name_;
	  link.click();
	  document.body.removeChild(link);
  }

  setSettings(settings){
    this.canvasElement.width = settings.width;
    this.canvasElement.height = settings.height;
    this.settings = settings;
  }
}

const mainNode = document.querySelector('#app-main');
const controlNode = document.querySelector('#app-controls');

var editors=[];
var appFiles = document.querySelector('#app-files');
var appWidth = document.querySelector('#app-width');
var appHeight = document.querySelector('#app-height');
var appFormatJpg = document.querySelector('#app-format-jpg');
var appFormatPng = document.querySelector('#app-format-png');

var changeHandler = ()=>{
  editors = [];
  mainNode.innerHTML="";
  let files = [];
  for (let i = 0; i< appFiles.files.length; i++){
    files.push(appFiles.files[i]);
  }
  files.forEach((it)=>{
    let ed = new Editor(mainNode, window.URL.createObjectURL(it), it.name);
    ed.setSettings({
      width: appWidth.valueAsNumber,
      height: appHeight.valueAsNumber,
      format: appFormatPng.checked ? "image/png" : "image/jpeg"
    })
    editors.push(ed);
  });
}
appFiles.onchange = changeHandler;

var saveButton = new ButtonEx(controlNode, '', 'save All', false, ()=>{
  editors.forEach(it=>{it.saveToFile();});
});

//let ed = new Editor(mainNode, 'img.jpg');
/*
const canvasElement = document.createElement('canvas');
canvasElement.style="border-style: solid; border-width:1px";
canvasElement.width = '390';
canvasElement.height = '260';
mainNode.appendChild(canvasElement);
const canvas = canvasElement.getContext('2d');

var imleft=0;
var imtop=0;
var sc=1;

new ButtonEx(mainNode,'','right',false,()=>{
  imleft++;
  setTransform(imleft,imtop,sc);
  });
new ButtonEx(mainNode,'','left',false,()=>{
  imleft--;
  setTransform(imleft,imtop,sc);
});
new ButtonEx(mainNode,'','top',false,()=>{
  imtop++;
  setTransform(imleft,imtop,sc);
});
new ButtonEx(mainNode,'','bottom',false,()=>{
  imtop--;
  setTransform(imleft,imtop,sc);
});
new ButtonEx(mainNode,'','scale+',false,()=>{
  sc+=0.05;
  setTransform(imleft,imtop,sc);
});
new ButtonEx(mainNode,'','scale-',false,()=>{
  sc-=0.05;
  setTransform(imleft,imtop,sc);
});

const imgBuffer = new Image();

imgBuffer.onload = ()=>{
  let sc = autoScale(imgBuffer.width, imgBuffer.height, 390, 260);
  canvas.drawImage(imgBuffer, 0, 0, sc[0], sc[1]);
};

imgBuffer.src = 'img.jpg';

function autoScale(w_, h_, tw_, th_){
  let h = h_;
  let w = w_;
  let th = th_;
  let tw = tw_;
  let ph = 0;
  let pw = 0;
  let asp = w/h;
  if ((th*asp)<tw){
    pw = tw;
    ph = tw/asp;
  } else {
    ph = th;
    pw = th*asp;
  }
  return [pw, ph];
}

function setTransform(left, top, scale){
  let sc = autoScale(imgBuffer.width, imgBuffer.height, 390, 260);
  canvas.clearRect(0,0,canvasElement.width+1,canvasElement.height+1);
  canvas.drawImage(imgBuffer, left, top, sc[0]*scale, sc[1]*scale);  
}
*/
//imgBuffer.src=window.URL.createObjectURL(ff.files[3])
