function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${ state.id }">${ state.nome }</option>`
            }
        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${ city.nome }">${ city.nome }</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

// Itens de Coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (let item of itemsToCollect) {
    addEventListener('click', handleSelectedItem)
}

let selectedItems = []

const collectedItems = document.querySelector('input[name=items]')

function handleSelectedItem(event) {
    const itemLi = event.target

    //Adicionar ou remover a classe
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existe itens selecionados, 
    // se sim pegar os itens selecionados
    const alredySelected = selectedItems.findIndex(item => item == itemId)


    // se já estiver selecionado, tirar da seleção
    if (alredySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}