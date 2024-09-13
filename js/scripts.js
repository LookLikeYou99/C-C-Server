// מאזין אירוע לכל שדה קלט כדי לבצע חישובים בזמן אמת
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateResults);
});

// פונקציה לסנכרון ערכי הנכס בין המינופים השונים
function synchronizePropertyValues() {
    const propertyValue75 = parseFloat(document.getElementById('property-value-75').value) || 0;
    document.getElementById('property-value-60').value = propertyValue75;
    document.getElementById('property-value-40').value = propertyValue75;
}

// פונקציה לחישוב התוצאות
function calculateResults() {
    // סנכרון ערכי הנכס
    synchronizePropertyValues();

    // Block 1: חישוב סה"כ הכנסה משפחתית
    const salary1Spouse = parseFloat(document.getElementById('salary1-spouse').value) || 0;
    const salary1Partner = parseFloat(document.getElementById('salary1-partner').value) || 0;
    const salary2Spouse = parseFloat(document.getElementById('salary2-spouse').value) || 0;
    const salary2Partner = parseFloat(document.getElementById('salary2-partner').value) || 0;
    const businessIncomeSpouse = parseFloat(document.getElementById('business-income-spouse').value) || 0;
    const businessIncomePartner = parseFloat(document.getElementById('business-income-partner').value) || 0;
    const rentalIncomeSpouse = parseFloat(document.getElementById('rental-income-spouse').value) || 0;
    const rentalIncomePartner = parseFloat(document.getElementById('rental-income-partner').value) || 0;
    const disabilityAllowanceSpouse = parseFloat(document.getElementById('disability-allowance-spouse').value) || 0;
    const disabilityAllowancePartner = parseFloat(document.getElementById('disability-allowance-partner').value) || 0;
    const alimonySpouse = parseFloat(document.getElementById('alimony-spouse').value) || 0;
    const alimonyPartner = parseFloat(document.getElementById('alimony-partner').value) || 0;
    const deductionAlimonySpouse = parseFloat(document.getElementById('deduction-alimony-spouse').value) || 0;
    const deductionAlimonyPartner = parseFloat(document.getElementById('deduction-alimony-partner').value) || 0;

    const totalIncome = salary1Spouse + salary1Partner + salary2Spouse + salary2Partner +
                        businessIncomeSpouse + businessIncomePartner +
                        rentalIncomeSpouse + rentalIncomePartner +
                        disabilityAllowanceSpouse + disabilityAllowancePartner +
                        alimonySpouse + alimonyPartner -
                        deductionAlimonySpouse - deductionAlimonyPartner;

    document.getElementById('total-income').textContent = `₪${totalIncome.toLocaleString()}`;

    const availableMortgage = totalIncome * 0.33; // הנחה ש-33% מההכנסה הפנויה למשכנתא
    document.getElementById('available-mortgage').textContent = `₪${availableMortgage.toLocaleString()}`;

    // Block 2: חישוב הלוואות
    const loanBalance1 = parseFloat(document.getElementById('loan1').value) || 0;
    const loanBalance2 = parseFloat(document.getElementById('loan2').value) || 0;
    const loanBalance3 = parseFloat(document.getElementById('loan3').value) || 0;
    const loanBalance4 = parseFloat(document.getElementById('loan4').value) || 0;
    const loanBalance5 = parseFloat(document.getElementById('loan5').value) || 0;
    const loanBalance6 = parseFloat(document.getElementById('loan6').value) || 0;
    const totalLoans = loanBalance1 + loanBalance2 + loanBalance3 + loanBalance4 + loanBalance5 + loanBalance6;
    document.getElementById('total-loans').textContent = `₪${totalLoans.toLocaleString()}`;

    const monthlyPayment1 = parseFloat(document.getElementById('loan1-monthly').value) || 0;
    const monthlyPayment2 = parseFloat(document.getElementById('loan2-monthly').value) || 0;
    const monthlyPayment3 = parseFloat(document.getElementById('loan3-monthly').value) || 0;
    const monthlyPayment4 = parseFloat(document.getElementById('loan4-monthly').value) || 0;
    const monthlyPayment5 = parseFloat(document.getElementById('loan5-monthly').value) || 0;
    const monthlyPayment6 = parseFloat(document.getElementById('loan6-monthly').value) || 0;
    const totalMonthlyPayment = monthlyPayment1 + monthlyPayment2 + monthlyPayment3 + monthlyPayment4 + monthlyPayment5 + monthlyPayment6;
    document.getElementById('total-monthly-payment').textContent = `₪${totalMonthlyPayment.toLocaleString()}`;

    // חישוב הון שיאושר לפי יכולת החזר ללא הלוואות
    const mortgageWithoutLoans = availableMortgage / 550 * 100000; // הנחה: 550 תשלומים
    document.getElementById('approved-amount-without-loans').textContent = `₪${mortgageWithoutLoans.toLocaleString()}`;

    // חישוב הון שיאושר לפי יכולת החזר עם הלוואות
    const mortgageWithLoans = (availableMortgage - totalMonthlyPayment) / 550 * 100000;
    document.getElementById('approved-amount-with-loans').textContent = `₪${mortgageWithLoans.toLocaleString()}`;

    // Block 3: חישוב הון אישי ותשלומים
    const personalCapital = parseFloat(document.getElementById('personal-capital').value) || 0;
    const lockedCapitalLoan = parseFloat(document.getElementById('locked-capital-loan').value) || 0;
    const governmentLoan = parseFloat(document.getElementById('government-loan').value) || 0;
    const financialPlatformsCapital = parseFloat(document.getElementById('financial-platforms-capital').value) || 0;

    const totalCapital = personalCapital + lockedCapitalLoan + governmentLoan + financialPlatformsCapital;
    document.getElementById('total-capital').textContent = `₪${totalCapital.toLocaleString()}`;

    // חישוב סה"כ הוצאות
    const operationalExpenses = parseFloat(document.getElementById('operational-expenses').value) || 0;
    const taxExpenses = parseFloat(document.getElementById('tax-expenses').value) || 0;
    const enhancementExpenses = parseFloat(document.getElementById('enhancement-expenses').value) || 0;

    const totalExpenses = operationalExpenses + taxExpenses + enhancementExpenses;
    document.getElementById('total-expenses').textContent = `₪${totalExpenses.toLocaleString()}`;

    // חישוב הון עצמי לאחר הוצאות
    const finalCapital = totalCapital - totalExpenses;
    document.getElementById('final-capital').textContent = `₪${finalCapital.toLocaleString()}`;

    // חישוב הון שיאושר לפי הון אישי
    const approvedAmountByPersonalCapital = finalCapital * 3; // הנחה: הכפלת ההון האישי
    document.getElementById('approved-amount-by-personal-capital').textContent = `₪${approvedAmountByPersonalCapital.toLocaleString()}`;

    // חישוב הון שיאושר לפי הון אישי לדירה שנייה
    const approvedAmountByPersonalCapitalSecondHome = finalCapital * 2; // הנחה: הכפלת ההון האישי ל-2
    document.getElementById('approved-amount-by-personal-capital-second-home').textContent = `₪${approvedAmountByPersonalCapitalSecondHome.toLocaleString()}`;

    // חישוב סך התקציב לביצוע השקעה
    const totalBudgetFirstHome = finalCapital + approvedAmountByPersonalCapital;
    document.getElementById('total-budget-first-home').textContent = `₪${totalBudgetFirstHome.toLocaleString()}`;

    const totalBudgetSecondHome = finalCapital + approvedAmountByPersonalCapitalSecondHome;
    document.getElementById('total-budget-second-home').textContent = `₪${totalBudgetSecondHome.toLocaleString()}`;

    // חישוב סכום משכנתא ואקססוריז
    const mortgageAndCapitalWithoutLoans = mortgageWithoutLoans + finalCapital;
    document.getElementById('mortgage-and-capital-without-loans').textContent = `₪${mortgageAndCapitalWithoutLoans.toLocaleString()}`;

    const mortgageAndCapitalWithLoans = mortgageWithLoans + finalCapital;
    document.getElementById('mortgage-and-capital-with-loans').textContent = `₪${mortgageAndCapitalWithLoans.toLocaleString()}`;

    // Block 4: חישוב מינוף
    calculateLeverage('75');
    calculateLeverage('60');
    calculateLeverage('40');

    // Block 5: חישובים סופיים
    document.getElementById('final-total-income').textContent = `₪${totalIncome.toLocaleString()}`;
    document.getElementById('final-total-loans').textContent = `₪${totalLoans.toLocaleString()}`;
    document.getElementById('final-total-monthly-loan-payment').textContent = `₪${totalMonthlyPayment.toLocaleString()}`;
    document.getElementById('final-total-capital-and-costs').textContent = `₪${totalCapital.toLocaleString()}`;
}

