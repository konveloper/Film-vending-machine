class filmGenerator {
  constructor() {
    this.itemList = document.querySelector('.list-item');
  }

  async setup() {
    await this.loadData((json) => {
      this.filmFactory(json);
    });
  }

  async loadData(callback) {
    const res = await fetch('src/js/item.json');

    if (res.ok) {
      callback(await res.json());
    } else {
      alert('통신 에러! + res.status');
    }
  }

  filmFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement('li');
      const itemTemplate = `
        <button class="btn-item" type="button" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
        <img src="src/images/${el.img}" alt="" class="img-item">
        <strong class="title-item">${el.name}</strong>
        <span class="txt-price">${el.cost}원</span>
        </button>
        `;
      item.innerHTML = itemTemplate;
      docFrag.appendChild(item);
    });
    this.itemList.appendChild(docFrag);
  }
}

export default filmGenerator;
