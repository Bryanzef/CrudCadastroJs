const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sIdade = document.querySelector("#m-idade");
const sProfissao = document.querySelector("#m-profissao");

const btnSave = document.querySelector("#buttonSave");

let items;
let id;

// Função para inserir um novo item na tabela
function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.idade}</td>
    <td>${item.profissao}</td>

    <td class="action">
      <button onclick="editItem(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
    </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

// Função para editar um item existente na tabela
function editItem(index) {
  openModal(true, index);
  id = index;
}

// Função para excluir um item da tabel
function deleteItem(index) {
  items.splice(index, 1);
  setItemsBD();
  loadItems();

  const message = document.getElementById("message");
  message.innerHTML = " Usuário removido com sucesso";
  message.style = "color: rgb(255, 0, 0);";
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 900);
}

// Função para abrir o modal de cadastro
function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };
  // Se estiver editando um item existente, preenche os campos com os dados do item
  if (edit) {
    sNome.value = items[index].nome;
    sIdade.value = items[index].idade;
    sProfissao.value = items[index].profissao;
  } else {
    sNome.value = "";
    sIdade.value = "";
    sProfissao.value = "";
    id = undefined;
  }
}

btnSave.onclick = (e) => {
  if (sNome.value === "" || sIdade.value === "" || sProfissao.value === "") {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    items[id].nome = sNome.value;
    items[id].idade = sIdade.value;
    items[id].profissao = sProfissao.value;
  } else {
    items.push({
      nome: sNome.value,
      idade: sIdade.value,
      profissao: sProfissao.value,
    });
  }

  setItemsBD();

  modal.classList.remove("active");
  loadItems();
  id = undefined;

  // exibir a mensagem de sucesso
  const message = document.getElementById("message");
  message.innerHTML = " Usuário adicionado com sucesso";
  message.style = "color: rgb(0, 161, 0);";
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 900);
};

function loadItems() {
  items = getItemsBD();
  tbody.innerHTML = "";
  items.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItemsBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItemsBD = () => localStorage.setItem("dbfunc", JSON.stringify(items));

loadItems();
