// Populate the inputs from the querystring if set
addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('usage')) {
    document.getElementById('usage').value = params.get('usage');
  }
  if (params.has('discountedRate')) {
    document.getElementById('discountedRate').value = params.get('discountedRate');
  }
  if (params.has('fullPrice')) {
    document.getElementById('fullPrice').value = params.get('fullPrice');
  }

  if (params.has('currency')) {
    document.getElementById('currency').value = params.get('currency');
  }

  calculateOptimalCommitment();
});

function getCurrencyDisplay(currencyCode) {
    if (currencyCode === 'GBP') {
        return '£';
    } else if (currencyCode === 'USD') {
        return '$';
    }

    return '';
}

function calculateOptimalCommitment() {
  // Get the inputs
  const usageData = document.getElementById('usage').value.split(',').map(Number);
  const discountedRate = parseFloat(document.getElementById('discountedRate').value);
  const fullPrice = parseFloat(document.getElementById('fullPrice').value);

  const minCommitment = Math.min(...usageData);
  const maxCommitment = Math.max(...usageData);
  const step = 1;

  let optimalCommitment = minCommitment;
  let minTotalCost = Infinity;

  // Iterate through possible commitment levels
  for (let commitment = minCommitment; commitment <= maxCommitment; commitment += step) {
    let totalCost = 0;

    for (let usage of usageData) {
      if (usage <= commitment) {
        totalCost += commitment * discountedRate;
      } else {
        totalCost += commitment * discountedRate + (usage - commitment) * fullPrice;
      }
    }

    if (totalCost < minTotalCost) {
      minTotalCost = totalCost;
      optimalCommitment = commitment;
    }
  }

  let currency = document.getElementById('currency').value;
  let currencyDisplay = getCurrencyDisplay(currency);

  // Display the result
  document.getElementById('result').innerText = 
    `Optimal Commitment Level: ${currencyDisplay}${optimalCommitment.toFixed(2)}\nMinimum Total Cost: ${currencyDisplay}${minTotalCost.toFixed(2)}`;

  // And show the link to this result using the querystring
  function showLink() {
      const usage = document.getElementById('usage').value;
      const discountedRate = document.getElementById('discountedRate').value;
      const fullPrice = document.getElementById('fullPrice').value;

      const url = new URL(window.location);
      url.searchParams.set('usage', usage);
      url.searchParams.set('discountedRate', discountedRate);
      url.searchParams.set('fullPrice', fullPrice);

      document.getElementById('link').href = url.toString();
  }

  showLink();
}
