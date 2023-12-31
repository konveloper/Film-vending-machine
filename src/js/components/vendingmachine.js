class Vendingmachine {
  constructor() {
    const vendingMachine = document.querySelector('.container-vending-machine');
    this.balance = vendingMachine.querySelector('.txt-balance');
    this.itemList = vendingMachine.querySelector('.list-item');
    this.inputCostEl = vendingMachine.querySelector('.input-put');
    this.btnPut = vendingMachine.querySelector('.btn-put');
    this.btnReturn = vendingMachine.querySelector('.btn-return');
    this.btnGet = vendingMachine.querySelector('.btn-get');
    this.stagedList = vendingMachine.querySelector('.list-item-staged');

    const myInfo = document.querySelector('.container-my-info');
    this.myMoney = myInfo.querySelector('.txt-my-money');
    this.gotList = myInfo.querySelector('.list-item-staged');
    this.txtTotal = myInfo.querySelector('.txt-total');
  }
  setup() {
    this.bindEvents();
  }

  // 선택한 아이템 목록
  stagedItemGenerator(target) {
    const stagedItem = document.createElement('li');
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;
    stagedItem.innerHTML = `
<button type="button" class="btn-staged">
        <img src="./src/images/${target.dataset.img}" alt="" class="img-item">
        <strong class="txt-item">${target.dataset.item}</strong>
        <span class="num-counter">1</span>
        </button>
    `;
    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    this.btnPut.addEventListener('click', (event) => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', ''));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));

      // 1. 입금 버튼 기능
      if (inputCost) {
        // 입금액이 소지금보다 적은 경우
        if (inputCost <= myMoneyVal && inputCost > 0) {
          // Intl.NumberFormat : 언어에 맞는 숫자 서식을 문자열로 반환
          this.myMoney.textContent =
            new Intl.NumberFormat().format(myMoneyVal - inputCost) + ' 원';
          this.balance.textContent =
            new Intl.NumberFormat().format(
              (balanceVal ? balanceVal : 0) + inputCost
            ) + ' 원';
        } else {
          alert('소지금이 부족합니다.');
        }
        this.inputCostEl.value = null;
      }
    });

    // 2. 거스름돈 반환 기능
    this.btnReturn.addEventListener('click', (event) => {
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', ''));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));

      if (balanceVal) {
        this.myMoney.textContent =
          new Intl.NumberFormat().format(balanceVal + myMoneyVal) + ' 원';
        this.balance.textContent = ' 원';
      }
    });

    // 3. 자판기 메뉴 기능
    const btnsItem = this.itemList.querySelectorAll('button');

    btnsItem.forEach((item) => {
      item.addEventListener('click', (event) => {
        const targetEl = event.currentTarget;
        const balanceVal = parseInt(
          this.balance.textContent.replaceAll(',', '')
        );
        let isStaged = false; // 이미 선택되었는지 여부
        const targetElPrice = parseInt(targetEl.dataset.price);
        const stagedListItem = this.stagedList.querySelectorAll('li');

        // 입금 금액이 아이템 값보다 많거나 같은 경우
        if (balanceVal >= targetElPrice) {
          this.balance.textContent =
            new Intl.NumberFormat().format(balanceVal - targetElPrice) + '원';

          // 선택한 아이템이 이미 선택된 아이템인지 탐색
          for (const item of stagedListItem) {
            // 내가 선택한 아이템과 내가 담은 아이템이 같은 경우
            if (item.dataset.item === targetEl.dataset.item) {
              item.querySelector('.num-counter').textContent++;
              isStaged = true;
              break;
            }
          }
          // 아이템을 처음 선택한 경우
          if (!isStaged) {
            this.stagedItemGenerator(targetEl);
          }
          // 아이템의 재고 갯수를 줄인다
          targetEl.dataset.count--;
          // 재고가 모두 소진된 경우 품절 표시
          if (parseInt(targetEl.dataset.count) === 0) {
            targetEl.parentElement.classList.add('sold-out');
            const warning = document.createElement('em');
            warning.textContent = '해당 상품은 품절입니다.';
            warning.classList.add('ir');
            targetEl.parentElement.insertBefore(warning, targetEl);
          }
        } else {
          alert('잔액이 부족합니다.');
        }
      });
    });
  }
}

export default Vendingmachine;
