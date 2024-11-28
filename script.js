let selections = { prato: null, bebida: null, sobremesa: null };

function selectItem(element, category) {
  const categoryItems = document.querySelectorAll(`section:nth-of-type(${getCategoryIndex(category)}) .item`);
  
  categoryItems.forEach((item) => item.classList.remove('selected'));
  element.classList.add('selected');
  
  const itemName = element.querySelector('h2').innerText;
  selections[category] = itemName;
  checkOrder();
}

function getCategoryIndex(category) {
  const categories = ['prato', 'bebida', 'sobremesa'];
  return categories.indexOf(category) + 1;
}

function checkOrder() {
  const button = document.getElementById('finalizar-pedido');
  const allSelected = Object.values(selections).every((item) => item !== null);
  button.disabled = !allSelected;
  button.innerText = allSelected ? 'Fechar pedido' : 'Selecione os 3 itens para fechar o pedido';
}

function confirmOrder() {
  document.getElementById('confirmacao').classList.remove('hidden');
  const details = document.getElementById('pedido-detalhes');
  const total = document.getElementById('pedido-total');
  const whatsappLink = document.getElementById('whatsapp-link');

  details.innerHTML = `
    <li>Prato: ${selections.prato}</li>
    <li>Bebida: ${selections.bebida}</li>
    <li>Sobremesa: ${selections.sobremesa}</li>
  `;
  const totalPrice = calculateTotal();
  total.innerText = `Total: R$ ${totalPrice.toFixed(2)}`;
  whatsappLink.href = `https://wa.me/5541984294139?text=Olá, gostaria de fazer o pedido:
  - Prato: ${selections.prato}
  - Bebida: ${selections.bebida}
  - Sobremesa: ${selections.sobremesa}
  Total: R$ ${totalPrice.toFixed(2)}`;
}

function cancelOrder() {
  document.getElementById('confirmacao').classList.add('hidden');
}

function calculateTotal() {
  const prices = { 
    "Frango Yin Yang": 14.9, 
    "Carne Assada": 16.5, 
    "Calabresa": 14.5,
    "Coquinha Gelada": 4.9, 
    "Suco de Laranja": 6.0, 
    "Fanta": 4.8,
    "Pudim": 7.9, 
    "Mouse": 9.5, 
    "Brownie": 8.5 
  };
  
  return Object.values(selections).reduce((total, item) => total + (prices[item] || 0), 0);
}
