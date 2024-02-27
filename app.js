const fileKey = document.querySelector(".file-input");
const filterbtn = document.querySelectorAll(".filter button");
const filtername = document.querySelector(".filter-info .name");
const filtervalue = document.querySelector(".filter-info .value");
const filterslide = document.querySelector(".slider input");
const chooseimg = document.querySelector(".choose-img");
const rotatebtn = document.querySelectorAll(".rotate button");
const previewimg = document.querySelector(".preview-img img");
const resetbtn = document.querySelector(".reset");
const savebtn = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
  let rotate = 0;

  const applyfilters = ()=>{

    previewimg.style.filter =`brightness(${brightness}%) 
    saturate(${saturation}%) 
    invert(${inversion}% )
    grayscale(${grayscale}%)`;

    previewimg.style.transform =`rotate(${rotate}deg)`;
    
  
};

const loadImage = () => {
  let file = fileKey.files[0];
  if (!file) return;
  previewimg.src = URL.createObjectURL(file);
  previewimg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disabel");
  });
};

filterbtn.forEach((Option) => {
  Option.addEventListener("click", () => {
    document.querySelector(".filter .active-cls").classList.remove("active-cls");
    Option.classList.add("active-cls");
    filtername.innerHTML = Option.innerHTML;

    if (Option.id === "brightness") {
      filterslide.max = "200";
      filterslide.value = brightness;
      filtervalue.innerHTML = `${brightness}%`;
    } else if (Option.id === "saturation") {
      filterslide.max = "200";
      filterslide.value = saturation;
      filtervalue.innerHTML = `${saturation}%`;
    } else if (Option.id === "inversion") {
      filterslide.max = "200";
      filterslide.value = inversion;
      filtervalue.innerHTML = `${inversion}%`;
    } else {
      filterslide.max = "200";
      filterslide.value = grayscale;
      filtervalue.innerHTML = `${grayscale}%`;
    }
    applyfilters();
  });
});

const update = () => {
  filtervalue.innerHTML = `${filterslide.value}%`;
  // console.log(filterslide.value);
  const selectedfilter = document.querySelector(".filter .active-cls");
  // console.log(selectedfilter);

  
  
  if (selectedfilter.id ==="brightness") {
    brightness = filterslide.value;
  } else if (selectedfilter.id === "saturation") {
    saturation = filterslide.value;
  } else if (selectedfilter.id === "inversion") {
    inversion = filterslide.value;
  } else {
    grayscale = filterslide.value;
  }
  applyfilters();
};

rotatebtn.forEach(Option =>{
  Option.addEventListener("click", ()=>{
    // console.log(Option);
    if(Option.id==="left"){
      rotate -=90;
    }else{
      rotate +=90;
    }
    applyfilters();
  });
});

let resetfilter = ()=>{
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  filterbtn[0].click();
  applyfilters();
}

const saveimage = ()=>{
  const canvas = document.createElement("canvas");
    canvas.width = previewimg.width;
    canvas.height = previewimg.height;
    const ctx = canvas.getContext("2d");
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width, canvas.height);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
  
  ctx.drawImage(previewimg, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "image.png"; 
    link.href = dataURL;

    link.click();
}


filterslide.addEventListener("input", update);
fileKey.addEventListener("change", loadImage);
resetbtn.addEventListener("click", resetfilter);
chooseimg.addEventListener("click", () => fileKey.click());
savebtn.addEventListener("click", saveimage);
