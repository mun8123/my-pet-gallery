const $draggableList = document.querySelector('.draggable-list');

const petImgs = [
  './img/1.jpeg',
  './img/2.jpeg',
  './img/4.jpeg',
  './img/6.jpeg',
  './img/7.jpeg',
  './img/8.jpeg',
  './img/9.jpeg',
  './img/12.jpeg',
  './img/14.jpeg',
  './img/15.jpeg',
  './img/16.jpeg',
  './img/17.jpeg',
  './img/18.jpeg',
  './img/19.jpeg',
  './img/20.jpeg',
  './img/21.jpeg',
  './img/22.jpeg',
  './img/23.jpeg',
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...petImgs]
    .map(el => ({ src: el }))
    .forEach((img, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `<img class="draggable" src="${img.src}" alt="pet-image">`;

      listItems.push(listItem);

      $draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function togglePopup(e) {
  const popupContent = document.querySelector('.popup-body');
  const popupImgTemplate = `<img class="popup-content" src="${e.target.src}" alt="pet-img">`;
  popupContent.innerHTML = popupImgTemplate;

  const popup = document.querySelector('.popup-wrap');
  popup.classList.toggle('popup-open');

  popup.addEventListener('click', e => {
    if (e.target.classList.contains('close')) {
      popup.classList.remove('popup-open');
    }
  });

  const controlBtns = document.querySelectorAll('.btn-style');
  let currentIndex = Number(e.target.parentNode.getAttribute('data-index'));

  controlBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let changeIndex = currentIndex;
      if (e.target.classList.contains('next')) {
        if (changeIndex === petImgs.length - 1) {
          changeIndex = 0;
        } else {
          changeIndex += 1;
        }
      }

      if (e.target.classList.contains('prev')) {
        if (changeIndex === 0) {
          changeIndex = petImgs.length - 1;
        } else {
          changeIndex -= 1;
        }
      }

      const changeListItem = document.querySelector(`[data-index="${changeIndex}"]`);
      const popupImgTemplate = `<img class="popup-content" src="${changeListItem.firstChild.src}" alt="pet-img">`;
      popupContent.innerHTML = popupImgTemplate;
      currentIndex = changeIndex;
    });
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('click', togglePopup);
  });
}