// פונקציה לחישוב מינוף
function calculateLeverage(idSuffix) {
    const leverage = parseFloat(idSuffix) / 100;
    const propertyValue = parseFloat(document.getElementById(`property-value-${idSuffix}`).value) || 0;
    const equity = propertyValue * (1 - leverage);
    const mortgage = propertyValue * leverage;
    const monthlyMortgagePayment = mortgage / 300; // הנחה: משכנתא ל-25 שנה (300 תשלומים)
    document.getElementById(`equity-${idSuffix}`).textContent = `₪${equity.toLocaleString()}`;
    document.getElementById(`mortgage-${idSuffix}`).textContent = `₪${mortgage.toLocaleString()}`;
    document.getElementById(`monthly-mortgage-payment-${idSuffix}`).textContent = `₪${monthlyMortgagePayment.toLocaleString()}`;
}

// פונקציה לאיפוס המחשבון (אם תרצה להוסיף כפתור איפוס)
function resetCalculator() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.value = '');
    document.getElementById('total-income').textContent = '₪';
    document.getElementById('available-mortgage').textContent = '₪';
    document.getElementById('total-loans').textContent = '₪';
    document.getElementById('total-monthly-payment').textContent = '₪';
    document.getElementById('approved-amount-without-loans').textContent = '₪';
    document.getElementById('approved-amount-with-loans').textContent = '₪';
    document.getElementById('mortgage-and-capital-without-loans').textContent = '₪';
    document.getElementById('mortgage-and-capital-with-loans').textContent = '₪';
    document.getElementById('total-capital').textContent = '₪';
    document.getElementById('total-expenses').textContent = '₪';
    document.getElementById('final-capital').textContent = '₪';
    document.getElementById('approved-amount-by-personal-capital').textContent = '₪';
    document.getElementById('approved-amount-by-personal-capital-second-home').textContent = '₪';
    document.getElementById('total-budget-first-home').textContent = '₪';
    document.getElementById('total-budget-second-home').textContent = '₪';
    document.getElementById('final-total-income').textContent = '₪';
    document.getElementById('final-total-loans').textContent = '₪';
    document.getElementById('final-total-monthly-loan-payment').textContent = '₪';
    document.getElementById('final-total-capital-and-costs').textContent = '₪';
}
