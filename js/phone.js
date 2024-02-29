const loadData = async (searchValue, showMore) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
  const datas = await res.json();
  const phones = datas.data
  showPhoneCard(phones, showMore)
}

loadData()

const showPhoneCard = (phones, showMore) => {

  // show more button settings
  const phoneLength = phones.length;
  if (phoneLength > 12 && !showMore) {
    document.getElementById('show-more-btn').classList.remove('hidden')
  }
  else {
    document.getElementById('show-more-btn').classList.add('hidden')
  }


  console.log('is showMore:', showMore)
  const phoneContainer = document.getElementById('card-div')
  phoneContainer.textContent = ''

  if (!showMore) {
    phones = phones.slice(0, 12)
  }

  // for each in phones
  phones.forEach(phone => {
    console.log(phone)
    const phoneCards = document.createElement('div')
    phoneCards.classList = 'card bg-gray-100 shadow-xl'
    phoneCards.innerHTML = `<figure><img class='mt-7' src='${phone.image}' alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.brand}</h2>
          <p>${phone.phone_name}</p>
          <div class="card-actions justify-center">
            <button onclick="seeDetails('${phone.slug}')" class="btn btn-primary text-white">Buy Now</button>
          </div>
        </div>`;


    phoneContainer.appendChild(phoneCards)
  })
  toggleSpinner(false)

}
// Searchbox-1
const handleSearch = (showMore) => {
  toggleSpinner(true)
  const searchField = document.getElementById('search-field')
  const searchvalue = searchField.value;
  console.log(searchvalue, showMore)
  loadData(searchvalue, showMore)
}
// Searchbox-2
// const handleSearch2 = () => {
//   toggleSpinner(true)
//   const input = document.getElementById('search-field2')
//   const inputValue = input.value;
//   loadData(inputValue)
// }
// Spinner
const toggleSpinner = (paas) => {
  if (paas) {
    const spinnerId = document.getElementById('spinner-field')
    spinnerId.classList.remove('hidden')
  }
  else {
    const spinnerId = document.getElementById('spinner-field')
    spinnerId.classList.add('hidden')
  }
}
// show more button
const showMore = () => {
  handleSearch(true)
}

// see details section js
const seeDetails = async (id) => {
  console.log('Someone is clicking', id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phones = data.data
  showDetail(phones)
}

const showDetail = (phones) => {
  const phoneName = document.getElementById('show-phone-name')
  phoneName.innerText=phones.name
  console.log(phones)
  my_modal_1.showModal()
}