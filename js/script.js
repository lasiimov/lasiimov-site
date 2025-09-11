const dropArea = document.getElementById('drop-area');
const fileElem = document.getElementById('fileElem');
const fileSelect = document.getElementById('fileSelect');
const previewOriginal = document.getElementById('preview-original');
const previewEnhanced = document.getElementById('preview-enhanced');
const enhanceBtn = document.getElementById('enhance');
const loading = document.getElementById('loading');

fileSelect.addEventListener('click', () => fileElem.click());
fileElem.addEventListener('change', handleFiles);

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', () => dropArea.classList.remove('hover'));

dropArea.addEventListener('drop', e => {
  e.preventDefault();
  dropArea.classList.remove('hover');
  const files = e.dataTransfer.files;
  handleFiles({ target: { files } });
});

function handleFiles(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Por favor, envie apenas imagens (JPEG, PNG, etc.)!');
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    previewOriginal.src = e.target.result;
    previewOriginal.style.display = 'block';

    // esconde títulos antes da melhoria
    document.getElementById('original-block').querySelector('.preview-title').style.display = 'none';
    document.getElementById('enhanced-block').querySelector('.preview-title').style.display = 'none';

    // esconde a imagem melhorada
    previewEnhanced.style.display = 'none';
    enhanceBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

enhanceBtn.addEventListener('click', async () => {
  loading.style.display = 'block';
  enhanceBtn.disabled = true;

  try {
    // simula processamento
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewOriginal.naturalWidth;
    canvas.height = previewOriginal.naturalHeight;

    ctx.filter = 'contrast(1.15) brightness(1.05) saturate(1.15)';
    ctx.drawImage(previewOriginal, 0, 0, canvas.width, canvas.height);

    // filtro de nitidez
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const w = canvas.width;
    const h = canvas.height;
    const kernel = [
       0, -0.2, 0,
      -0.2, 1.67, -0.2,
       0, -0.2, 0

//tanga nitidez auto deploytgbkjbnkjrbnbkçetjnb

    ];
    const copy = new Uint8ClampedArray(data);

    for (let y = 1; y < h-1; y++) {
      for (let x = 1; x < w-1; x++) {
        for (let c = 0; c < 3; c++) {
          let i = (y*w + x)*4 + c;
          let sum = 0;
          for (let ky=-1; ky<=1; ky++) {
            for (let kx=-1; kx<=1; kx++) {
              let ii = ((y+ky)*w + (x+kx))*4 + c;
              let k = kernel[(ky+1)*3 + (kx+1)];
              sum += copy[ii]*k;
            }
          }
          data[i] = Math.min(Math.max(sum,0),255);
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    previewEnhanced.src = canvas.toDataURL();
    previewEnhanced.style.display = 'block';

    // mostra os títulos "Antes" e "Depois"
    document.getElementById('original-block').querySelector('.preview-title').style.display = 'block';
    document.getElementById('enhanced-block').querySelector('.preview-title').style.display = 'block';

  } catch (error) {
    alert('Erro ao melhorar a imagem: ' + error.message);
  } finally {
    loading.style.display = 'none';
    enhanceBtn.disabled = false;
  }
}
               document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
});           
                           
                           
                           );
