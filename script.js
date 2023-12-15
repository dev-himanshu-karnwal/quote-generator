const quoteContainer = document.querySelector('#quote');
const authorContainer = document.querySelector('#author');
const generateBtn = document.querySelector('.next');

// console.log(quoteContainer, authorContainer, generateBtn);

const clearAll = () => quoteContainer.textContent
    = authorContainer.textContent
    = '';

const fetchQuote = async function () {

    try {
        const res = await fetch(`https://type.fit/api/quotes`);

        if (!res.ok) throw new Error('Unable to generate Quote due to some error');

        const data = await res.json();

        console.log(data);
        return data;
    } catch (err) {
        alert(err.message);
        clearAll();
    }
}

const generateQuote = function () {

    // const
    (async function () {
        const quotes = await fetchQuote();
        if (!quotes) return;

        const data = quotes[Math.floor(Math.random() * quotes.length)];

        quoteContainer.textContent = data.text;
        authorContainer.textContent = data.author;

        generateBtn.textContent = 'Next Quote';
    }
    )();
}

generateBtn.addEventListener('click', generateQuote);
document.addEventListener('keydown', function (e) {

    if (e.key === 'Enter')
        generateQuote();
    else if (e.key === 'Escape')
        clearAll();
})