const apiKey = "cn8AFuukycKrInKumtRhpN23c7j47uXfEQV7";
const input = document.querySelector("input");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const button = document.querySelector("button");
const result = document.querySelector(".result"); // .sum -> .result

// Valyuta ro'yxatini olish va select elementlariga qo'shish
fetch(`https://currencyapi.net/api/v1/rates?key=${apiKey}&base=USD`)
  .then((response) => response.json())
  .then((data) => {
    const currencies = Object.keys(data.rates);
    currencies.push(data.base); // Asosiy valyutani ham qo'shamiz
    const uniqueCurrencies = [...new Set(currencies)].sort();

    uniqueCurrencies.forEach((currency) => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      fromSelect.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;
      toSelect.appendChild(option2);
    });

    // Default tanlovlar
    fromSelect.value = "USD";
    toSelect.value = "UZS";
  })
  .catch((error) => {
    console.error("Valyutalarni olishda xatolik:", error);
    result.textContent = "Valyuta ro‘yxatini yuklab bo‘lmadi.";
  });

// Konvertatsiya qilish
button.addEventListener("click", () => {
  const amount = parseFloat(input.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Iltimos, to‘g‘ri miqdor kiriting.";
    return;
  }

  fetch(`https://currencyapi.net/api/v1/rates?key=${apiKey}&base=${from}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[to];
      if (!rate) {
        result.textContent = `Valyuta: "${to}" uchun kurs topilmadi.`;
        return;
      }

      const converted = (amount * rate).toFixed(2);
      result.textContent = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch((error) => {
      console.error("Konvertatsiya qilishda xatolik:", error);
      result.textContent =
        "Xatolik yuz berdi, iltimos keyinroq urinib ko‘ring.";
    });
});
